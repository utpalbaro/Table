const {ipcRenderer} = require('electron');

const Tabulator = require('tabulator-tables');

const table = new Tabulator("#tasks-div", {
    // height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
    layout:"fitColumns", //fit columns to width of table (optional)
    // responsiveLayout: true,
    autoResize: true,
    columns:[ //Define Table Columns
        {title:"Task", field:"task", editor:"input"},
        {title:"Status", field:"status", editor:"input"},
        {title:"Start", field:"start", sorter:"date", hozAlign:"center"},
        {title:"End", field:"end", sorter:"date", hozAlign:"center"},
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