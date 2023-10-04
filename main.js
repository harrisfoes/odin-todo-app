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
        this.projectList = this.projectList.filter(index => {
            return index != projectIndex;
        });
    }

    getCurrentProject = () => {
        return this.currentProject;
    }

    setCurrentProject = (index) => {
        this.currentProject = this.projectList[index].getName();
    }

    containsProject = (name) => { 
        return this.projectList.some((element) => element.getName() === name);
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

        //activate add project button
        const addProjectBtn = document.querySelector('.add-button');
        addProjectBtn.addEventListener("click", this.addNewProject);

        const projectBtns = document.querySelectorAll('.project-btn');
        console.log(projectBtns);

        projectBtns.forEach((button) => {
            button.addEventListener('click', this.setAsCurrentProject);
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
            alert("project name cannot be empty");
            return;
        }

        this.app.addProject(newProjectName);
        this.saveStorage();
        this.clearProjectBoard();
        this.updateProjectBoard();
    }

    displayProjects(projectName, projectIndex) {

        //list element
        const li = document.createElement('li');
        li.classList.add('project-li');

        const leftDiv = document.createElement('div');
        leftDiv.classList.add('left-div');

        //button element
        const btn = document.createElement('button');
        btn.classList.add('project-btn');
        btn.dataset.index = projectIndex;
        //project icon
        const card = document.createElement('i');
        card.classList.add('fa');
        card.classList.add('fa-id-card');
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

        const index = evt.target.closest("button").dataset.index;

        this.app.setCurrentProject(index);
        this.saveStorage();
        console.log(this.app);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDekJPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsV0FBVyxpQkFBaUIsaUJBQWlCLGNBQWMsYUFBYSxjQUFjLGNBQWMsWUFBWSxZQUFZO0FBQzFKOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RDtBQUM3RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2hIa0U7QUFDM0I7O0FBRWhDO0FBQ1A7QUFDQSx1QkFBdUIsNERBQWlCO0FBQ3hDLDJCQUEyQixnREFBTztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsNERBQWlCO0FBQ2hFLDRGQUE0RixrREFBTztBQUNuRzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7VUMxTEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTmtFO0FBQzNCO0FBQ0w7QUFDSzs7QUFFdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZSxnREFBRTtBQUNqQjtBQUNBO0FBQ0Esc0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8tYXBwLy4vc3JjL3N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWFwcC8uL3NyYy90b2RvUGFydHMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWFwcC8uL3NyYy91aUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL29kaW4tdG9kby1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFN0b3JhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2VJZCkge1xuICAgICAgICB0aGlzLnN0b3JhZ2VJZCA9IHN0b3JhZ2VJZDtcbiAgICB9XG5cbiAgICBjb250YWluc1N0b3JhZ2UgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnN0b3JhZ2VJZCk7IFxuICAgIH1cblxuICAgIHJldHJpZXZlU3RvcmFnZSA9ICgpID0+IHtcblxuICAgICAgICBpZighdGhpcy5jb250YWluc1N0b3JhZ2UoKSl7XG4gICAgICAgICAgICBhbGVydChcInJldHJpZXZlU3RvcmFnZSBlcnJvcjogc3RvcmFnZSBkb2Vzbid0IGV4aXN0IVwiKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zdG9yYWdlSWQpO1xuICAgICAgICBjb25zdCBsb2NhbERhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnN0b3JhZ2VJZCk7IFxuICAgICAgICBjb25zb2xlLmxvZyhsb2NhbERhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKGxvY2FsRGF0YSkpO1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbERhdGEpO1xuICAgIH1cblxuICAgIHN0b3JlT2JqZWN0ID0gKG9iamVjdCkgPT4ge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnN0b3JhZ2VJZCwgSlNPTi5zdHJpbmdpZnkob2JqZWN0KSk7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZSxkZXNjcmlwdGlvbixkdWVEYXRlLHByaW9yaXR5KXtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBcInBlbmRpbmdcIjtcbiAgICB9XG5cbiAgICB2aWV3VGFza0RldGFpbHMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUaXRsZTogJHt0aGlzLnRpdGxlfSwgRGVzY3JpcHRpb246ICR7dGhpcy5kZXNjcmlwdGlvbn0sIER1ZSBkYXRlOiAke3RoaXMuZHVlRGF0ZX0sIFByaW9yaXR5OiAke3RoaXMucHJpb3JpdHl9LCBTdGF0dXM6ICR7dGhpcy5zdGF0dXN9YCk7XG4gICAgfVxuXG4gICAgY29tcGxldGVUYXNrID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXR1cyA9IFwiY29tcGxldGVkXCI7XG4gICAgfVxuXG4gICAgc2V0VGl0bGUgPSAobmV3VGl0bGUpID0+IHtcbiAgICAgICAgdGhpcy50aXRsZSA9IG5ld1RpdGxlO1xuICAgIH1cblxuICAgIHNldERlc2NyaXB0aW9uID0gKG5ld0Rlc2NyaXB0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBuZXdEZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBzZXREdWVEYXRlID0gKG5ld0R1ZURhdGUpID0+IHtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gbmV3RHVlRGF0ZTtcbiAgICB9XG5cbiAgICBzZXRQcmlvcml0eSA9IChuZXdQcmlvcml0eSkgPT4ge1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKXtcbiAgICAgICAgdGhpcy50YXNrTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIGFkZFRhc2sgPSAodGFzaykgPT4ge1xuICAgICAgICB0aGlzLnRhc2tMaXN0LnB1c2godGFzayk7XG4gICAgfVxuXG4gICAgZGVsZXRlVGFzayA9ICh0YXNrSW5kZXgpID0+IHtcbiAgICAgICAgLy9yZW1vdmUgdGFzayBiYXNlZCBvbiBpbmRleFxuICAgICAgICB0aGlzLnRhc2tMaXN0ID0gdGhpcy50YXNrTGlzdC5maWx0ZXIoaW5kZXggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4ICE9IHRhc2tJbmRleDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmlld1Rhc2tzID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnRhc2tMaXN0LmZvckVhY2goKHRhc2spID0+IHRhc2sudmlld1Rhc2tEZXRhaWxzKCkpO1xuICAgIH1cblxuICAgIGdldFRhc2tMaXN0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy50YXNrTGlzdDtcbiAgICB9XG5cbiAgICBzZXRQcm9qZWN0TmFtZSA9IChuZXdOYW1lKSA9PiB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5ld05hbWU7XG4gICAgfVxuXG4gICAgZ2V0TmFtZSA9ICgpID0+IHsgcmV0dXJuIHRoaXMubmFtZTsgfVxuICAgICBcbn1cblxuZXhwb3J0IGNsYXNzIFByb2plY3RDb250cm9sbGVye1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpe1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnByb2plY3RMaXN0ID0gW107XG4gICAgICAgIHRoaXMucHJvamVjdExpc3QucHVzaChuZXcgUHJvamVjdChcIkluYm94XCIpKTtcbiAgICAgICAgdGhpcy5jdXJyZW50UHJvamVjdCA9IHRoaXMucHJvamVjdExpc3RbMF0uZ2V0TmFtZSgpOyAvL3RyYWNrcyB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHByb2plY3RcbiAgICB9XG5cbiAgICBhZGRQcm9qZWN0ID0gKHByb2plY3ROYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1Byb2ogPSBuZXcgUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgICAgIHRoaXMucHJvamVjdExpc3QucHVzaChuZXdQcm9qKTtcbiAgICB9XG5cbiAgICBkZWxldGVQcm9qZWN0ID0gKHByb2plY3RJbmRleCkgPT4ge1xuICAgICAgICAvL3JlbW92ZSB0YXNrIGJhc2VkIG9uIGluZGV4XG4gICAgICAgIHRoaXMucHJvamVjdExpc3QgPSB0aGlzLnByb2plY3RMaXN0LmZpbHRlcihpbmRleCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXggIT0gcHJvamVjdEluZGV4O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50UHJvamVjdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFByb2plY3Q7XG4gICAgfVxuXG4gICAgc2V0Q3VycmVudFByb2plY3QgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgdGhpcy5jdXJyZW50UHJvamVjdCA9IHRoaXMucHJvamVjdExpc3RbaW5kZXhdLmdldE5hbWUoKTtcbiAgICB9XG5cbiAgICBjb250YWluc1Byb2plY3QgPSAobmFtZSkgPT4geyBcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvamVjdExpc3Quc29tZSgoZWxlbWVudCkgPT4gZWxlbWVudC5nZXROYW1lKCkgPT09IG5hbWUpO1xuICAgIH1cblxuICAgIGdldFByb2plY3RzID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0TGlzdDtcbiAgICB9XG5cbiAgICBzZXRQcm9qZWN0cyA9IChuZXdQcm9qZWN0TGlzdCkgPT4ge1xuICAgICAgICB0aGlzLnByb2plY3RMaXN0ID0gbmV3UHJvamVjdExpc3Q7XG4gICAgfVxuXG4gICAgZ2V0TmFtZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBUYXNrLCBQcm9qZWN0LCBQcm9qZWN0Q29udHJvbGxlciB9IGZyb20gXCIuL3RvZG9QYXJ0cy5qc1wiO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2UuanNcIjtcblxuZXhwb3J0IGNsYXNzIFVJIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hcHAgPSBuZXcgUHJvamVjdENvbnRyb2xsZXIoXCJLdWxhbUJlZVwiKTtcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gbmV3IFN0b3JhZ2UoXCJ0b2RvQXBwXCIpO1xuICAgIH1cblxuICAgIGluaXQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdFN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy51cGRhdGVQcm9qZWN0Qm9hcmQoKTtcbiAgICB9XG5cbiAgICBpbml0U3RvcmFnZSA9ICgpID0+IHtcblxuICAgICAgICBpZiAodGhpcy5zdG9yYWdlLmNvbnRhaW5zU3RvcmFnZSgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInN0b3JhZ2UgZm91bmQhXCIpO1xuICAgICAgICAgICAgLy90aGlzIHNob3VsZCBiZSBjb252ZXJ0ZWQgdG8gUHJvamVjdENvbnRyb2xsZXIgb2JqZWN0XG4gICAgICAgICAgICBjb25zdCB0b2RvTGlzdCA9IE9iamVjdC5hc3NpZ24obmV3IFByb2plY3RDb250cm9sbGVyKFwiS3VsYW1CZWVcIiksIHRoaXMuc3RvcmFnZS5yZXRyaWV2ZVN0b3JhZ2UoKSk7XG4gICAgICAgICAgICBjb25zdCB0b2RvUHJvamVjdHMgPSB0b2RvTGlzdC5nZXRQcm9qZWN0cygpLm1hcCgocHJvamVjdHMpID0+IE9iamVjdC5hc3NpZ24obmV3IFByb2plY3QoKSwgcHJvamVjdHMpKVxuICAgICAgICAgICAgdG9kb0xpc3Quc2V0UHJvamVjdHModG9kb1Byb2plY3RzKTtcblxuICAgICAgICAgICAgdGhpcy5hcHAgPSB0b2RvTGlzdDtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYXBwKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zYXZlU3RvcmFnZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZVN0b3JhZ2UgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5zdG9yZU9iamVjdCh0aGlzLmFwcCk7XG4gICAgfVxuXG4gICAgY2xlYXJQcm9qZWN0Qm9hcmQgPSAoKSA9PiB7IFxuICAgICAgICBjb25zdCBwcm9qZWN0Qm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1ib2FyZCcpO1xuICAgICAgICBwcm9qZWN0Qm9hcmQuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuXG4gICAgdXBkYXRlUHJvamVjdEJvYXJkID0gKCkgPT4ge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtYm9hcmQnKTtcblxuICAgICAgICBwcm9qZWN0Qm9hcmQuYXBwZW5kQ2hpbGQodGhpcy5kaXNwbGF5UHJvamVjdExpc3QoKSk7XG4gICAgICAgIHByb2plY3RCb2FyZC5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZVByb2plY3RGb3JtKCkpO1xuXG4gICAgICAgIC8vYWN0aXZhdGUgYWRkIHByb2plY3QgYnV0dG9uXG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLWJ1dHRvbicpO1xuICAgICAgICBhZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmFkZE5ld1Byb2plY3QpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QtYnRuJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RCdG5zKTtcblxuICAgICAgICBwcm9qZWN0QnRucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2V0QXNDdXJyZW50UHJvamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRpc3BsYXlQcm9qZWN0TGlzdCA9ICgpID0+IHtcbiAgICAgICAgLy90aXRsZVxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJQcm9qZWN0c1wiO1xuXG4gICAgICAgIC8vaW5ib3ggZGl2XG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgcHJvamVjdExpc3QuY2xhc3NMaXN0LmFkZCgncHJvamVjdHMnKTtcblxuICAgICAgICAvL2dlbmVyYXRlIHByb2plY3QgYnV0dG9uc1xuICAgICAgICBjb25zdCBwcm9qZWN0QnRucyA9IHRoaXMuYXBwLmdldFByb2plY3RzKCkuZm9yRWFjaCggKHByb2plY3QsIGluZGV4KSA9PiAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQodGhpcy5kaXNwbGF5UHJvamVjdHMocHJvamVjdC5nZXROYW1lKCksIGluZGV4KSkpO1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0QnRucyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RMaXN0KTtcbiAgICAgICAgLy9wcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0QnRucyk7XG5cbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdExpc3QpO1xuICAgICAgICByZXR1cm4gcHJvamVjdExpc3Q7XG4gICAgfVxuXG4gICAgY3JlYXRlUHJvamVjdEZvcm0gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICAgICAgZm9ybS5zZXRBdHRyaWJ1dGUoXCJhY3Rpb25cIiwgXCIjXCIpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgcHJvamVjdElucHV0LnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiQWRkIFByb2plY3RcIik7XG4gICAgICAgIHByb2plY3RJbnB1dC5zZXRBdHRyaWJ1dGUoXCJyZXF1aXJlZFwiLCBcIlwiKTtcbiAgICAgICAgcHJvamVjdElucHV0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWl0ZW1cIik7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdEFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIHByb2plY3RBZGRCdG4uY2xhc3NMaXN0LmFkZChcImFkZC1idXR0b25cIik7XG5cbiAgICAgICAgY29uc3QgcGx1c0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIHBsdXNJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhJyk7XG4gICAgICAgIHBsdXNJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXBsdXMnKTtcbiAgICAgICAgcGx1c0ljb24uc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgdHJ1ZSk7XG5cbiAgICAgICAgY29uc3QgYnRuU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgYnRuU3Bhbi50ZXh0Q29udGVudCA9IFwiQWRkXCI7XG5cbiAgICAgICAgcHJvamVjdEFkZEJ0bi5hcHBlbmRDaGlsZChwbHVzSWNvbik7XG4gICAgICAgIHByb2plY3RBZGRCdG4uYXBwZW5kQ2hpbGQoYnRuU3Bhbik7XG5cbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChwcm9qZWN0SW5wdXQpO1xuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKHByb2plY3RBZGRCdG4pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZvcm07XG4gICAgfVxuXG4gICAgYWRkTmV3UHJvamVjdCA9IChldnQpID0+IHtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgbmV3UHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1pdGVtJykudmFsdWU7XG5cbiAgICAgICAgaWYobmV3UHJvamVjdE5hbWUgPT0gJycpe1xuICAgICAgICAgICAgYWxlcnQoXCJwcm9qZWN0IG5hbWUgY2Fubm90IGJlIGVtcHR5XCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hcHAuYWRkUHJvamVjdChuZXdQcm9qZWN0TmFtZSk7XG4gICAgICAgIHRoaXMuc2F2ZVN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5jbGVhclByb2plY3RCb2FyZCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVByb2plY3RCb2FyZCgpO1xuICAgIH1cblxuICAgIGRpc3BsYXlQcm9qZWN0cyhwcm9qZWN0TmFtZSwgcHJvamVjdEluZGV4KSB7XG5cbiAgICAgICAgLy9saXN0IGVsZW1lbnRcbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWxpJyk7XG5cbiAgICAgICAgY29uc3QgbGVmdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZWZ0RGl2LmNsYXNzTGlzdC5hZGQoJ2xlZnQtZGl2Jyk7XG5cbiAgICAgICAgLy9idXR0b24gZWxlbWVudFxuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtYnRuJyk7XG4gICAgICAgIGJ0bi5kYXRhc2V0LmluZGV4ID0gcHJvamVjdEluZGV4O1xuICAgICAgICAvL3Byb2plY3QgaWNvblxuICAgICAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2ZhJyk7XG4gICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnZmEtaWQtY2FyZCcpO1xuICAgICAgICBjYXJkLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIHRydWUpO1xuICAgICAgICAvL3Byb2plY3QgdGV4dFxuICAgICAgICBjb25zdCBjYXJkU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgY2FyZFNwYW4uY2xhc3NMaXN0LmFkZCgncHJvamVjdC1uYW1lJyk7XG4gICAgICAgIGNhcmRTcGFuLnRleHRDb250ZW50ID0gcHJvamVjdE5hbWU7XG5cbiAgICAgICAgLy9jb25zdCByaWdodERpdiBcbiAgICAgICAgY29uc3QgcmlnaHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcmlnaHREaXYuY2xhc3NMaXN0LmFkZCgncmlnaHQtZGl2Jyk7ICAgICAgICBcblxuICAgICAgICAvL3hidXR0b24gZWxlbWVudFxuICAgICAgICBjb25zdCB4YnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHhidG4uY2xhc3NMaXN0LmFkZCgnZGVsZXRlLXAtYnRuJyk7XG4gICAgICAgIHhidG4uZGF0YXNldC5pbmRleCA9IHByb2plY3RJbmRleDtcbiAgICAgICAgLy9wcm9qZWN0IGljb25cbiAgICAgICAgY29uc3QgY2xvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIGNsb3NlLmNsYXNzTGlzdC5hZGQoJ2ZhcycpO1xuICAgICAgICBjbG9zZS5jbGFzc0xpc3QuYWRkKCdmYS10aW1lcycpO1xuICAgICAgICBjbG9zZS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcblxuICAgICAgICB4YnRuLmFwcGVuZENoaWxkKGNsb3NlKTtcblxuICAgICAgICBidG4uYXBwZW5kQ2hpbGQoY2FyZCk7XG4gICAgICAgIGJ0bi5hcHBlbmRDaGlsZChjYXJkU3Bhbik7XG5cbiAgICAgICAgbGVmdERpdi5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgICByaWdodERpdi5hcHBlbmRDaGlsZCh4YnRuKTtcblxuICAgICAgICBsaS5hcHBlbmRDaGlsZChsZWZ0RGl2KTtcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQocmlnaHREaXYpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGxpKTtcblxuICAgICAgICByZXR1cm4gbGk7XG4gICAgfVxuXG4gICAgc2V0QXNDdXJyZW50UHJvamVjdCA9IChldnQpID0+IHtcblxuICAgICAgICBjb25zdCBpbmRleCA9IGV2dC50YXJnZXQuY2xvc2VzdChcImJ1dHRvblwiKS5kYXRhc2V0LmluZGV4O1xuXG4gICAgICAgIHRoaXMuYXBwLnNldEN1cnJlbnRQcm9qZWN0KGluZGV4KTtcbiAgICAgICAgdGhpcy5zYXZlU3RvcmFnZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmFwcCk7XG4gICAgfVxuXG59XG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBUYXNrLCBQcm9qZWN0LCBQcm9qZWN0Q29udHJvbGxlciB9IGZyb20gXCIuL3RvZG9QYXJ0cy5qc1wiO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2UuanNcIjtcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gXCJkYXRlLWZuc1wiO1xuaW1wb3J0IHsgVUkgfSBmcm9tIFwiLi91aUNvbnRyb2xsZXIuanNcIjtcblxuLypcbmNvbnN0IHRhc2sxID0gbmV3IFRhc2soXCJFYXQgZm9vZFwiLCBcImVhdCB0aGUgZm9vdCB0b2RheVwiLCBcIjA5LzIyLzIwMjNcIiwgXCJVcmdlbnRcIik7XG50YXNrMS52aWV3VGFza0RldGFpbHMoKTtcblxudGFzazEuY29tcGxldGVUYXNrKCk7XG50YXNrMS52aWV3VGFza0RldGFpbHMoKTtcblxudGFzazEuc2V0RGVzY3JpcHRpb24oXCJJbSBhIGNoYW5nZWQgcGVyc29uXCIpO1xudGFzazEudmlld1Rhc2tEZXRhaWxzKCk7XG5cbnRhc2sxLnNldFRpdGxlKFwiQ29uc3VtZSBGb29kXCIpO1xudGFzazEudmlld1Rhc2tEZXRhaWxzKCk7XG5cbnRhc2sxLnNldER1ZURhdGUoXCIwOS8yNS8yMDIzXCIpO1xudGFzazEudmlld1Rhc2tEZXRhaWxzKCk7XG5cbnRhc2sxLnNldFByaW9yaXR5KFwiTm9ybWFsXCIpO1xudGFzazEudmlld1Rhc2tEZXRhaWxzKCk7XG5cblxuLy93b3Jrc1xubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJteUNhdFwiLCBcIlRvbVwiKTtcbi8vY29tZXMgb3V0IGFzIFtvYmplY3Qgb2JqZWN0XVxubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJmaXJzdFRhc2tcIiwgdGFzazEpO1xuXG4vL29iamVjdFxuY29uc3QgbXlUYXNrID0gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJmaXJzdFRhc2tcIiwgSlNPTi5zdHJpbmdpZnkodGFzazEpKTtcbmNvbnNvbGUubG9nKG15VGFzayk7XG5cbmNvbnN0IHRoZVRhc2sgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImZpcnN0VGFza1wiKVxuY29uc29sZS5sb2codGhlVGFzayk7XG5cbmNvbnN0IGNvbnZlcnRlZFRhc2sgPSBKU09OLnBhcnNlKHRoZVRhc2spO1xuXG5jb25zb2xlLmxvZyhjb252ZXJ0ZWRUYXNrKTtcbmNvbnNvbGUubG9nKGNvbnZlcnRlZFRhc2sudGl0bGUpO1xuXG4vL2Z1bmN0aW9uIHRvIGNvbnZlcnQgYSB0YXNrIHRha2VuIGZyb20gbG9jYWxTdG9yYWdlIChzbyB0aGF0IGl0IGhhcyB0aGUgZnVuY3Rpb25zIHdvcmtpbmcpXG5jb25zdCBjb252ZXJ0VGFza0Zyb21TdG9yYWdlID0gKHRhc2spID0+IHtcbiAgICBjb25zdCBjb252ZXJ0ZWRUYXNrID0gbmV3IFRhc2soXG4gICAgICAgIHRhc2sudGl0bGUsXG4gICAgICAgIHRhc2suZGVzY3JpcHRpb24sXG4gICAgICAgIHRhc2suZHVlRGF0ZSxcbiAgICAgICAgdGFzay5wcmlvcml0eSxcbiAgICAgICAgdGFzay5zdGF0dXNcbiAgICApXG4gICAgcmV0dXJuIGNvbnZlcnRlZFRhc2s7XG59XG5cbmNvbnN0IGNvbnZlcnRlZExhc3QgPSBjb252ZXJ0VGFza0Zyb21TdG9yYWdlKGNvbnZlcnRlZFRhc2spO1xuXG5jb252ZXJ0ZWRMYXN0LnZpZXdUYXNrRGV0YWlscygpO1xuXG4vL3Rlc3RpbmcgbG9jYWxTdG9yYWdlZm9yIGFycmF5c1xuY29uc3QgdGFza18xID0gbmV3IFRhc2soXCIxXCIsIFwiZmlyc3RcIiwgXCIwOS8yMC8yMDIzXCIsIFwibm9ybWFsXCIpO1xuY29uc3QgdGFza18yID0gbmV3IFRhc2soXCIyXCIsIFwic2Vjb25kXCIsIFwiMDkvMjAvMjAyM1wiLCBcIm5vcm1hbFwiKTtcbmNvbnN0IHRhc2tfMyA9IG5ldyBUYXNrKFwiM1wiLCBcInRoaXJkXCIsIFwiMDkvMjAvMjAyM1wiLCBcIm5vcm1hbFwiKTtcbmNvbnN0IHRhc2tfNCA9IG5ldyBUYXNrKFwiNFwiLCBcImZvdXJ0aFwiLCBcIjA5LzIwLzIwMjNcIiwgXCJub3JtYWxcIik7XG5jb25zdCB0YXNrXzUgPSBuZXcgVGFzayhcIjVcIiwgXCJmaWZ0aFwiLCBcIjA5LzIwLzIwMjNcIiwgXCJub3JtYWxcIik7XG5cbmNvbnN0IHRhc2tMaWJyYXJ5ID0gW107XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfMSk7XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfMik7XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfMyk7XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfNCk7XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfNSk7XG5jb25zb2xlLmxvZyh0YXNrTGlicmFyeSk7XG5cbmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGFza0xpYnJhcnlcIiwgSlNPTi5zdHJpbmdpZnkodGFza0xpYnJhcnkpKTtcblxuY29uc3QgdG9kb0RhaWx5ID0gbmV3IFByb2plY3QoXCJUb2RvIERhaWxpZXNcIik7XG50b2RvRGFpbHkuYWRkVGFzayh0YXNrXzEpO1xudG9kb0RhaWx5LmFkZFRhc2sodGFza18yKTtcbnRvZG9EYWlseS5hZGRUYXNrKHRhc2tfMyk7XG50b2RvRGFpbHkuYWRkVGFzayh0YXNrXzQpO1xudG9kb0RhaWx5LmFkZFRhc2sodGFza181KTtcbnRvZG9EYWlseS5hZGRUYXNrKHRhc2sxKTtcbnRvZG9EYWlseS5kZWxldGVUYXNrKHRhc2sxKTtcbnRvZG9EYWlseS52aWV3VGFza3MoKTtcblxubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2RvRGFpbGllc1wiLCBKU09OLnN0cmluZ2lmeSh0b2RvRGFpbHkpKTtcblxuY29uc3QgcHJvamVjdDEgPSBuZXcgUHJvamVjdChcIlByb2plY3QgT25lXCIpO1xucHJvamVjdDEuYWRkVGFzayhuZXcgVGFzayhcIjFcIiwgXCJkbyBkaXNoZXNcIiwgXCI5LzMzLzIwMjJcIiwgXCJ1cmdlbnRcIikpXG5wcm9qZWN0MS5hZGRUYXNrKG5ldyBUYXNrKFwiMlwiLCBcInJpbnNlIGRpc2hlc1wiLCBcIjkvMzMvMjAyMlwiLCBcInVyZ2VudFwiKSlcblxuY29uc3QgYXBwQ29udHJvbGxlciA9IG5ldyBQcm9qZWN0Q29udHJvbGxlcihcImhhcnJpc1RvZG9cIik7XG5hcHBDb250cm9sbGVyLmFkZFByb2plY3QodG9kb0RhaWx5KTtcbmFwcENvbnRyb2xsZXIuYWRkUHJvamVjdChwcm9qZWN0MSk7XG5jb25zb2xlLmxvZyhhcHBDb250cm9sbGVyKTtcblxubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJoYXJyaXNUb2RvXCIsIEpTT04uc3RyaW5naWZ5KGFwcENvbnRyb2xsZXIpKTtcblxuLyogZGF0YS1mbnMgKi9cbi8vIGZvcm1hdHRpbiBhIGRhdGUgaW4gbW0tZC15XG4vLyBjb2xsZWN0aW5nIGEgZGF0ZSB1c2luZyBhIHdpZGdldFxuXG4vLyB0b0RhdGUsIGlzVG9kYXksIGlzVGhpc1dlZWssIHN1YkRheXNcbi8vIHRlc3RpbmcgZGF0ZSBuZXcgZGF0ZVxuXG4vKlxuY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG5jb25zb2xlLmxvZyhkYXRlKTtcbmNvbnNvbGUubG9nKGZvcm1hdChkYXRlLCAneXl5eS1NTS1kZCcpKTtcbiovXG5cbi8qXG5cbmNvbnN0IHN0b3JhZ2UgPSBuZXcgU3RvcmFnZShcInRvZG9BcHBcIik7XG5cbmlmKHN0b3JhZ2UuY29udGFpbnNTdG9yYWdlKFwidG9kb0FwcFwiKSl7XG4gICAgY29uc29sZS5sb2coXCJjb250YWlucyBzdG9yYWdlIVwiKTtcbn1cblxuLy9pbml0aWFsaXplIGlmIG5vIGxvY2FsU3RvcmFnZSB5ZXRcbi8vc3RhcnQgb2YgdG9kbyBhcHBcbmNvbnN0IHRvZG9BcHAgPSBuZXcgUHJvamVjdENvbnRyb2xsZXIoXCJ0b2RvQXBwXCIpO1xuLy9kZWZhdWx0IHByb2plY3RcbnRvZG9BcHAuYWRkUHJvamVjdChcIkluYm94XCIpO1xuc3RvcmFnZS5zdG9yZU9iamVjdCh0b2RvQXBwKTtcbi8vXG5cbmNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLWJ1dHRvbicpO1xuY29uc3QgbmV3UHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LXByb2plY3QtbmFtZScpO1xuXG5jb25zb2xlLmxvZyhhZGRQcm9qZWN0KTtcblxuYWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZEJ1dHRvbik7XG5cbmZ1bmN0aW9uIGFkZEJ1dHRvbihldnQpe1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnNvbGUubG9nKFwiY29uc29sZW1lXCIpO1xuICAgIGFsZXJ0KG5ld1Byb2plY3ROYW1lLnZhbHVlKTtcblxuICAgIHRvZG9BcHAuYWRkUHJvamVjdChuZXdQcm9qZWN0TmFtZS52YWx1ZSk7XG4gICAgc3RvcmFnZS5zdG9yZU9iamVjdCh0b2RvQXBwKTtcbn1cbiovXG5cbmNvbnN0IHVpID0gbmV3IFVJO1xuLy91aS5pbml0U3RvcmFnZSgpO1xuLy91aS5kaXNwbGF5UHJvamVjdEJvYXJkKCk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgdWkuaW5pdCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=