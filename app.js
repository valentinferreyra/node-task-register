const { inquirerMenu,
        pause,
        readInput } = require('./helpers/inquirer');
const Task = require('./models/task');
const Tasks = require('./models/tasks');
require('colors');

const main = async() => {
    
    let opt = '';
    const tasks = new Tasks();


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

        await pause();

    } while (opt !== '0');
}

main();