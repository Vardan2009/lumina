// MAIN.JS FOR LUMINA
// WRITTEN BY VARDAN PETROSYAN

// load stuff
const {app, BrowserWindow,dialog,ipcMain,Menu,MenuItem, ipcRenderer} = require("electron")
const path = require('node:path')

let window;

const openFolderDialogLocal =  async () => {
    const result = await dialog.showOpenDialog(window,{
        title:"Lumina - Open Folder",
        properties: ['openDirectory'],
        filters: [{ name: 'Folders', extensions: [''] }]
    });
    
    return result;
}

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

    const menu = new Menu()
    menu.append(new MenuItem({
        label:"File",
        submenu:[{
            label:"Open Folder",
            accelerator: process.platform === 'darwin' ? 'Cmd+O' : 'Ctrl+O',
            click: ()=>{window.webContents.send('open-folder')}
        },
        {
            label:"Exit Editor",
            accelerator: process.platform === 'darwin' ? 'Cmd+E' : 'Ctrl+E',
            click: ()=>{window.webContents.send('exit-editor')}
        }
    ]
    }))

    Menu.setApplicationMenu(menu)

    // load html
    //window.loadFile('./lumina/build/index.html') // ONLY USE IN PRODUCTION
    window.loadURL("http://localhost:3000")
})

ipcMain.handle('open-folder-dialog',openFolderDialogLocal);