const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Save',
                click(item, focusedWindow) {
                    saveItems(focusedWindow);
                }
            },
            {
                label: 'Open',
                click(item, focusedWindow) {
                    let dir = dialog.showOpenDialog(focusedWindow, {
                        properties: ['openDirectory']
                    });
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

