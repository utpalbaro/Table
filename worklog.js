const {ipcRenderer} = require('electron');

const Tabulator = require('tabulator-tables');

const table = new Tabulator("#tasks-div", {
    // height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    layout:"fitColumns", //fit columns to width of table (optional)
    // responsiveLayout: true,
    autoResize: true,
    movableRows: true,
    columns:[ //Define Table Columns
        {rowHandle:true, formatter:"handle", headerSort:false, frozen:true, width:30, minWidth:30},
        {title:"Task", field:"task", editor:"input", formatter:"textarea"},
        {title:"Status", field:"status", editor:"input", width: 180},
        {title:"Start", field:"start", sorter:"date", hozAlign:"center", width: 180},
        {title:"End", field:"end", sorter:"date", hozAlign:"center", width: 180},
    ]
});

const textInput = document.getElementById('task-entry');
textInput.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        const currentDate = new Date();
        
        const data = {
            task: textInput.value,
            status: 'Incomplete',
            start: currentDate.toLocaleString(),
            end: ''
        };

        table.addRow(data, false);

        // clear the text input
        textInput.value = "";
    }
});


ipcRenderer.on('req:save', (event) => {
    // table.download('json', filename);
    const data = table.getData();
    ipcRenderer.send('res:save', data);
});

ipcRenderer.on('req:read', (event, data) => {
    table.setData(data);
})