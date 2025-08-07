// src/hooks/useAdb.ts
import { execFile, ChildProcessWithoutNullStreams } from 'child_process';
import path from 'path';

let cachedDeviceId: string | null = null;
const getAdbBin = () => path.join('C:', 'Program Files', 'Android_Tools', 'adb.exe');
const getEnv = () => ({ ...process.env, PATH: `${process.env.PATH};${path.dirname(getAdbBin())}` });

export const detectDeviceId = (): Promise<string> => {
  if (cachedDeviceId) return Promise.resolve(cachedDeviceId);
  return new Promise((res, rej) => {
    execFile(getAdbBin(), ['devices'], { env: getEnv() }, (err, stdout) => {
      if (err) return rej(err);
      const lines = stdout.trim().split(/\r?\n/).slice(1);
      const deviceLine = lines.find(l => l && !l.includes('unauthorized'));
      if (!deviceLine) return rej(new Error('Bağlı cihaz bulunamadı'));
      cachedDeviceId = deviceLine.split(/\s+/)[0];
      res(cachedDeviceId);
    });
  });
};

export const pushSqlFile = async (
  localPath: string,
  remotePath: string,
  deviceId?: string
): Promise<void> => {
  const id = deviceId || await detectDeviceId();
  const args = ['-s', id, 'push', localPath, remotePath];
  return new Promise((resolve, reject) => {
    execFile(getAdbBin(), args, { env: getEnv() }, (err, _stdout, stderr) => {
      if (err) {
        // stderr’i de mesajda göster
        return reject(new Error(`adb push hata (code ${err.code}): ${stderr.trim()}`));
      }
      resolve();
    });
  });
};
