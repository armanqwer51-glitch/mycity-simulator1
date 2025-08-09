const { app, BrowserWindow } = require('electron');
const path = require('path');
function createWindow(){
  const win = new BrowserWindow({
    width: 1024, height: 768, fullscreen: true, autoHideMenuBar: true,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });
  win.loadFile(path.join(__dirname, 'index.html'));
  win.once('ready-to-show', ()=>{ win.show(); });
}
app.whenReady().then(createWindow);
app.on('window-all-closed', ()=>{ app.quit(); });