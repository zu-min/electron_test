const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

var force_quit = false;
var menu = Menu.buildFromTemplate([{
  label: 'Sample',
  submenu: [
    {label: 'About App', selector: 'orderFrontStandardAboutPanel:'},
    {
      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      click: function(){
        app.quit();
      }
    }
  ]
}]);

app.on('window-all-closed', function(){
  console.log('window-all-closed');
  if(process.platform != 'darwin'){
    app.quit();
  }
});

app.on('will-quit',function(){
  console.log('will-quit');
  mainWindow = null;
});

app.on('ready', function(){
  Menu.setApplicationMenu(menu);
  // mainWindow = new BrowserWindow({
  //   width: 800,
  //   heigth: 600,
  //   webPreferences: {
  //     nodeIntegration: false
  //   }
  // });
  mainWindow = new BrowserWindow({width: 800, heigth: 600});

  // 開発者ツール
  mainWindow.openDevTools();

  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  mainWindow.on('close', function(e){
    console.log('close');
    if(!force_quit){
      e.preventDefault();
      mainWindow.hide();
    }
  });

  app.on('before-quit', function(e){
    console.log('before-quit');
    force_quit = true;
  });
  app.on('activate', function(){
    console.log('reactive');
    mainWindow.show();
  });
});
