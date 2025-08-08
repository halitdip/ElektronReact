// src/main/handlers/version.js
const { ipcMain, app } = require('electron');
const { exec } = require('child_process');

function registerVersionHandler() {
  // program version
  ipcMain.handle('get-app-version', () => ({
    version: app.getVersion()
  }));
  // el terminali version

  ipcMain.handle('get-terminal-version', async () => {
    return new Promise((resolve, reject) => {
      exec('adb shell dumpsys package com.a101.magazaterminal', (err, stdout) => {
        if (err) {
          return resolve({ version: null, error: err.message });
        }
        const match = stdout.match(/versionName=([\d.]+)/);
        resolve({ version: match ? match[1] : null });
      });
    });
  });
}

module.exports = { registerVersionHandler };
