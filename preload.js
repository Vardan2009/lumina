const { contextBridge } = require('electron')
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

contextBridge.exposeInMainWorld('electron', {
    readChangelog: readChangelog
})

