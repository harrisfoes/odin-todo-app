import { Task, Project, ProjectController } from "./todoParts.js";
import { Storage } from "./storage.js";
import { format } from "date-fns";

export class UI {
    constructor() {
        this.app = new ProjectController("KulamBee");
        this.storage = new Storage("todoApp");
    }

    init = () => {
        this.initStorage();
        this.updateProjectBoard();
        this.setInboxAsCurrentProject();
        this.updateTodoBoard();
    }

    initStorage = () => {

        if (this.storage.containsStorage()) {
            console.log("storage found!");
            //this should be converted to ProjectController object
            const todoList = Object.assign(new ProjectController("KulamBee"), this.storage.retrieveStorage());
            const todoProjects = todoList.getProjects().map((projects) => Object.assign(new Project(), projects))
            todoList.setProjects(todoProjects);

            todoList.getProjects().forEach((project) => project.setTasks( 
                project.getTaskList().map((tasks) => Object.assign(new Task(), tasks)))
            );

            this.app = todoList;
            console.log(this.app);
            
        }
        else {
            this.saveStorage();
        }
    }

    saveStorage = () => {
        this.storage.storeObject(this.app);
    }

    clearProjectBoard = () => { 
        const projectBoard = document.querySelector('.project-board');
        projectBoard.innerHTML = '';
    }

    updateProjectBoard = () => {
        
        const projectBoard = document.querySelector('.project-board');

        projectBoard.appendChild(this.displayProjectList());
        projectBoard.appendChild(this.createProjectForm());

        //add event listeners for active buttons
        const addProjectBtn = document.querySelector('.add-button');
        addProjectBtn.addEventListener("click", this.addNewProject);

        const projectBtns = document.querySelectorAll('.project-li');
        console.log(projectBtns);

        projectBtns.forEach((button) => {
            button.addEventListener('click', this.setAsCurrentProject);
        });

        const deleteProjectBtns = document.querySelectorAll('.delete-p-btn');
        deleteProjectBtns.forEach((button) => {
            button.addEventListener('click', this.deleteProject);
        });
    }

    displayProjectList = () => {
        //title
        const title = document.createElement('h3');
        title.textContent = "Projects";

        //inbox div
        const projectList = document.createElement('ul');
        projectList.classList.add('projects');

        //generate project buttons
        const projectBtns = this.app.getProjects().forEach( (project, index) =>  projectList.appendChild(this.displayProjects(project.getName(), index)));
        console.log(projectBtns);
        console.log(projectList);
        //projectList.appendChild(projectBtns);

        console.log(projectList);
        return projectList;
    }

    createProjectForm = () => {
        const form = document.createElement("form");
        form.setAttribute("action", "#");

        const projectInput = document.createElement("input");
        projectInput.setAttribute("placeholder", "Add Project");
        projectInput.setAttribute("required", "");
        projectInput.classList.add("project-item");

        const projectAddBtn = document.createElement("button");
        projectAddBtn.classList.add("add-button");

        const plusIcon = document.createElement('i');
        plusIcon.classList.add('fa');
        plusIcon.classList.add('fa-plus');
        plusIcon.setAttribute("aria-hidden", true);

        const btnSpan = document.createElement('span');
        btnSpan.textContent = "Add";

        projectAddBtn.appendChild(plusIcon);
        projectAddBtn.appendChild(btnSpan);

        form.appendChild(projectInput);
        form.appendChild(projectAddBtn);
        
        return form;
    }

    addNewProject = (evt) => {
        evt.preventDefault();

        const newProjectName = document.querySelector('.project-item').value;

        if(newProjectName == ''){
            alert("Project name cannot be empty");
            return;
        }else if (this.app.containsProject(newProjectName)){
            alert("Project name already exists");
            return;
        }

        this.app.addProject(newProjectName);
        this.saveStorage();
        this.clearProjectBoard();
        this.updateProjectBoard();
    }

    deleteProject = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        console.log("here we will delete");
        const index = evt.target.closest("button").dataset.index;

        if(index == 0){
            alert("Cannot remove default project: Inbox");
            return;
        }

