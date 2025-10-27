import { app, BrowserWindow } from 'electron';
import path from 'path';
import { registerHandlers } from './ipc/databaseApi'

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, '../dist-electron/preload.js'),
    },
  });

  win.loadFile(path.join(__dirname, '../dist/desktop-flashcards-application/browser/index.html'));
}

app.whenReady().then(() => {
  // register ipc handlers
  registerHandlers();
  // create window application
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
