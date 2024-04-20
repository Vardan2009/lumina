const { contextBridge,ipcRenderer} = require('electron')
const fs = require('fs');

const readChangelog = (callback) => {
    fs.readFile('chlog.json', (err, data) => {
        if (err) {
            callback(err);
        } else {
            callback(null, JSON.parse(data));
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



contextBridge.exposeInMainWorld('electron', {
    readChangelog: readChangelog,
    openFolderDialog: openFolderDialog
})