        this.app.deleteProject(index);
        this.setInboxAsCurrentProject();
        this.saveStorage();
        this.clearProjectBoard();
        this.updateProjectBoard();

    } 

    displayProjects(projectName, projectIndex) {

        //list element
        const li = document.createElement('li');
        li.classList.add('project-li');
        li.dataset.index = projectIndex;

        const leftDiv = document.createElement('div');
        leftDiv.classList.add('left-div');

        //button element
        const btn = document.createElement('button');
        btn.classList.add('project-btn');
        btn.dataset.index = projectIndex;
        //project icon
        const card = document.createElement('i');
        card.classList.add('fa-solid');
        card.classList.add('fa-table-list');
        card.setAttribute("aria-hidden", true);
        //project text
        const cardSpan = document.createElement('span');
        cardSpan.classList.add('project-name');
        cardSpan.textContent = projectName;

        //const rightDiv 
        const rightDiv = document.createElement('div');
        rightDiv.classList.add('right-div');        

        //xbutton element
        const xbtn = document.createElement('button');
        xbtn.classList.add('delete-p-btn');
        xbtn.dataset.index = projectIndex;
        //project icon
        const close = document.createElement('i');
        close.classList.add('fas');
        close.classList.add('fa-times');
        close.setAttribute("aria-hidden", true);

        xbtn.appendChild(close);

        btn.appendChild(card);
        btn.appendChild(cardSpan);

        leftDiv.appendChild(btn);
        rightDiv.appendChild(xbtn);

        li.appendChild(leftDiv);
        li.appendChild(rightDiv);

        return li;
    }

    setAsCurrentProject = (evt) => {
        
        const index = evt.target.closest("li").dataset.index;

        this.app.setCurrentProjectIndex(index);
        this.saveStorage();

        const projectList = document.querySelectorAll('.project-li');
        projectList.forEach((listItem) => listItem.classList.remove("current-project"));
        evt.target.closest("li").classList.add("current-project");

        this.clearTodoBoard();
        this.updateTodoBoard();

    }

    setInboxAsCurrentProject = () => {
        this.app.setCurrentProjectIndex(0);
        const inboxLi = document.querySelectorAll('.project-li')[0];
        inboxLi.classList.add("current-project");
    }

    updateTodoBoard = () => {
        const todoBoard = document.querySelector(".todo-board");
        const title = document.createElement("h2");
        const tspan = document.createElement("span");
        
        const icon = document.createElement("i");
        icon.classList.add("fa");
        icon.classList.add("fa-list");
        icon.setAttribute("aria-hidden", "true");
        tspan.textContent = this.app.getCurrentProject().getName();
        title.appendChild(icon);
        title.appendChild(tspan);

        todoBoard.appendChild(title);
        //append todo ul
        todoBoard.appendChild(this.displayTodoList(this.app.getCurrentProject()));
        //append form
        todoBoard.appendChild(this.createTodoForm());
        
        const addTodoBtn = document.querySelector(".todo-add-btn");
        addTodoBtn.addEventListener("click", this.addNewTask);
    }

    displayTodoList = (project) => {
        const taskList = project.getTaskList();
        const ul = document.createElement("ul");

        taskList.forEach((task) => ul.appendChild(this.generateTodoItems(task)));
        ul.classList.add("todo-listing");

        return ul;
    }

    generateTodoItems = (task) => {
        console.log(task);
        const li = document.createElement("li");
        li.classList.add("todo-li")

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", "todo-check");
        checkbox.setAttribute("id", "todo-check");

        //title
        const title = document.createElement("div");
        title.classList.add("todo-title");
        title.textContent = task.getTitle();

        //desc
        const desc = document.createElement("div");
        desc.classList.add("todo-desc");
        desc.textContent = task.getDescription();

        //date
        const due = document.createElement("div");
        const dd = document.createElement("span");
        due.classList.add("todo-date");
        dd.classList.add("dd");
        dd.textContent = task.getDueDate();
        due.textContent = "Due: ";
        due.appendChild(dd);

        //star
        const starDiv = document.createElement("div");
        const star = document.createElement('i');
        star.classList.add('fa-regular');
        star.classList.add('fa-star');
        starDiv.appendChild(star);

        //edit
        const editDiv = document.createElement("div");
        const edit = document.createElement('i');
        edit.classList.add('fas');
        edit.classList.add('fa-edit');
        editDiv.appendChild(edit);

        //close
        const closeDiv = document.createElement("div");
        const close = document.createElement('i');
        close.classList.add('fa-regular');
        close.classList.add('fa-circle-xmark');
        closeDiv.appendChild(close);

        li.appendChild(checkbox);
        li.appendChild(title);
        li.appendChild(desc);
        li.appendChild(due);
        li.appendChild(starDiv);
        li.appendChild(editDiv);
        li.appendChild(closeDiv);

        return li;
    }

    addNewTask = (evt) => {
        evt.preventDefault();
        console.log(evt);
        console.log("add a task");

        const currentProjectIndex = this.app.getCurrentProjectIndex();
        console.log(currentProjectIndex);

        const title = document.querySelector(".todo-newtitle").value;
        const desc = document.querySelector(".todo-newdesc").value;
        const due = document.querySelector(".todo-newdate").value;

        const newTask = new Task(title,desc,format(new Date(due), "MM/dd/yyyy"),"normal");

        const currentProject = this.app.getProject(currentProjectIndex);
        currentProject.addTask(newTask);

        this.saveStorage();
        this.clearTodoBoard();
        this.updateTodoBoard()

    }

    clearTodoBoard = () => {
        const todoBoard = document.querySelector(".todo-board");
        todoBoard.innerHTML = '';
    }

    createTodoForm = () => {
        const form = document.createElement("form");
        form.classList.add("todo-form");

        const newTitle = document.createElement("input");
        newTitle.setAttribute("type", "text");
        newTitle.setAttribute("placeholder", "Title");
        newTitle.setAttribute("required", "");
        newTitle.classList.add("todo-newtitle");

        const newDesc = document.createElement("input");
        newDesc.setAttribute("type", "text");
        newDesc.setAttribute("placeholder", "Add a description");
        newDesc.setAttribute("required", "");
        newDesc.classList.add("todo-newdesc");

        const newDate = document.createElement("input");
        newDate.setAttribute("type", "date");
        newDate.setAttribute("name", "date");
        newDate.setAttribute("id", "date");
        newDate.setAttribute("required", "");
        newDate.classList.add("todo-newdate");

        const btn = document.createElement("button");
        btn.classList.add("todo-add-btn");
        btn.textContent = "Add Task"

        form.appendChild(newTitle);
        form.appendChild(newDesc);
        form.appendChild(newDate);
        form.appendChild(btn);
        console.log(form);

        return form;
    }

}


