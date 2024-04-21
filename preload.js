const { contextBridge,ipcRenderer, dialog} = require('electron')
const fs = require('fs');
const path = require('path')

const readChangelog = (callback) => {
    fs.readFile('chlog.json', (err, data) => {
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

const saveFile = async(path,code)=>{
    alert("saving to "+path+" with "+code)
    await fs.writeFile(path,code,()=>{})
}

contextBridge.exposeInMainWorld('electron', {
    readChangelog: readChangelog,
    openFolderDialog: openFolderDialog,
    readFolderListing : readFolderListing,
    readFile: readFile,
    createFSEntry: createFSEntry,
    saveFile:saveFile,
    onOpenFolder: (callback)=> ipcRenderer.on('open-folder',(e) => callback()),
    onExitEditor: (callback) => ipcRenderer.on('exit-editor',(e)=>callback()),
    setCurrentCode:(n)=>{currentCode = n},
    setCurrentPath:(n)=>{currentPath = n;}
})

ipcRenderer.on('save-file',()=>{
    saveFile(currentPath,currentCode)
})