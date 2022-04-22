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
    },
  });

  win.loadFile('index.html');

  // Open the DevTools.
  win.webContents.openDevTools();

  //   setTimeout(() => {
  //     const win2 = new BrowserWindow({
  //       width: 600,
  //       height: 400,
  //     });
  //     win2.loadURL("http://localhost:3000/");
  //     //win2.loadURL("https://google.com/");
  //   }, 8000);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
