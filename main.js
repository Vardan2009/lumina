// MAIN.JS FOR LUMINA
// WRITTEN BY VARDAN PETROSYAN

// load stuff from electron
const {app, BrowserWindow} = require("electron")

app.whenReady().then(()=>{
    // create window instance
    const window = new BrowserWindow({
        title:"Lumina Code",
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration: true
        }
    });

    // load html
    window.loadFile('index.html')
})