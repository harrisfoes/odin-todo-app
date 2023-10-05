/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Storage: () => (/* binding */ Storage)
/* harmony export */ });
class Storage {
    constructor(storageId) {
        this.storageId = storageId;
    }

    containsStorage = () => {
        return localStorage.getItem(this.storageId); 
    }

    retrieveStorage = () => {

        if(!this.containsStorage()){
            alert("retrieveStorage error: storage doesn't exist!")
        }

        console.log(this.storageId);
        const localData = localStorage.getItem(this.storageId); 
        console.log(localData);
        console.log(JSON.parse(localData));
        return JSON.parse(localData);
    }

    storeObject = (object) => {
        localStorage.setItem(this.storageId, JSON.stringify(object));
    }
}

/***/ }),

/***/ "./src/todoParts.js":
/*!**************************!*\
  !*** ./src/todoParts.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Project: () => (/* binding */ Project),
/* harmony export */   ProjectController: () => (/* binding */ ProjectController),
/* harmony export */   Task: () => (/* binding */ Task)
/* harmony export */ });
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

class Project {
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

    setProjectName = (newName) => {
        this.name = newName;
    }

    getName = () => { return this.name; }
     
}

class ProjectController{
    constructor(name){
        this.name = name;
        this.projectList = [];
        this.projectList.push(new Project("Inbox"));
        this.currentProject = this.projectList[0].getName(); //tracks the currently selected project
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

    getCurrentProject = () => {
        return this.currentProject;
    }

    setCurrentProject = (index) => {
        this.currentProject = this.projectList[index].getName();
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

/***/ }),

/***/ "./src/uiController.js":
/*!*****************************!*\
  !*** ./src/uiController.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UI: () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _todoParts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todoParts.js */ "./src/todoParts.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");



class UI {
    constructor() {
        this.app = new _todoParts_js__WEBPACK_IMPORTED_MODULE_0__.ProjectController("KulamBee");
        this.storage = new _storage_js__WEBPACK_IMPORTED_MODULE_1__.Storage("todoApp");
    }

    init = () => {
        this.initStorage();
        this.updateProjectBoard();
    }

