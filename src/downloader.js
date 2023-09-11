const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const { dialog, shell } = require('electron');

let downloadPath = __dirname;

const download = async (url, isAudioOnly) => {
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath);
  }

  const fileExtension = isAudioOnly ? 'mp3' : 'mp4';

  return new Promise(async (resolve, reject) => {
    const stream = ytdl(url, {
      filter: isAudioOnly ? 'audioonly' : 'audioandvideo',
    });
    try {
      const videoInfo = await ytdl.getInfo(url);
      const videoTitle = videoInfo.videoDetails.title;

      stream.on('finish', () => {
        openDownloadFolder();
        resolve(`Finished downloading: ${videoTitle}.${fileExtension}`);
      });
      stream.on('error', (error) => {
        console.log('error downloading', error);
        reject(error);
      });
      stream.pipe(
        fs.createWriteStream(
          path.join(downloadPath, `${videoTitle}.${fileExtension}`)
        )
      );
    } catch (err) {
      reject(err);
    }

    // // Show the percentage of completion
    // stream.on('progress', (chunkLength, downloaded, total) => {
    //   const percent = downloaded / total;
    //   console.log('percent', percent);
    // });
  });
};

const setDownloadFolder = async () => {
  await dialog
    .showOpenDialog({ properties: ['openDirectory', 'createDirectory'] })
    .then((result) => {
      if (!result.canceled) {
        [downloadPath] = result.filePaths;
      }
    });
  return Promise.resolve(downloadPath);
};

const openDownloadFolder = () => {
  // Show the folder in the file manager
  shell.openPath(downloadPath);
};

module.exports = { download, setDownloadFolder, openDownloadFolder };
