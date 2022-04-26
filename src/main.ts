const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 600,
    backgroundColor: '#111827',
    webPreferences: {
      //preload: path.join(__dirname, "./preload.js"),
      nodeIntegration: true,
      // worldSafeExecuteJavascript: true,
      contextIsolation: false,
      devTools: false,
    },
  });

  win.loadFile(`${__dirname}/index.html`);

  // Open the DevTools.
  win.webContents.openDevTools();
}

// function createSplashWindow() {
//   const win = new BrowserWindow({
//     width: 400,
//     height: 200,
//     backgroundColor: '#6e707e',
//     frame: false,
//     transparent: true,
//     webPreferences: {
//       //preload: path.join(__dirname, "./preload.js"),
//       nodeIntegration: true,
//       // worldSafeExecuteJavascript: true,
//       contextIsolation: false,
//       devTools: false,
//     },
//   });

//   win.loadFile(`${__dirname}/splash.html`);
// }

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
