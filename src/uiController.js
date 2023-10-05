import { Task, Project, ProjectController } from "./todoParts.js";
import { Storage } from "./storage.js";

export class UI {
    constructor() {
        this.app = new ProjectController("KulamBee");
        this.storage = new Storage("todoApp");
    }

    init = () => {
        this.initStorage();
        this.updateProjectBoard();
    }

    initStorage = () => {

        if (this.storage.containsStorage()) {
            console.log("storage found!");
            //this should be converted to ProjectController object
            const todoList = Object.assign(new ProjectController("KulamBee"), this.storage.retrieveStorage());
            const todoProjects = todoList.getProjects().map((projects) => Object.assign(new Project(), projects))
            todoList.setProjects(todoProjects);

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
        console.log("here we will delete");
        const index = evt.target.closest("button").dataset.index;

        if(index == 0){
            alert("Cannot remove default project: Inbox");
            return;
        }

        this.app.deleteProject(index);
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

        console.log(li);

        return li;
    }

    setAsCurrentProject = (evt) => {
        console.log(evt.target);
        const index = evt.target.closest("li").dataset.index;

        this.app.setCurrentProject(index);
        this.saveStorage();
        console.log(this.app.getCurrentProject());

        const projectList = document.querySelectorAll('.project-li');
        projectList.forEach((listItem) => listItem.classList.remove("current-project"));
        evt.target.closest("li").classList.add("current-project");

    }

}


