// src/main/window.js
const { BrowserWindow, app } = require('electron');
const path = require('path');

function createWindow() {
  const isDev = !app.isPackaged;

  const win = new BrowserWindow({
    width: 620,
    height: 340,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
    },
  });

  if (isDev && process.env.ELECTRON_START_URL) {
    win.loadURL(process.env.ELECTRON_START_URL);
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    // __dirname -> app.asar/src/main
    const prodIndex = path.join(__dirname, '../../dist/renderer/index.html');
    win.loadFile(prodIndex);
  }

  win.on('close', (e) => e.preventDefault());
}

module.exports = { createWindow };