    initStorage = () => {

        if (this.storage.containsStorage()) {
            console.log("storage found!");
            //this should be converted to ProjectController object
            const todoList = Object.assign(new _todoParts_js__WEBPACK_IMPORTED_MODULE_0__.ProjectController("KulamBee"), this.storage.retrieveStorage());
            const todoProjects = todoList.getProjects().map((projects) => Object.assign(new _todoParts_js__WEBPACK_IMPORTED_MODULE_0__.Project(), projects))
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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _todoParts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todoParts.js */ "./src/todoParts.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");
/* harmony import */ var _uiController_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiController.js */ "./src/uiController.js");





/*
const task1 = new Task("Eat food", "eat the foot today", "09/22/2023", "Urgent");
task1.viewTaskDetails();

task1.completeTask();
task1.viewTaskDetails();

task1.setDescription("Im a changed person");
task1.viewTaskDetails();

task1.setTitle("Consume Food");
task1.viewTaskDetails();

task1.setDueDate("09/25/2023");
task1.viewTaskDetails();

task1.setPriority("Normal");
task1.viewTaskDetails();


//works
localStorage.setItem("myCat", "Tom");
//comes out as [object object]
localStorage.setItem("firstTask", task1);

//object
const myTask = localStorage.setItem("firstTask", JSON.stringify(task1));
console.log(myTask);

const theTask = localStorage.getItem("firstTask")
console.log(theTask);

const convertedTask = JSON.parse(theTask);

console.log(convertedTask);
console.log(convertedTask.title);

//function to convert a task taken from localStorage (so that it has the functions working)
const convertTaskFromStorage = (task) => {
    const convertedTask = new Task(
        task.title,
        task.description,
        task.dueDate,
        task.priority,
        task.status
    )
    return convertedTask;
}

const convertedLast = convertTaskFromStorage(convertedTask);

convertedLast.viewTaskDetails();

//testing localStoragefor arrays
const task_1 = new Task("1", "first", "09/20/2023", "normal");
const task_2 = new Task("2", "second", "09/20/2023", "normal");
const task_3 = new Task("3", "third", "09/20/2023", "normal");
const task_4 = new Task("4", "fourth", "09/20/2023", "normal");
const task_5 = new Task("5", "fifth", "09/20/2023", "normal");

const taskLibrary = [];
taskLibrary.push(task_1);
taskLibrary.push(task_2);
taskLibrary.push(task_3);
taskLibrary.push(task_4);
taskLibrary.push(task_5);
console.log(taskLibrary);

localStorage.setItem("taskLibrary", JSON.stringify(taskLibrary));

const todoDaily = new Project("Todo Dailies");
todoDaily.addTask(task_1);
todoDaily.addTask(task_2);
todoDaily.addTask(task_3);
todoDaily.addTask(task_4);
todoDaily.addTask(task_5);
todoDaily.addTask(task1);
todoDaily.deleteTask(task1);
todoDaily.viewTasks();

localStorage.setItem("todoDailies", JSON.stringify(todoDaily));

const project1 = new Project("Project One");
project1.addTask(new Task("1", "do dishes", "9/33/2022", "urgent"))
project1.addTask(new Task("2", "rinse dishes", "9/33/2022", "urgent"))

const appController = new ProjectController("harrisTodo");
appController.addProject(todoDaily);
appController.addProject(project1);
console.log(appController);

localStorage.setItem("harrisTodo", JSON.stringify(appController));

/* data-fns */
// formattin a date in mm-d-y
// collecting a date using a widget

// toDate, isToday, isThisWeek, subDays
// testing date new date

/*
const date = new Date();
console.log(date);
console.log(format(date, 'yyyy-MM-dd'));
*/

/*

const storage = new Storage("todoApp");

if(storage.containsStorage("todoApp")){
    console.log("contains storage!");
}

//initialize if no localStorage yet
//start of todo app
const todoApp = new ProjectController("todoApp");
//default project
todoApp.addProject("Inbox");
storage.storeObject(todoApp);
//

const addProject = document.querySelector('.add-button');
const newProjectName = document.querySelector('.new-project-name');

console.log(addProject);

addProject.addEventListener('click', addButton);

function addButton(evt){
    evt.preventDefault();
    console.log("consoleme");
    alert(newProjectName.value);

    todoApp.addProject(newProjectName.value);
    storage.storeObject(todoApp);
}
*/

const ui = new _uiController_js__WEBPACK_IMPORTED_MODULE_2__.UI;
//ui.initStorage();
//ui.displayProjectBoard();
document.addEventListener('DOMContentLoaded', ui.init)
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDekJPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsV0FBVyxpQkFBaUIsaUJBQWlCLGNBQWMsYUFBYSxjQUFjLGNBQWMsWUFBWSxZQUFZO0FBQzFKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RDtBQUM3RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3JIa0U7QUFDM0I7O0FBRWhDO0FBQ1A7QUFDQSx1QkFBdUIsNERBQWlCO0FBQ3hDLDJCQUEyQixnREFBTztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsNERBQWlCO0FBQ2hFLDRGQUE0RixrREFBTztBQUNuRzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7OztVQ3hOQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOa0U7QUFDM0I7QUFDTDtBQUNLOztBQUV2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLGdEQUFFO0FBQ2pCO0FBQ0E7QUFDQSxzRCIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby1hcHAvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tYXBwLy4vc3JjL3RvZG9QYXJ0cy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tYXBwLy4vc3JjL3VpQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG9kby1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU3RvcmFnZSB7XG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZUlkKSB7XG4gICAgICAgIHRoaXMuc3RvcmFnZUlkID0gc3RvcmFnZUlkO1xuICAgIH1cblxuICAgIGNvbnRhaW5zU3RvcmFnZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuc3RvcmFnZUlkKTsgXG4gICAgfVxuXG4gICAgcmV0cmlldmVTdG9yYWdlID0gKCkgPT4ge1xuXG4gICAgICAgIGlmKCF0aGlzLmNvbnRhaW5zU3RvcmFnZSgpKXtcbiAgICAgICAgICAgIGFsZXJ0KFwicmV0cmlldmVTdG9yYWdlIGVycm9yOiBzdG9yYWdlIGRvZXNuJ3QgZXhpc3QhXCIpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0b3JhZ2VJZCk7XG4gICAgICAgIGNvbnN0IGxvY2FsRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuc3RvcmFnZUlkKTsgXG4gICAgICAgIGNvbnNvbGUubG9nKGxvY2FsRGF0YSk7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UobG9jYWxEYXRhKSk7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsRGF0YSk7XG4gICAgfVxuXG4gICAgc3RvcmVPYmplY3QgPSAob2JqZWN0KSA9PiB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuc3RvcmFnZUlkLCBKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIFRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlLGRlc2NyaXB0aW9uLGR1ZURhdGUscHJpb3JpdHkpe1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB0aGlzLnN0YXR1cyA9IFwicGVuZGluZ1wiO1xuICAgIH1cblxuICAgIHZpZXdUYXNrRGV0YWlscyA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coYFRpdGxlOiAke3RoaXMudGl0bGV9LCBEZXNjcmlwdGlvbjogJHt0aGlzLmRlc2NyaXB0aW9ufSwgRHVlIGRhdGU6ICR7dGhpcy5kdWVEYXRlfSwgUHJpb3JpdHk6ICR7dGhpcy5wcmlvcml0eX0sIFN0YXR1czogJHt0aGlzLnN0YXR1c31gKTtcbiAgICB9XG5cbiAgICBjb21wbGV0ZVRhc2sgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gXCJjb21wbGV0ZWRcIjtcbiAgICB9XG5cbiAgICBzZXRUaXRsZSA9IChuZXdUaXRsZSkgPT4ge1xuICAgICAgICB0aGlzLnRpdGxlID0gbmV3VGl0bGU7XG4gICAgfVxuXG4gICAgc2V0RGVzY3JpcHRpb24gPSAobmV3RGVzY3JpcHRpb24pID0+IHtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuICAgIH1cblxuICAgIHNldER1ZURhdGUgPSAobmV3RHVlRGF0ZSkgPT4ge1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBuZXdEdWVEYXRlO1xuICAgIH1cblxuICAgIHNldFByaW9yaXR5ID0gKG5ld1ByaW9yaXR5KSA9PiB7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBuZXdQcmlvcml0eTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpe1xuICAgICAgICB0aGlzLnRhc2tMaXN0ID0gW107XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgYWRkVGFzayA9ICh0YXNrKSA9PiB7XG4gICAgICAgIHRoaXMudGFza0xpc3QucHVzaCh0YXNrKTtcbiAgICB9XG5cbiAgICBkZWxldGVUYXNrID0gKHRhc2tJbmRleCkgPT4ge1xuICAgICAgICAvL3JlbW92ZSB0YXNrIGJhc2VkIG9uIGluZGV4XG4gICAgICAgIHRoaXMudGFza0xpc3QgPSB0aGlzLnRhc2tMaXN0LmZpbHRlcihpbmRleCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXggIT0gdGFza0luZGV4O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2aWV3VGFza3MgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMudGFza0xpc3QuZm9yRWFjaCgodGFzaykgPT4gdGFzay52aWV3VGFza0RldGFpbHMoKSk7XG4gICAgfVxuXG4gICAgZ2V0VGFza0xpc3QgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tMaXN0O1xuICAgIH1cblxuICAgIHNldFByb2plY3ROYW1lID0gKG5ld05hbWUpID0+IHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmV3TmFtZTtcbiAgICB9XG5cbiAgICBnZXROYW1lID0gKCkgPT4geyByZXR1cm4gdGhpcy5uYW1lOyB9XG4gICAgIFxufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdENvbnRyb2xsZXJ7XG4gICAgY29uc3RydWN0b3IobmFtZSl7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMucHJvamVjdExpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5wcm9qZWN0TGlzdC5wdXNoKG5ldyBQcm9qZWN0KFwiSW5ib3hcIikpO1xuICAgICAgICB0aGlzLmN1cnJlbnRQcm9qZWN0ID0gdGhpcy5wcm9qZWN0TGlzdFswXS5nZXROYW1lKCk7IC8vdHJhY2tzIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcHJvamVjdFxuICAgIH1cblxuICAgIGFkZFByb2plY3QgPSAocHJvamVjdE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbmV3UHJvaiA9IG5ldyBQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0TGlzdC5wdXNoKG5ld1Byb2opO1xuICAgIH1cblxuICAgIGRlbGV0ZVByb2plY3QgPSAocHJvamVjdEluZGV4KSA9PiB7XG4gICAgICAgIC8vcmVtb3ZlIHRhc2sgYmFzZWQgb24gaW5kZXhcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSB0aGlzLnByb2plY3RMaXN0W3Byb2plY3RJbmRleF0uZ2V0TmFtZSgpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wcm9qZWN0TGlzdCA9IHRoaXMucHJvamVjdExpc3QuZmlsdGVyKG5hbWUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5hbWUuZ2V0TmFtZSgpICE9IHByb2plY3ROYW1lO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0TmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJvamVjdExpc3QpO1xuICAgIH1cblxuICAgIGdldEN1cnJlbnRQcm9qZWN0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50UHJvamVjdDtcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50UHJvamVjdCA9IChpbmRleCkgPT4ge1xuICAgICAgICB0aGlzLmN1cnJlbnRQcm9qZWN0ID0gdGhpcy5wcm9qZWN0TGlzdFtpbmRleF0uZ2V0TmFtZSgpO1xuICAgIH1cblxuICAgIGNvbnRhaW5zUHJvamVjdCA9IChuYW1lKSA9PiB7IFxuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0TGlzdC5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50LmdldE5hbWUoKS50b0xvd2VyQ2FzZSgpID09PSBuYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIGdldFByb2plY3RzID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0TGlzdDtcbiAgICB9XG5cbiAgICBzZXRQcm9qZWN0cyA9IChuZXdQcm9qZWN0TGlzdCkgPT4ge1xuICAgICAgICB0aGlzLnByb2plY3RMaXN0ID0gbmV3UHJvamVjdExpc3Q7XG4gICAgfVxuXG4gICAgZ2V0TmFtZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBUYXNrLCBQcm9qZWN0LCBQcm9qZWN0Q29udHJvbGxlciB9IGZyb20gXCIuL3RvZG9QYXJ0cy5qc1wiO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2UuanNcIjtcblxuZXhwb3J0IGNsYXNzIFVJIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hcHAgPSBuZXcgUHJvamVjdENvbnRyb2xsZXIoXCJLdWxhbUJlZVwiKTtcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gbmV3IFN0b3JhZ2UoXCJ0b2RvQXBwXCIpO1xuICAgIH1cblxuICAgIGluaXQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdFN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy51cGRhdGVQcm9qZWN0Qm9hcmQoKTtcbiAgICB9XG5cbiAgICBpbml0U3RvcmFnZSA9ICgpID0+IHtcblxuICAgICAgICBpZiAodGhpcy5zdG9yYWdlLmNvbnRhaW5zU3RvcmFnZSgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN0b3JhZ2UgZm91bmQhXCIpO1xuICAgICAgICAgICAgLy90aGlzIHNob3VsZCBiZSBjb252ZXJ0ZWQgdG8gUHJvamVjdENvbnRyb2xsZXIgb2JqZWN0XG4gICAgICAgICAgICBjb25zdCB0b2RvTGlzdCA9IE9iamVjdC5hc3NpZ24obmV3IFByb2plY3RDb250cm9sbGVyKFwiS3VsYW1CZWVcIiksIHRoaXMuc3RvcmFnZS5yZXRyaWV2ZVN0b3JhZ2UoKSk7XG4gICAgICAgICAgICBjb25zdCB0b2RvUHJvamVjdHMgPSB0b2RvTGlzdC5nZXRQcm9qZWN0cygpLm1hcCgocHJvamVjdHMpID0+IE9iamVjdC5hc3NpZ24obmV3IFByb2plY3QoKSwgcHJvamVjdHMpKVxuICAgICAgICAgICAgdG9kb0xpc3Quc2V0UHJvamVjdHModG9kb1Byb2plY3RzKTtcblxuICAgICAgICAgICAgdGhpcy5hcHAgPSB0b2RvTGlzdDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYXBwKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zYXZlU3RvcmFnZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZVN0b3JhZ2UgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5zdG9yZU9iamVjdCh0aGlzLmFwcCk7XG4gICAgfVxuXG4gICAgY2xlYXJQcm9qZWN0Qm9hcmQgPSAoKSA9PiB7IFxuICAgICAgICBjb25zdCBwcm9qZWN0Qm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1ib2FyZCcpO1xuICAgICAgICBwcm9qZWN0Qm9hcmQuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuXG4gICAgdXBkYXRlUHJvamVjdEJvYXJkID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtYm9hcmQnKTtcblxuICAgICAgICBwcm9qZWN0Qm9hcmQuYXBwZW5kQ2hpbGQodGhpcy5kaXNwbGF5UHJvamVjdExpc3QoKSk7XG4gICAgICAgIHByb2plY3RCb2FyZC5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZVByb2plY3RGb3JtKCkpO1xuXG4gICAgICAgIC8vYWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgYWN0aXZlIGJ1dHRvbnNcbiAgICAgICAgY29uc3QgYWRkUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtYnV0dG9uJyk7XG4gICAgICAgIGFkZFByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuYWRkTmV3UHJvamVjdCk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdC1saScpO1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0QnRucyk7XG5cbiAgICAgICAgcHJvamVjdEJ0bnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNldEFzQ3VycmVudFByb2plY3QpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBkZWxldGVQcm9qZWN0QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWxldGUtcC1idG4nKTtcbiAgICAgICAgZGVsZXRlUHJvamVjdEJ0bnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRlbGV0ZVByb2plY3QpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNwbGF5UHJvamVjdExpc3QgPSAoKSA9PiB7XG4gICAgICAgIC8vdGl0bGVcbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiUHJvamVjdHNcIjtcblxuICAgICAgICAvL2luYm94IGRpdlxuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIHByb2plY3RMaXN0LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RzJyk7XG5cbiAgICAgICAgLy9nZW5lcmF0ZSBwcm9qZWN0IGJ1dHRvbnNcbiAgICAgICAgY29uc3QgcHJvamVjdEJ0bnMgPSB0aGlzLmFwcC5nZXRQcm9qZWN0cygpLmZvckVhY2goIChwcm9qZWN0LCBpbmRleCkgPT4gIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHRoaXMuZGlzcGxheVByb2plY3RzKHByb2plY3QuZ2V0TmFtZSgpLCBpbmRleCkpKTtcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdEJ0bnMpO1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0TGlzdCk7XG4gICAgICAgIC8vcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEJ0bnMpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RMaXN0KTtcbiAgICAgICAgcmV0dXJuIHByb2plY3RMaXN0O1xuICAgIH1cblxuICAgIGNyZWF0ZVByb2plY3RGb3JtID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKFwiYWN0aW9uXCIsIFwiI1wiKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIHByb2plY3RJbnB1dC5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIkFkZCBQcm9qZWN0XCIpO1xuICAgICAgICBwcm9qZWN0SW5wdXQuc2V0QXR0cmlidXRlKFwicmVxdWlyZWRcIiwgXCJcIik7XG4gICAgICAgIHByb2plY3RJbnB1dC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1pdGVtXCIpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RBZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBwcm9qZWN0QWRkQnRuLmNsYXNzTGlzdC5hZGQoXCJhZGQtYnV0dG9uXCIpO1xuXG4gICAgICAgIGNvbnN0IHBsdXNJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBwbHVzSWNvbi5jbGFzc0xpc3QuYWRkKCdmYScpO1xuICAgICAgICBwbHVzSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS1wbHVzJyk7XG4gICAgICAgIHBsdXNJY29uLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIHRydWUpO1xuXG4gICAgICAgIGNvbnN0IGJ0blNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGJ0blNwYW4udGV4dENvbnRlbnQgPSBcIkFkZFwiO1xuXG4gICAgICAgIHByb2plY3RBZGRCdG4uYXBwZW5kQ2hpbGQocGx1c0ljb24pO1xuICAgICAgICBwcm9qZWN0QWRkQnRuLmFwcGVuZENoaWxkKGJ0blNwYW4pO1xuXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQocHJvamVjdElucHV0KTtcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChwcm9qZWN0QWRkQnRuKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBmb3JtO1xuICAgIH1cblxuICAgIGFkZE5ld1Byb2plY3QgPSAoZXZ0KSA9PiB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtaXRlbScpLnZhbHVlO1xuXG4gICAgICAgIGlmKG5ld1Byb2plY3ROYW1lID09ICcnKXtcbiAgICAgICAgICAgIGFsZXJ0KFwiUHJvamVjdCBuYW1lIGNhbm5vdCBiZSBlbXB0eVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfWVsc2UgaWYgKHRoaXMuYXBwLmNvbnRhaW5zUHJvamVjdChuZXdQcm9qZWN0TmFtZSkpe1xuICAgICAgICAgICAgYWxlcnQoXCJQcm9qZWN0IG5hbWUgYWxyZWFkeSBleGlzdHNcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFwcC5hZGRQcm9qZWN0KG5ld1Byb2plY3ROYW1lKTtcbiAgICAgICAgdGhpcy5zYXZlU3RvcmFnZSgpO1xuICAgICAgICB0aGlzLmNsZWFyUHJvamVjdEJvYXJkKCk7XG4gICAgICAgIHRoaXMudXBkYXRlUHJvamVjdEJvYXJkKCk7XG4gICAgfVxuXG4gICAgZGVsZXRlUHJvamVjdCA9IChldnQpID0+IHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGVyZSB3ZSB3aWxsIGRlbGV0ZVwiKTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBldnQudGFyZ2V0LmNsb3Nlc3QoXCJidXR0b25cIikuZGF0YXNldC5pbmRleDtcblxuICAgICAgICBpZihpbmRleCA9PSAwKXtcbiAgICAgICAgICAgIGFsZXJ0KFwiQ2Fubm90IHJlbW92ZSBkZWZhdWx0IHByb2plY3Q6IEluYm94XCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHAuZGVsZXRlUHJvamVjdChpbmRleCk7XG4gICAgICAgIHRoaXMuc2F2ZVN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5jbGVhclByb2plY3RCb2FyZCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVByb2plY3RCb2FyZCgpO1xuICAgIH0gXG5cbiAgICBkaXNwbGF5UHJvamVjdHMocHJvamVjdE5hbWUsIHByb2plY3RJbmRleCkge1xuXG4gICAgICAgIC8vbGlzdCBlbGVtZW50XG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1saScpO1xuICAgICAgICBsaS5kYXRhc2V0LmluZGV4ID0gcHJvamVjdEluZGV4O1xuXG4gICAgICAgIGNvbnN0IGxlZnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbGVmdERpdi5jbGFzc0xpc3QuYWRkKCdsZWZ0LWRpdicpO1xuXG4gICAgICAgIC8vYnV0dG9uIGVsZW1lbnRcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWJ0bicpO1xuICAgICAgICBidG4uZGF0YXNldC5pbmRleCA9IHByb2plY3RJbmRleDtcbiAgICAgICAgLy9wcm9qZWN0IGljb25cbiAgICAgICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdmYS1zb2xpZCcpO1xuICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2ZhLXRhYmxlLWxpc3QnKTtcbiAgICAgICAgY2FyZC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcbiAgICAgICAgLy9wcm9qZWN0IHRleHRcbiAgICAgICAgY29uc3QgY2FyZFNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIGNhcmRTcGFuLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtbmFtZScpO1xuICAgICAgICBjYXJkU3Bhbi50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lO1xuXG4gICAgICAgIC8vY29uc3QgcmlnaHREaXYgXG4gICAgICAgIGNvbnN0IHJpZ2h0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHJpZ2h0RGl2LmNsYXNzTGlzdC5hZGQoJ3JpZ2h0LWRpdicpOyAgICAgICAgXG5cbiAgICAgICAgLy94YnV0dG9uIGVsZW1lbnRcbiAgICAgICAgY29uc3QgeGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB4YnRuLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1wLWJ0bicpO1xuICAgICAgICB4YnRuLmRhdGFzZXQuaW5kZXggPSBwcm9qZWN0SW5kZXg7XG4gICAgICAgIC8vcHJvamVjdCBpY29uXG4gICAgICAgIGNvbnN0IGNsb3NlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBjbG9zZS5jbGFzc0xpc3QuYWRkKCdmYXMnKTtcbiAgICAgICAgY2xvc2UuY2xhc3NMaXN0LmFkZCgnZmEtdGltZXMnKTtcbiAgICAgICAgY2xvc2Uuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgdHJ1ZSk7XG5cbiAgICAgICAgeGJ0bi5hcHBlbmRDaGlsZChjbG9zZSk7XG5cbiAgICAgICAgYnRuLmFwcGVuZENoaWxkKGNhcmQpO1xuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoY2FyZFNwYW4pO1xuXG4gICAgICAgIGxlZnREaXYuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICAgICAgcmlnaHREaXYuYXBwZW5kQ2hpbGQoeGJ0bik7XG5cbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQobGVmdERpdik7XG4gICAgICAgIGxpLmFwcGVuZENoaWxkKHJpZ2h0RGl2KTtcblxuICAgICAgICBjb25zb2xlLmxvZyhsaSk7XG5cbiAgICAgICAgcmV0dXJuIGxpO1xuICAgIH1cblxuICAgIHNldEFzQ3VycmVudFByb2plY3QgPSAoZXZ0KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2dC50YXJnZXQpO1xuICAgICAgICBjb25zdCBpbmRleCA9IGV2dC50YXJnZXQuY2xvc2VzdChcImxpXCIpLmRhdGFzZXQuaW5kZXg7XG5cbiAgICAgICAgdGhpcy5hcHAuc2V0Q3VycmVudFByb2plY3QoaW5kZXgpO1xuICAgICAgICB0aGlzLnNhdmVTdG9yYWdlKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYXBwLmdldEN1cnJlbnRQcm9qZWN0KCkpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QtbGknKTtcbiAgICAgICAgcHJvamVjdExpc3QuZm9yRWFjaCgobGlzdEl0ZW0pID0+IGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJjdXJyZW50LXByb2plY3RcIikpO1xuICAgICAgICBldnQudGFyZ2V0LmNsb3Nlc3QoXCJsaVwiKS5jbGFzc0xpc3QuYWRkKFwiY3VycmVudC1wcm9qZWN0XCIpO1xuXG4gICAgfVxuXG59XG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBUYXNrLCBQcm9qZWN0LCBQcm9qZWN0Q29udHJvbGxlciB9IGZyb20gXCIuL3RvZG9QYXJ0cy5qc1wiO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2UuanNcIjtcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gXCJkYXRlLWZuc1wiO1xuaW1wb3J0IHsgVUkgfSBmcm9tIFwiLi91aUNvbnRyb2xsZXIuanNcIjtcblxuLypcbmNvbnN0IHRhc2sxID0gbmV3IFRhc2soXCJFYXQgZm9vZFwiLCBcImVhdCB0aGUgZm9vdCB0b2RheVwiLCBcIjA5LzIyLzIwMjNcIiwgXCJVcmdlbnRcIik7XG50YXNrMS52aWV3VGFza0RldGFpbHMoKTtcblxudGFzazEuY29tcGxldGVUYXNrKCk7XG50YXNrMS52aWV3VGFza0RldGFpbHMoKTtcblxudGFzazEuc2V0RGVzY3JpcHRpb24oXCJJbSBhIGNoYW5nZWQgcGVyc29uXCIpO1xudGFzazEudmlld1Rhc2tEZXRhaWxzKCk7XG5cbnRhc2sxLnNldFRpdGxlKFwiQ29uc3VtZSBGb29kXCIpO1xudGFzazEudmlld1Rhc2tEZXRhaWxzKCk7XG5cbnRhc2sxLnNldER1ZURhdGUoXCIwOS8yNS8yMDIzXCIpO1xudGFzazEudmlld1Rhc2tEZXRhaWxzKCk7XG5cbnRhc2sxLnNldFByaW9yaXR5KFwiTm9ybWFsXCIpO1xudGFzazEudmlld1Rhc2tEZXRhaWxzKCk7XG5cblxuLy93b3Jrc1xubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJteUNhdFwiLCBcIlRvbVwiKTtcbi8vY29tZXMgb3V0IGFzIFtvYmplY3Qgb2JqZWN0XVxubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJmaXJzdFRhc2tcIiwgdGFzazEpO1xuXG4vL29iamVjdFxuY29uc3QgbXlUYXNrID0gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJmaXJzdFRhc2tcIiwgSlNPTi5zdHJpbmdpZnkodGFzazEpKTtcbmNvbnNvbGUubG9nKG15VGFzayk7XG5cbmNvbnN0IHRoZVRhc2sgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImZpcnN0VGFza1wiKVxuY29uc29sZS5sb2codGhlVGFzayk7XG5cbmNvbnN0IGNvbnZlcnRlZFRhc2sgPSBKU09OLnBhcnNlKHRoZVRhc2spO1xuXG5jb25zb2xlLmxvZyhjb252ZXJ0ZWRUYXNrKTtcbmNvbnNvbGUubG9nKGNvbnZlcnRlZFRhc2sudGl0bGUpO1xuXG4vL2Z1bmN0aW9uIHRvIGNvbnZlcnQgYSB0YXNrIHRha2VuIGZyb20gbG9jYWxTdG9yYWdlIChzbyB0aGF0IGl0IGhhcyB0aGUgZnVuY3Rpb25zIHdvcmtpbmcpXG5jb25zdCBjb252ZXJ0VGFza0Zyb21TdG9yYWdlID0gKHRhc2spID0+IHtcbiAgICBjb25zdCBjb252ZXJ0ZWRUYXNrID0gbmV3IFRhc2soXG4gICAgICAgIHRhc2sudGl0bGUsXG4gICAgICAgIHRhc2suZGVzY3JpcHRpb24sXG4gICAgICAgIHRhc2suZHVlRGF0ZSxcbiAgICAgICAgdGFzay5wcmlvcml0eSxcbiAgICAgICAgdGFzay5zdGF0dXNcbiAgICApXG4gICAgcmV0dXJuIGNvbnZlcnRlZFRhc2s7XG59XG5cbmNvbnN0IGNvbnZlcnRlZExhc3QgPSBjb252ZXJ0VGFza0Zyb21TdG9yYWdlKGNvbnZlcnRlZFRhc2spO1xuXG5jb252ZXJ0ZWRMYXN0LnZpZXdUYXNrRGV0YWlscygpO1xuXG4vL3Rlc3RpbmcgbG9jYWxTdG9yYWdlZm9yIGFycmF5c1xuY29uc3QgdGFza18xID0gbmV3IFRhc2soXCIxXCIsIFwiZmlyc3RcIiwgXCIwOS8yMC8yMDIzXCIsIFwibm9ybWFsXCIpO1xuY29uc3QgdGFza18yID0gbmV3IFRhc2soXCIyXCIsIFwic2Vjb25kXCIsIFwiMDkvMjAvMjAyM1wiLCBcIm5vcm1hbFwiKTtcbmNvbnN0IHRhc2tfMyA9IG5ldyBUYXNrKFwiM1wiLCBcInRoaXJkXCIsIFwiMDkvMjAvMjAyM1wiLCBcIm5vcm1hbFwiKTtcbmNvbnN0IHRhc2tfNCA9IG5ldyBUYXNrKFwiNFwiLCBcImZvdXJ0aFwiLCBcIjA5LzIwLzIwMjNcIiwgXCJub3JtYWxcIik7XG5jb25zdCB0YXNrXzUgPSBuZXcgVGFzayhcIjVcIiwgXCJmaWZ0aFwiLCBcIjA5LzIwLzIwMjNcIiwgXCJub3JtYWxcIik7XG5cbmNvbnN0IHRhc2tMaWJyYXJ5ID0gW107XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfMSk7XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfMik7XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfMyk7XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfNCk7XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfNSk7XG5jb25zb2xlLmxvZyh0YXNrTGlicmFyeSk7XG5cbmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGFza0xpYnJhcnlcIiwgSlNPTi5zdHJpbmdpZnkodGFza0xpYnJhcnkpKTtcblxuY29uc3QgdG9kb0RhaWx5ID0gbmV3IFByb2plY3QoXCJUb2RvIERhaWxpZXNcIik7XG50b2RvRGFpbHkuYWRkVGFzayh0YXNrXzEpO1xudG9kb0RhaWx5LmFkZFRhc2sodGFza18yKTtcbnRvZG9EYWlseS5hZGRUYXNrKHRhc2tfMyk7XG50b2RvRGFpbHkuYWRkVGFzayh0YXNrXzQpO1xudG9kb0RhaWx5LmFkZFRhc2sodGFza181KTtcbnRvZG9EYWlseS5hZGRUYXNrKHRhc2sxKTtcbnRvZG9EYWlseS5kZWxldGVUYXNrKHRhc2sxKTtcbnRvZG9EYWlseS52aWV3VGFza3MoKTtcblxubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2RvRGFpbGllc1wiLCBKU09OLnN0cmluZ2lmeSh0b2RvRGFpbHkpKTtcblxuY29uc3QgcHJvamVjdDEgPSBuZXcgUHJvamVjdChcIlByb2plY3QgT25lXCIpO1xucHJvamVjdDEuYWRkVGFzayhuZXcgVGFzayhcIjFcIiwgXCJkbyBkaXNoZXNcIiwgXCI5LzMzLzIwMjJcIiwgXCJ1cmdlbnRcIikpXG5wcm9qZWN0MS5hZGRUYXNrKG5ldyBUYXNrKFwiMlwiLCBcInJpbnNlIGRpc2hlc1wiLCBcIjkvMzMvMjAyMlwiLCBcInVyZ2VudFwiKSlcblxuY29uc3QgYXBwQ29udHJvbGxlciA9IG5ldyBQcm9qZWN0Q29udHJvbGxlcihcImhhcnJpc1RvZG9cIik7XG5hcHBDb250cm9sbGVyLmFkZFByb2plY3QodG9kb0RhaWx5KTtcbmFwcENvbnRyb2xsZXIuYWRkUHJvamVjdChwcm9qZWN0MSk7XG5jb25zb2xlLmxvZyhhcHBDb250cm9sbGVyKTtcblxubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJoYXJyaXNUb2RvXCIsIEpTT04uc3RyaW5naWZ5KGFwcENvbnRyb2xsZXIpKTtcblxuLyogZGF0YS1mbnMgKi9cbi8vIGZvcm1hdHRpbiBhIGRhdGUgaW4gbW0tZC15XG4vLyBjb2xsZWN0aW5nIGEgZGF0ZSB1c2luZyBhIHdpZGdldFxuXG4vLyB0b0RhdGUsIGlzVG9kYXksIGlzVGhpc1dlZWssIHN1YkRheXNcbi8vIHRlc3RpbmcgZGF0ZSBuZXcgZGF0ZVxuXG4vKlxuY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG5jb25zb2xlLmxvZyhkYXRlKTtcbmNvbnNvbGUubG9nKGZvcm1hdChkYXRlLCAneXl5eS1NTS1kZCcpKTtcbiovXG5cbi8qXG5cbmNvbnN0IHN0b3JhZ2UgPSBuZXcgU3RvcmFnZShcInRvZG9BcHBcIik7XG5cbmlmKHN0b3JhZ2UuY29udGFpbnNTdG9yYWdlKFwidG9kb0FwcFwiKSl7XG4gICAgY29uc29sZS5sb2coXCJjb250YWlucyBzdG9yYWdlIVwiKTtcbn1cblxuLy9pbml0aWFsaXplIGlmIG5vIGxvY2FsU3RvcmFnZSB5ZXRcbi8vc3RhcnQgb2YgdG9kbyBhcHBcbmNvbnN0IHRvZG9BcHAgPSBuZXcgUHJvamVjdENvbnRyb2xsZXIoXCJ0b2RvQXBwXCIpO1xuLy9kZWZhdWx0IHByb2plY3RcbnRvZG9BcHAuYWRkUHJvamVjdChcIkluYm94XCIpO1xuc3RvcmFnZS5zdG9yZU9iamVjdCh0b2RvQXBwKTtcbi8vXG5cbmNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLWJ1dHRvbicpO1xuY29uc3QgbmV3UHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LXByb2plY3QtbmFtZScpO1xuXG5jb25zb2xlLmxvZyhhZGRQcm9qZWN0KTtcblxuYWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZEJ1dHRvbik7XG5cbmZ1bmN0aW9uIGFkZEJ1dHRvbihldnQpe1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnNvbGUubG9nKFwiY29uc29sZW1lXCIpO1xuICAgIGFsZXJ0KG5ld1Byb2plY3ROYW1lLnZhbHVlKTtcblxuICAgIHRvZG9BcHAuYWRkUHJvamVjdChuZXdQcm9qZWN0TmFtZS52YWx1ZSk7XG4gICAgc3RvcmFnZS5zdG9yZU9iamVjdCh0b2RvQXBwKTtcbn1cbiovXG5cbmNvbnN0IHVpID0gbmV3IFVJO1xuLy91aS5pbml0U3RvcmFnZSgpO1xuLy91aS5kaXNwbGF5UHJvamVjdEJvYXJkKCk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgdWkuaW5pdCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=