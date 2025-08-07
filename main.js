const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs').promises

ipcMain.handle('copy-paste-file', async (_, src, dest) => {
  try {
    await fs.mkdir(path.dirname(dest), { recursive: true })
    await fs.copyFile(src, dest)
    return { success: true }
  } catch (err) {
    console.error('Kopyalama hatası:', err)
    return { success: false, message: err.message }
  }
})

// “start-scrcpy” komutunu dinle
ipcMain.handle('start-scrcpy', async (_, deviceId) => {
  if (scrcpyProcess) return { success: false, message: 'Zaten çalışıyor' }
  try {
    // detectDeviceId fonksiyonunu buraya taşıdığınızdan emin olun
    const id = deviceId || await detectDeviceId()
    const bin = getScrcpyBin()
    scrcpyProcess = spawn(bin, ['-s', id], {
      stdio: 'inherit',
      env: getEnv(),
      cwd: path.dirname(bin),
    })
    scrcpyProcess.on('close', () => { scrcpyProcess = null })
    return { success: true }
  } catch (err) {
    return { success: false, message: err.message }
  }
})

// “stop-scrcpy” komutunu dinle
ipcMain.handle('stop-scrcpy', async () => {
  if (!scrcpyProcess) return { success: false, message: 'Çalışmıyor' }
  scrcpyProcess.kill()
  scrcpyProcess = null
  return { success: true }
})

// Versiyon almak için
ipcMain.handle('get-app-version', () => ({ version: app.getVersion() }))


/* require('@electron/remote/main').initialize(); */

// geliştirme asamasında uyarıları devre dışı bırakma
if (!app.isPackaged) {
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
}
if (app.isPackaged) {
  win.webContents.closeDevTools()
}
function createWindow() {
  const win = new BrowserWindow({
    width: 620,
    height: 340,
    kiosk: false,
    fullscreen: false,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,

      preload: path.join(__dirname, 'preload.js'),
      sandbox: true,
    },
    resizable: false
  });
  /*  require('@electron/remote/main').enable(win.webContents); */


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
