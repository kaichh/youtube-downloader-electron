module.exports = {
  packagerConfig: {
    asar: true,
    icon: './images/icon',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        certificateFile: './cert.pfx',
        certificatePassword: process.env.CERTIFICATE_PASSWORD,
        authors: 'KC',
        description: 'A YouTube downloader desktop app built with Electron',
      },
    },
    // {
    //   name: '@electron-forge/maker-dmg',
    //   config: {
    //     authors: 'KC',
    //     description: 'A YouTube downloader desktop app built with Electron',
    //     background: './assets/dmg-background.png',
    //     format: 'ULFO',
    //   },
    // },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'linux'],
      config: {
        authors: 'KC',
        description: 'A YouTube downloader desktop app built with Electron',
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};
