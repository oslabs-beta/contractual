const { app, BrowserWindow } = require('electron');
const path = require('path');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createSplashWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 300,
    // backgroundColor: '#6e707e',
    frame: false,
    transparent: true,
    webPreferences: {
      //preload: path.join(__dirname, "./preload.js"),
      nodeIntegration: true,
      // worldSafeExecuteJavascript: true,
      contextIsolation: false,
      // devTools: false,
    },
  });

  win.loadFile(`${__dirname}/splash.html`);

  return win;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 600,
    backgroundColor: '#111827',
    // No overlapping with splash page
    show: false,
    webPreferences: {
      //preload: path.join(__dirname, "./preload.js"),
      nodeIntegration: true,
      // worldSafeExecuteJavascript: true,
      contextIsolation: false,
      // Access to chrome dev tool
      devTools: true,
    },
  });

  win.loadFile(`${__dirname}/index.html`);

  // Open the DevTools.
  win.webContents.openDevTools();

  return win;
}

app.whenReady().then(() => {
  const splash = createSplashWindow();
  const mainApp = createWindow();

  mainApp.once('ready-to-show', () => {
    setTimeout(() => {
      splash.destroy();
      mainApp.show();
    }, 2000);
  });

  // app.on('activate', () => {
  //   if (BrowserWindow.getAllWindows().length === 0) createWindow();
  // });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
