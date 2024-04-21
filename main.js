// MAIN.JS FOR LUMINA
// WRITTEN BY VARDAN PETROSYAN

// load stuff
const {app, BrowserWindow,dialog,ipcMain,Menu,MenuItem} = require("electron")
const path = require('node:path')
const prompt = require('electron-prompt');

let window;

const openFolderDialogLocal =  async () => {
    const result = await dialog.showOpenDialog(window,{
        title:"Lumina - Open Folder",
        properties: ['openDirectory'],
        filters: [{ name: 'Folders', extensions: [''] }]
    });
    
    return result;
}

const newEntryNameDialog = async()=>{
    let r = await prompt({
        title: 'New...',
        label: 'Name:',
        inputAttrs: {
            type: 'text'
        },
        height:200,
        type: 'input'
    })
    if(r === null) {
        return;
    } else {
        return r;
    }
};


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
            label:"Save",
            accelerator: process.platform === 'darwin' ? 'Cmd+S' : 'Ctrl+S',
            click: ()=>{window.webContents.send('save-file')}
        },
        {
            label:"Exit Editor",
            accelerator: process.platform === 'darwin' ? 'Cmd+E' : 'Ctrl+E',
            click: ()=>{window.webContents.send('exit-editor')}
        }
    ]
    }))

    menu.append(new MenuItem({
        label:"Developer",
        submenu:[
            {
                label:"Open Chrome DevTools",
                accelerator: process.platform === 'darwin' ? 'Cmd+Shift+I' : 'Ctrl+Shift+I',
                click: ()=>{window.webContents.openDevTools()}
            },
            {
                label:"Reload Page",
                accelerator: process.platform === 'darwin' ? 'Cmd+R' : 'Ctrl+R',
                click: ()=>{window.webContents.reloadIgnoringCache()}
            }
        ]
    }));

    Menu.setApplicationMenu(menu)
    window.setBackgroundColor('#0f111a');
    // load html
    //window.loadFile('./lumina/build/index.html') // ONLY USE IN PRODUCTION
    window.loadURL("http://localhost:3000")

})

ipcMain.handle('open-folder-dialog',openFolderDialogLocal);
ipcMain.handle('new-entry-name-dialog',newEntryNameDialog)