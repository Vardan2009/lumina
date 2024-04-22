const { contextBridge,ipcRenderer, dialog} = require('electron')
const fs = require('fs');
const path = require('path')

const readChangelog = (callback) => {
    fs.readFile('lumina_chlog.json', (err, data) => {
        if (err) {
            callback(err);
        } else {
            callback(null, JSON.parse(data));
        }
    });
};

const readConfig = (callback) => {
    fs.readFile('lumina_config.json', (err, data) => {
        if (err) {
            callback(err);
        } else {
            callback(null, JSON.parse(data));
        }
    });
};

const readFile = (callback,path) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            callback(err);
        } else {
            callback(null,data.toString());
            document.title = "Lumina - " + path.split('\\').pop()
        }
    });
};

const openFolderDialog = async () => {
    try {
        const result = await ipcRenderer.invoke('open-folder-dialog');
        return result;
    } catch (error) {
        console.error('Error opening Folder:', error);
    }
};


const readFolderListing = async (dirPath)=>
{
    const result = {};
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            readFolderListing(filePath).then((res)=>result[file]=res);
        } else {
            result[file] = filePath;
        }
    });

    return result;
}

const createFSEntry = async (reloadfunc,type,rootpath) =>{

    const result = await ipcRenderer.invoke('new-entry-name-dialog');
    if(!result) return;
    let path = rootpath+'\\'+result;
    if(type === 'folder')
    {
        fs.mkdir(path,()=>{reloadfunc();})
    }
    else if(type === 'file')
    {
      
        fs.writeFile(path,"",()=>{ reloadfunc();});
    }
}

let currentPath,currentCode;
let saved;

const saveFile = async(path,code)=>{
    await fs.writeFile(path,code,()=>{})
}

const removeFile = (path,cb)=>{
    fs.unlink(path,cb)
}

const removeDirectory = (path,cb)=>{
    fs.rmdir(path,{recursive:true},cb)
}

contextBridge.exposeInMainWorld('electron', {
    readChangelog: readChangelog,
    readConfig: readConfig,
    openFolderDialog: openFolderDialog,
    readFolderListing : readFolderListing,
    readFile: readFile,
    createFSEntry: createFSEntry,
    saveFile:saveFile,
    removeFile:removeFile,
    removeDirectory:removeDirectory,
    checkIfSaved: (path,content)=>{
        if(!path) {saved = false; return false}
        try{
        let savedt = fs.readFileSync(path);
        saved = savedt==content;
        return savedt == content
        }
        catch{
            saved = false;
            return false}
    },
    onOpenFolder: (callback) => {
        ipcRenderer.on('open-folder', callback);

        return () => {
          ipcRenderer.removeListener('open-folder', callback);
        };
    },
    onExitEditor: (callback) => ipcRenderer.on('exit-editor',(e)=>callback()),
    setCurrentCode:(n)=>{currentCode = n},
    setCurrentPath:(n)=>{currentPath = n;},
    onSave:(callback)=>{ipcRenderer.on('save-file',()=>{callback()})}
})

ipcRenderer.on('save-file',()=>{
    saveFile(currentPath,currentCode)
    saved =true;
})