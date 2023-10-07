const Task = require('./models/task');
const Tasks = require('./models/tasks');
const { inquirerMenu,
        pause,
        readInput,
        listTaskToDelete, 
        listTaskToComplete,
        confirm} = require('./helpers/inquirer');
const { save, read } = require('./helpers/db');
require('colors');

const main = async() => {
    
    let opt = '';
    const tasks = new Tasks();

    const taskDB = read();
    if(taskDB) {
        tasks.loadTasksFromArray(taskDB);
    }


    do {
        // inquirerMenu prints the menu
        opt = await inquirerMenu();
       
        switch (opt) {
            case '1':
                    const desc = await readInput('Description:');
                    tasks.createTask(desc);
            break;
            
            case '2':
                tasks.showAllTasks();
            break;

            case '3':
                tasks.listPendingOrCompleted();
            break;

            case '4':
                tasks.listPendingOrCompleted(completed = false);
            break;

            case '5':
                const ids = await listTaskToComplete(tasks.listArray);
                tasks.toggleComplete(ids);
            break;

            case '6':
                const id = await listTaskToDelete(tasks.listArray);
                if (id !== '0') {
                    const ok = confirm('Are you sure?');
                    if (ok) {
                        tasks.deleteTask(id);
                        console.log('Task deleted.'.green);
                    }
                }
            break;
        }
        save(tasks.listArray);
        await pause();
    } while (opt !== '0');
}

main();