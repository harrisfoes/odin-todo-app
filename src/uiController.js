import { Task, Project, ProjectController } from "./todoParts.js";
import { Storage } from "./storage.js";

export class UI {
    constructor() {
        this.app = new ProjectController;
        this.storage = new Storage("todoApp");
    }


    init = () => {
        this.initStorage();
        this.initProjectBoard();
    }

    initStorage = () => {

        if (this.storage.containsStorage()) {
            console.log("storage found!");
            //this should be converted to ProjectController object
            const todoList = Object.assign(new ProjectController, this.storage.retrieveStorage());

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

    initProjectBoard = () => {
        console.log("projectbord");
        const projectBoard = document.querySelector('.project-board');

        projectBoard.appendChild(this.displayProjectList());
        projectBoard.appendChild(this.createProjectForm());

        const addProjectBtn = document.querySelector('.add-button');
        addProjectBtn.addEventListener("click", this.addNewProject);

    }

    displayProjectList = () => {
        //title
        const title = document.createElement('h3');
        title.textContent = "Projects";

        //inbox div
        const inboxBtn = document.createElement('button');
        inboxBtn.classList.add('inbox');

        const card = document.createElement('i');
        card.classList.add('fa');
        card.classList.add('fa-id-card');
        card.setAttribute("aria-hidden", true);

        const cardSpan = document.createElement('span');
        cardSpan.textContent = "Inbox";

        inboxBtn.appendChild(card);
        inboxBtn.appendChild(cardSpan);

        return inboxBtn;
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

        this.app.addProject(newProjectName);
        this.saveStorage();
    }

}


