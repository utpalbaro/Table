const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let webContents;
let filepath = null;

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Save',
                click(item, focusedWindow) {
                    if (filepath) {
                        // simply save to path
                    } else {
                        // create the save dialog box
                        filepath = dialog.showSaveDialogSync(focusedWindow);
                    }
                    webContents.send('req:save');
                }
            },
            {
                label: 'Open',
                click(item, focusedWindow) {
                    let filepaths = dialog.showOpenDialogSync(focusedWindow, {
                        properties: ['openFile']
                    });
                    filepath = filepaths[0];
                    let data = fs.readFileSync(filepath, {
                        encoding: 'utf-8'
                    });
                    webContents.send('req:read', data);
                }
            }
        ]
    }
];

// Add dev tools if in production env
if (process.env.NODE_ENV != 'production') {
    menuTemplate.push({
        label: 'Developer tools',
        submenu: [
            {
                label: 'Toggle developer tools',
                accelerator: 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    webContents = win.webContents;

    win.loadFile('index.html');
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow();
        }
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

ipcMain.on('res:save', (event, data) => {
    if (filepath) {
        fs.writeFileSync(filepath, JSON.stringify(data, null, 4));
    }
})