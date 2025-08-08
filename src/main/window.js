// src/main/window.js
const { BrowserWindow, app } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 620, height: 340,
    frame: false, resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      // Sandbox açıkken bazı file:// yüklemeleri sorun çıkarabiliyor.
      // Preload + contextIsolation varken sandbox'ı kapatmak pratik:
      sandbox: false,
    }
  });

  win.on('close', e => e.preventDefault());

  const isDev = !app.isPackaged;

  if (isDev) {
    const url = process.env.ELECTRON_START_URL || 'http://localhost:8080';
    win.loadURL(url);
    // win.webContents.openDevTools({ mode: 'detach' });
  } else {
    // Paketli uygulamada dist, resources klasörünün yanındaki app.asar içindedir.
    const indexFile = path.join(process.resourcesPath, 'app.asar', 'dist', 'index.html');
    // Bazı kurulumlarda app.asar olmadan da çalışsın diye fallback:
    const fallback = path.join(process.resourcesPath, 'dist', 'index.html');

    win.loadFile(indexFile).catch(() => win.loadFile(fallback));
  }
}

module.exports = { createWindow };
