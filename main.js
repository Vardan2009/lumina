// MAIN.JS FOR LUMINA
// WRITTEN BY VARDAN PETROSYAN

// load stuff
const {app, BrowserWindow} = require("electron")
const path = require('node:path')

app.whenReady().then(()=>{
    // create window instance
    const window = new BrowserWindow({
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