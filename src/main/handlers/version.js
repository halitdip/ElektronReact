// src/main/handlers/version.js
const { ipcMain, app } = require('electron');

function registerVersionHandler() {
  ipcMain.handle('get-app-version', () => ({
    version: app.getVersion()
  }));
}

module.exports = { registerVersionHandler };
