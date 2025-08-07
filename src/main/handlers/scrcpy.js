// src/main/handlers/scrcpy.js
const { ipcMain } = require('electron');
const { spawn } = require('child_process');
const { getScrcpyBin, getEnv, detectDeviceId } = require('../utils/scrcpyUtils');

let scrcpyProcess = null;

function registerScrcpyHandlers() {
  ipcMain.handle('start-scrcpy', async (_, deviceId) => {
    if (scrcpyProcess) {
      return { success: false, message: 'scrcpy zaten çalışıyor' };
    }
    try {
      const id  = deviceId || await detectDeviceId();
      const bin = getScrcpyBin();
      scrcpyProcess = spawn(bin, ['-s', id], {
        stdio: 'inherit',
        env: getEnv(),
        cwd: process.platform === 'win32' ? require('path').dirname(bin) : undefined,
      });
      scrcpyProcess.on('close', () => { scrcpyProcess = null; });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  });

  ipcMain.handle('stop-scrcpy', () => {
    if (!scrcpyProcess) {
      return { success: false, message: 'scrcpy çalışmıyor' };
    }
    scrcpyProcess.kill();
    scrcpyProcess = null;
    return { success: true };
  });
}

module.exports = { registerScrcpyHandlers };
