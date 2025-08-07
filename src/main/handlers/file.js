// src/main/handlers/file.js
const { ipcMain } = require('electron');
const fs = require('fs').promises;
const path = require('path');

function registerFileHandlers() {
  ipcMain.handle('copy-paste-file', async (_, src, dest) => {
    try {
      await fs.mkdir(path.dirname(dest), { recursive: true });
      await fs.copyFile(src, dest);
      return { success: true };
    } catch (err) {
      console.error('Kopyalama hatası:', err);
      return { success: false, message: err.message };
    }
  });
}

module.exports = { registerFileHandlers };
