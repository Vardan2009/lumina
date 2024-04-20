const { contextBridge,ipcRenderer} = require('electron')
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


contextBridge.exposeInMainWorld('electron', {
    readChangelog: readChangelog,
    openFolderDialog: openFolderDialog,
    readFolderListing : readFolderListing,
    readFile: readFile,
    onOpenFolder: (callback)=> ipcRenderer.on('open-folder',(e) => callback()),
    onExitEditor: (callback) => ipcRenderer.on('exit-editor',(e)=>callback())
})
