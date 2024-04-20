// MAIN.JS FOR LUMINA
// WRITTEN BY VARDAN PETROSYAN

// load stuff
const {app, BrowserWindow,dialog,ipcMain} = require("electron")
const path = require('node:path')

let window;

app.whenReady().then(()=>{
    // create window instance
    window = new BrowserWindow({
        title:"Lumina Code",
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true,
            preload:path.join(__dirname, 'preload.js')
        }
    });
    // load html
    //window.loadFile('./lumina/build/index.html') // ONLY USE IN PRODUCTION
    window.loadURL("http://localhost:3000")
})

ipcMain.handle('open-folder-dialog', async () => {
    const result = await dialog.showOpenDialog(window,{
        title:"Lumina - Open Folder",
        properties: ['openDirectory'],
        filters: [{ name: 'Folders', extensions: [''] }]
    });
    
    return result;
});