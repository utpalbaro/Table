/**
 * Specific to this project
 */

class WorkLog {
    addLogEntry() {
        const divMain = document.getElementById("main");

        const divTask = document.createElement('div');
        divTask.className = 'task'

        divMain.appendChild(divTask);

        const time = new Date();
        const divTime = document.createElement('div');
        divTime.className = 'time'
        
        const divText = document.createElement('div');
        divText.className = 'desc'

        const desc = document.createElement('textarea');
        divText.appendChild(desc);

        divTask.appendChild(divTime);
        divTask.appendChild(divText);
    }
}
