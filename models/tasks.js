const Task = require('./task');

class Tasks {
    
    _list = {};

    get listArray() {
        const list = [];

        Object.keys(this._list).forEach( key => {
            const task = this._list[key]
            list.push(task);
        })

        return list;
    }

    constructor() {
        this._list = {};
    }

    loadTasksFromArray(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task;
        })
    }

    createTask(desc = '') {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    showAllTasks() {
        this.listArray.forEach((task, i) => {
            const idx = i+1;
            const {description, completedDate} = task;
            const idxFormatted = completedDate ? idx.toString().green : idx.toString().red;
            const state = completedDate ? 'Completed'.green : 'Pending'.red;
            console.log(`${idxFormatted} ${description} :: ${state}`);
        });
    }

    listPendingOrCompleted( completed = true ) {
        let counter = 0;
        this.listArray.forEach((task, i) => {
            const {description, completedDate} = task;
            const state = completedDate ? 'Completed'.green : 'Pending'.red;
            if(completed) {
                if (completedDate) {
                    counter++;
                    console.log(`${counter.toString().green} ${description} :: ${completedDate.green}`);
                }
            } else {
                if(!completedDate) {
                    counter++;
                    console.log(`${counter.toString().red}. ${description} :: ${state}`);
                }
            }
        });
    } 

    deleteTask(id = '') {
        if(this._list[id]) {
            delete this._list[id];
        }
    }

    toggleComplete(ids = []) {
        ids.forEach(id => {
            const task = this._list[id];
            if (!task.completedDate) {
                task.completedDate = new Date().toISOString();
            }
        });

        this.listArray.forEach(task => {
            if(!ids.includes(task.id)) {
                this._list[task.id].completedDate = null;
            }
        })
    }
}

module.exports = Tasks;