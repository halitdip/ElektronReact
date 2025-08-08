// src/main/main.js
const { app, BrowserWindow } = require('electron');
const { registerScrcpyHandlers } = require('./handlers/scrcpy');
const { registerFileHandlers } = require('./handlers/file');
const { registerVersionHandler } = require('./handlers/version');
const { registerWindowHandlers } = require('./handlers/window');

const { createWindow } = require('./window');

if (!app.isPackaged) {
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
}

app.whenReady().then(() => {
  registerScrcpyHandlers();
  registerFileHandlers();
  registerVersionHandler();
  registerWindowHandlers();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
