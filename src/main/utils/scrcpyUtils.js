// src/main/utils/scrcpyUtils.js
const path = require('path');
const { exec } = require('child_process');

function getScrcpyBin() {
  return process.platform === 'win32'
    ? path.join('C:', 'Program Files', 'Android_Tools', 'scrcpy', 'scrcpy-noconsole.exe')
    : 'scrcpy';
}

function getEnv() {
  const env = { ...process.env };
  if (process.platform === 'win32') {
    const binFolder = path.dirname(getScrcpyBin());
    env.PATH = `${env.PATH};${binFolder}`;
  }
  return env;
}

function detectDeviceId() {
  return new Promise((resolve, reject) => {
    exec('adb devices', { env: getEnv() }, (err, stdout) => {
      if (err) return reject(new Error(`ADB hatası: ${err.message}`));
      const lines = stdout.trim().split(/\r?\n/).slice(1);
      const deviceLine = lines.find(l => l.trim() && !l.startsWith('*'));
      if (!deviceLine) return reject(new Error('Bağlı cihaz bulunamadı'));
      resolve(deviceLine.split(/\s+/)[0]);
    });
  });
}

module.exports = { getScrcpyBin, getEnv, detectDeviceId };
