const path = require('path');

const { app, BrowserWindow, globalShortcut } = require('electron');
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    // width: 800,
    // height: 600,

    // frame: false,
    show: false,

    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.maximize();
  win.show();

  win.loadURL(
    isDev
      ? 'http://localhost:3006'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}
app.userAgentFallback = app.userAgentFallback.replace('Electron/' + process.versions.electron, '');
app.whenReady().then(createWindow);

//Disable keyboard reload for production
// app.on('browser-window-focus', function () {
//     globalShortcut.register("CommandOrControl+R", () => {
//         console.log("CommandOrControl+R is pressed: Shortcut Disabled");
//     });
//     globalShortcut.register("F5", () => {
//         console.log("F5 is pressed: Shortcut Disabled");
//     });
// });
// app.on('browser-window-blur', function () {
//     globalShortcut.unregister('CommandOrControl+R');
//     globalShortcut.unregister('F5');
// });


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});