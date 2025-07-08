// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    kiosk: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // Alt+F4 veya pencereyi kapatma girişimini engelle
  win.on('close', (event) => {
    event.preventDefault();
    // Burada istersen log atabilir, uyarı gösterebilirsin
    // Mesela: console.log("Kapatmak yasak!");
  });

  if (!app.isPackaged) { 
    const url = process.env.ELECTRON_START_URL || 'http://localhost:8080';
    win.loadURL(url);
    win.webContents.openDevTools({ mode: 'detach' });  // incele kısmı
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
