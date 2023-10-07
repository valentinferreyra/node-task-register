const Task = require('./models/task');
const Tasks = require('./models/tasks');
const { inquirerMenu,
    pause,
    readInput } = require('./helpers/inquirer');
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
                console.log(tasks.listArray);
            break;
        }
        save(tasks.listArray);
        await pause();
    } while (opt !== '0');
}

main();