const { v4: uuid } = require('uuid');

class Task {
    id = '';
    description = '';
    completedDate = null;

    constructor(desc) {
        this.id = uuid();
        this.description = desc;
    }
}

module.exports = Task;