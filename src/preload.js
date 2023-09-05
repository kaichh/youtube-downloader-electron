const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('versions', {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
// });

contextBridge.exposeInMainWorld('downloader', {
  download: async (url, isAudioOnly) => {
    const result = ipcRenderer.invoke('download', { url, isAudioOnly });
    return result;
  },
  setDownloadFolder: () => {
    const result = ipcRenderer.invoke('setDownloadFolder');
    return result;
  },
  openDownloadFolder: async () => {
    ipcRenderer.invoke('openDownloadFolder');
  },
});
