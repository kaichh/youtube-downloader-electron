const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const {
  download,
  setDownloadFolder,
  openDownloadFolder,
} = require('./downloader');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  //Used to auto open dev tools for debugging
  // win.openDevTools();

  win.loadFile('src/index.html');
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.handle('download', async (event, args) => {
  const { url, isAudioOnly } = args;
  return download(url, isAudioOnly);
});

ipcMain.handle('setDownloadFolder', () => {
  return setDownloadFolder();
});

ipcMain.handle('openDownloadFolder', () => {
  return openDownloadFolder();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
