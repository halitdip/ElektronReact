const { app, BrowserWindow } = require('electron');
const path = require('path');
require('@electron/remote/main').initialize(); 

// geliştirme asamasında uyarıları devre dışı bırakma
if (!app.isPackaged) {
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
}

function createWindow() {
  const win = new BrowserWindow({
    width: 620,
    height: 340,
    kiosk: false,
    fullscreen: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    resizable: false
  });
  require('@electron/remote/main').enable(win.webContents);


  win.on('close', (event) => {
    event.preventDefault();
  });

  if (!app.isPackaged) {
    const url = process.env.ELECTRON_START_URL || 'http://localhost:8080';
    win.loadURL(url);
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    const indexHtml = path.join(__dirname, 'dist', 'index.html');
    win.loadFile(indexHtml)
      .catch(err => console.error('LoadFile Error:', err));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
