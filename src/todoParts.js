export class Task {
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

    setTitle = (newTitle) => {
        this.title = newTitle;
    }

    setDescription = (newDescription) => {
        this.description = newDescription;
    }

    setDueDate = (newDueDate) => {
        this.dueDate = newDueDate;
    }

    setPriority = (newPriority) => {
        this.priority = newPriority;
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

    deleteTask = (taskIndex) => {
        //remove task based on index
        this.taskList = this.taskList.filter(index => {
            return index != taskIndex;
        });
    }

    viewTasks = () => {
        this.taskList.forEach((task) => task.viewTaskDetails());
    }

    setProjectName = (newName) => {
        this.name = newName;
    }
     
    completeTask = (index) => {
        this.taskList[index].completeTask();
    }
}