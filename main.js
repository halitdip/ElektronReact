// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  if (!app.isPackaged) { 
    const url = process.env.ELECTRON_START_URL || 'http://localhost:8080';
    win.loadURL(url);
    if (process.env.DEBUG) {
      win.webContents.openDevTools({ mode: 'detach' });
    }
  } else { 
    const indexHtml = path.join(__dirname, 'dist', 'index.html');
    win.loadFile(indexHtml);
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
