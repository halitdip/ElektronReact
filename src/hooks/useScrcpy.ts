import { spawn, ChildProcessWithoutNullStreams, exec } from 'child_process';
import path from 'path';

let scrcpyProcess: ChildProcessWithoutNullStreams | null = null;

// scrcpy binary path: Windows için exe, diğer platformlar PATH üzerinden
const getScrcpyBin = () => process.platform === 'win32'
  ? path.join('C:', 'Program Files', 'Android_Tools', 'scrcpy', 'scrcpy-noconsole.exe')
  : 'scrcpy';

// ENV ile Windows'ta PATH'e scrcpy klasörünü ekle
const getEnv = () => {
  const env = { ...process.env };
  if (process.platform === 'win32') {
    const binFolder = path.dirname(getScrcpyBin());
    env.PATH = `${env.PATH};${binFolder}`;
  }
  return env;
};

// adb devices çıktısından ilk bağlı cihaz ID'sini algılar
const detectDeviceId = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec('adb devices', { env: getEnv() }, (err, stdout) => {
      if (err) return reject(new Error(`ADB hatası: ${err.message}`));
      const lines = stdout.trim().split(/\r?\n/).slice(1);
      const deviceLine = lines.find(l => l.trim() && !l.startsWith('*'));
      if (!deviceLine) 
        return reject(new Error('Bağlı cihaz bulunamadı'));
      const id = deviceLine.split(/\s+/)[0];
      resolve(id);
    });
  });
};


export async function startScrcpy(deviceId?: string) {
  if (scrcpyProcess) {
    console.warn('scrcpy zaten çalışıyor');
    return;
  }
  try {
    const id = deviceId ?? await detectDeviceId();
    const bin = getScrcpyBin();
    const args = ['-s', id];
    const binFolder = path.dirname(bin);

    const options: { stdio: 'inherit'; env: NodeJS.ProcessEnv; cwd?: string } = {
      stdio: 'inherit',
      env: getEnv(),
    };
    if (process.platform === 'win32') {

      options.cwd = binFolder;
    }

    scrcpyProcess = spawn(bin, args, options);

    scrcpyProcess.on('close', code => {
      console.log(`scrcpy kapandı, exit kodu: ${code}`);
      scrcpyProcess = null;
    });
    scrcpyProcess.on('error', err => {
      console.error('scrcpy başlatılamadı:', err);
      scrcpyProcess = null;
    });
  } catch (e) {
    console.error(`scrcpy başlatılamadı: ${(e as Error).message}`);
  }
}

/*  Mevcut scrcpy sürecini durdurur.  */
export function stopScrcpy() {
  if (!scrcpyProcess) {
    console.warn('scrcpy çalışmıyor');
    return;
  }
  scrcpyProcess.kill();
  scrcpyProcess = null;
}
