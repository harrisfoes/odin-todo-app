class Task {
    constructor(title,description,dueDate,priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = "pending";
    }

    viewTaskDetails = () => {
        console.log(`Title: ${this.title}, Description: ${this.description}, Due date: ${this.dueDate}, Priority: ${this.priority}, Status: ${this.status}`);
    }

    completeTask = () => {
        this.status = "completed";
    }

}

export class Project {
    constructor(name){
        this.taskList = [];
        this.name = name;
    }

    addTask = (title,description,dueDate,priority) => {
        const task = new Task(title,description,dueDate,priority);
        this.taskList.push(task);
    }
}