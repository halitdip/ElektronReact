// src/main/handlers/window.js
const { ipcMain, BrowserWindow } = require('electron');

function registerWindowHandlers() {
  ipcMain.handle('window-minimize', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) win.minimize();
  });
  ipcMain.handle('window-close', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) {
      // removeAllListeners('close') işlemini de burada yapabilirsiniz
      win.removeAllListeners('close');
      win.close();
    }
  });
}

module.exports = { registerWindowHandlers };
