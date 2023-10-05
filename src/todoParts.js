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

    getTitle = () => {
        return this.title;
    }

    getDescription = () => {
        return this.description;
    }

    getDueDate = () => {
        return this.dueDate;
    }
}

export class Project {
    constructor(name){
        this.taskList = [];
        this.name = name;
    }

    addTask = (task) => {
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

    getTaskList = () => {
        return this.taskList;
    }

    setTasks = (newTaskList) => {
        this.taskList = newTaskList;
    }

    setProjectName = (newName) => {
        this.name = newName;
    }

    getName = () => { return this.name; }
     
}

export class ProjectController{
    constructor(name){
        this.name = name;
        this.projectList = [];
        this.projectList.push(new Project("Inbox"));
        this.currentProjectIndex = 0; //tracks the currently selected project
    }

    addProject = (projectName) => {
        const newProj = new Project(projectName);
        this.projectList.push(newProj);
    }

    deleteProject = (projectIndex) => {
        //remove task based on index
        const projectName = this.projectList[projectIndex].getName();
        
        this.projectList = this.projectList.filter(name => {
            return name.getName() != projectName;
        });

        console.log(projectName);
        console.log(this.projectList);
    }

    getProject = (index) => {
        return this.projectList[index];
    }

    getCurrentProject = () => {
        return this.projectList[this.currentProjectIndex];
    }

    getCurrentProjectIndex = () => {
        return this.currentProjectIndex;
    }

    setCurrentProjectIndex = (index) => {
        this.currentProjectIndex = index;
    }

    containsProject = (name) => { 
        return this.projectList.some((element) => element.getName().toLowerCase() === name.toLowerCase());
    }

    getProjects = () => {
        return this.projectList;
    }

    setProjects = (newProjectList) => {
        this.projectList = newProjectList;
    }

    getName = () => {
        return this.name;
    }

}