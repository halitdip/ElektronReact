// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    startScrcpy: (deviceId) => ipcRenderer.invoke('start-scrcpy', deviceId),
    stopScrcpy: () => ipcRenderer.invoke('stop-scrcpy'),
    getAppVersion: () => ipcRenderer.invoke('get-app-version'),
    copyPasteFile: (src, dest) => ipcRenderer.invoke('copy-paste-file', src, dest)
})