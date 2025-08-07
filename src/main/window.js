// src/main/window.js
const { BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 620, height: 340,
    frame: false, resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      sandbox: true,
    }
  });

  win.on('close', e => e.preventDefault());

  if (!require('electron').app.isPackaged) {
    const url = process.env.ELECTRON_START_URL || 'http://localhost:8080';
    win.loadURL(url);
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'))
       .catch(err => console.error('LoadFile Error:', err));
  }
}

module.exports = { createWindow };
