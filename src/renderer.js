const linkInput = document.getElementById('link-input');
const downloadVideoBtn = document.getElementById('download-video');
const downloadAudioBtn = document.getElementById('download-audio');
const setFolderBtn = document.getElementById('set-folder');
const openFolderBtn = document.getElementById('open-folder');

downloadVideoBtn.addEventListener('click', async () => {
  window.downloader
    .download(linkInput.value, false)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      alert(error);
    });
});

downloadAudioBtn.addEventListener('click', async () => {
  window.downloader
    .download(linkInput.value, true)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      alert(error);
    });
});

setFolderBtn.addEventListener('click', async () => {
  const response = await window.downloader.setDownloadFolder();
  console.log(response);
});

openFolderBtn.addEventListener('click', () => {
  window.downloader.openDownloadFolder();
});
