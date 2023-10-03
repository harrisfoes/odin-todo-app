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
        this.currentProject = "Inbox"; //tracks the currently selected project
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

    setCurrentProject = (project) => {
        this.currentProject = project;
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
        this.app = new _todoParts_js__WEBPACK_IMPORTED_MODULE_0__.ProjectController;
        this.storage = new _storage_js__WEBPACK_IMPORTED_MODULE_1__.Storage("todoApp");
    }


    init = () => {
        this.initStorage();
        this.initProjectBoard();
    }

    initStorage = () => {

        if (this.storage.containsStorage()) {
            console.log("storage found!");
            //this should be converted to ProjectController object
            const todoList = Object.assign(new _todoParts_js__WEBPACK_IMPORTED_MODULE_0__.ProjectController, this.storage.retrieveStorage());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWUsZ0RBQUU7QUFDakI7QUFDQTtBQUNBLHNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWFwcC8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL29kaW4tdG9kby1hcHAvLi9zcmMvdG9kb1BhcnRzLmpzIiwid2VicGFjazovL29kaW4tdG9kby1hcHAvLi9zcmMvdWlDb250cm9sbGVyLmpzIiwid2VicGFjazovL29kaW4tdG9kby1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL29kaW4tdG9kby1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBTdG9yYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlSWQpIHtcbiAgICAgICAgdGhpcy5zdG9yYWdlSWQgPSBzdG9yYWdlSWQ7XG4gICAgfVxuXG4gICAgY29udGFpbnNTdG9yYWdlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5zdG9yYWdlSWQpOyBcbiAgICB9XG5cbiAgICByZXRyaWV2ZVN0b3JhZ2UgPSAoKSA9PiB7XG5cbiAgICAgICAgaWYoIXRoaXMuY29udGFpbnNTdG9yYWdlKCkpe1xuICAgICAgICAgICAgYWxlcnQoXCJyZXRyaWV2ZVN0b3JhZ2UgZXJyb3I6IHN0b3JhZ2UgZG9lc24ndCBleGlzdCFcIilcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RvcmFnZUlkKTtcbiAgICAgICAgY29uc3QgbG9jYWxEYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5zdG9yYWdlSWQpOyBcbiAgICAgICAgY29uc29sZS5sb2cobG9jYWxEYXRhKTtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5wYXJzZShsb2NhbERhdGEpKTtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxEYXRhKTtcbiAgICB9XG5cbiAgICBzdG9yZU9iamVjdCA9IChvYmplY3QpID0+IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5zdG9yYWdlSWQsIEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsZGVzY3JpcHRpb24sZHVlRGF0ZSxwcmlvcml0eSl7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gXCJwZW5kaW5nXCI7XG4gICAgfVxuXG4gICAgdmlld1Rhc2tEZXRhaWxzID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhgVGl0bGU6ICR7dGhpcy50aXRsZX0sIERlc2NyaXB0aW9uOiAke3RoaXMuZGVzY3JpcHRpb259LCBEdWUgZGF0ZTogJHt0aGlzLmR1ZURhdGV9LCBQcmlvcml0eTogJHt0aGlzLnByaW9yaXR5fSwgU3RhdHVzOiAke3RoaXMuc3RhdHVzfWApO1xuICAgIH1cblxuICAgIGNvbXBsZXRlVGFzayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBcImNvbXBsZXRlZFwiO1xuICAgIH1cblxuICAgIHNldFRpdGxlID0gKG5ld1RpdGxlKSA9PiB7XG4gICAgICAgIHRoaXMudGl0bGUgPSBuZXdUaXRsZTtcbiAgICB9XG5cbiAgICBzZXREZXNjcmlwdGlvbiA9IChuZXdEZXNjcmlwdGlvbikgPT4ge1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgc2V0RHVlRGF0ZSA9IChuZXdEdWVEYXRlKSA9PiB7XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IG5ld0R1ZURhdGU7XG4gICAgfVxuXG4gICAgc2V0UHJpb3JpdHkgPSAobmV3UHJpb3JpdHkpID0+IHtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IobmFtZSl7XG4gICAgICAgIHRoaXMudGFza0xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBhZGRUYXNrID0gKHRhc2spID0+IHtcbiAgICAgICAgdGhpcy50YXNrTGlzdC5wdXNoKHRhc2spO1xuICAgIH1cblxuICAgIGRlbGV0ZVRhc2sgPSAodGFza0luZGV4KSA9PiB7XG4gICAgICAgIC8vcmVtb3ZlIHRhc2sgYmFzZWQgb24gaW5kZXhcbiAgICAgICAgdGhpcy50YXNrTGlzdCA9IHRoaXMudGFza0xpc3QuZmlsdGVyKGluZGV4ID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpbmRleCAhPSB0YXNrSW5kZXg7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZpZXdUYXNrcyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy50YXNrTGlzdC5mb3JFYWNoKCh0YXNrKSA9PiB0YXNrLnZpZXdUYXNrRGV0YWlscygpKTtcbiAgICB9XG5cbiAgICBnZXRUYXNrTGlzdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza0xpc3Q7XG4gICAgfVxuXG4gICAgc2V0UHJvamVjdE5hbWUgPSAobmV3TmFtZSkgPT4ge1xuICAgICAgICB0aGlzLm5hbWUgPSBuZXdOYW1lO1xuICAgIH1cblxuICAgIGdldE5hbWUgPSAoKSA9PiB7IHJldHVybiB0aGlzLm5hbWU7IH1cbiAgICAgXG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0Q29udHJvbGxlcntcbiAgICBjb25zdHJ1Y3RvcihuYW1lKXtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5wcm9qZWN0TGlzdCA9IFtdO1xuICAgICAgICB0aGlzLnByb2plY3RMaXN0LnB1c2gobmV3IFByb2plY3QoXCJJbmJveFwiKSk7XG4gICAgICAgIHRoaXMuY3VycmVudFByb2plY3QgPSBcIkluYm94XCI7IC8vdHJhY2tzIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgcHJvamVjdFxuICAgIH1cblxuICAgIGFkZFByb2plY3QgPSAocHJvamVjdE5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgbmV3UHJvaiA9IG5ldyBQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICAgICAgdGhpcy5wcm9qZWN0TGlzdC5wdXNoKG5ld1Byb2opO1xuICAgIH1cblxuICAgIGRlbGV0ZVByb2plY3QgPSAocHJvamVjdEluZGV4KSA9PiB7XG4gICAgICAgIC8vcmVtb3ZlIHRhc2sgYmFzZWQgb24gaW5kZXhcbiAgICAgICAgdGhpcy5wcm9qZWN0TGlzdCA9IHRoaXMucHJvamVjdExpc3QuZmlsdGVyKGluZGV4ID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpbmRleCAhPSBwcm9qZWN0SW5kZXg7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEN1cnJlbnRQcm9qZWN0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50UHJvamVjdDtcbiAgICB9XG5cbiAgICBzZXRDdXJyZW50UHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIHRoaXMuY3VycmVudFByb2plY3QgPSBwcm9qZWN0O1xuICAgIH1cblxuICAgIGNvbnRhaW5zUHJvamVjdCA9IChuYW1lKSA9PiB7IFxuICAgICAgICByZXR1cm4gdGhpcy5wcm9qZWN0TGlzdC5zb21lKChlbGVtZW50KSA9PiBlbGVtZW50LmdldE5hbWUoKSA9PT0gbmFtZSk7XG4gICAgfVxuXG4gICAgZ2V0UHJvamVjdHMgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb2plY3RMaXN0O1xuICAgIH1cblxuICAgIHNldFByb2plY3RzID0gKG5ld1Byb2plY3RMaXN0KSA9PiB7XG4gICAgICAgIHRoaXMucHJvamVjdExpc3QgPSBuZXdQcm9qZWN0TGlzdDtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyBUYXNrLCBQcm9qZWN0LCBQcm9qZWN0Q29udHJvbGxlciB9IGZyb20gXCIuL3RvZG9QYXJ0cy5qc1wiO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2UuanNcIjtcblxuZXhwb3J0IGNsYXNzIFVJIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hcHAgPSBuZXcgUHJvamVjdENvbnRyb2xsZXI7XG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IG5ldyBTdG9yYWdlKFwidG9kb0FwcFwiKTtcbiAgICB9XG5cblxuICAgIGluaXQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdFN0b3JhZ2UoKTtcbiAgICAgICAgdGhpcy5pbml0UHJvamVjdEJvYXJkKCk7XG4gICAgfVxuXG4gICAgaW5pdFN0b3JhZ2UgPSAoKSA9PiB7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RvcmFnZS5jb250YWluc1N0b3JhZ2UoKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzdG9yYWdlIGZvdW5kIVwiKTtcbiAgICAgICAgICAgIC8vdGhpcyBzaG91bGQgYmUgY29udmVydGVkIHRvIFByb2plY3RDb250cm9sbGVyIG9iamVjdFxuICAgICAgICAgICAgY29uc3QgdG9kb0xpc3QgPSBPYmplY3QuYXNzaWduKG5ldyBQcm9qZWN0Q29udHJvbGxlciwgdGhpcy5zdG9yYWdlLnJldHJpZXZlU3RvcmFnZSgpKTtcblxuICAgICAgICAgICAgY29uc3QgdG9kb1Byb2plY3RzID0gdG9kb0xpc3QuZ2V0UHJvamVjdHMoKS5tYXAoKHByb2plY3RzKSA9PiBPYmplY3QuYXNzaWduKG5ldyBQcm9qZWN0KCksIHByb2plY3RzKSlcbiAgICAgICAgICAgIHRvZG9MaXN0LnNldFByb2plY3RzKHRvZG9Qcm9qZWN0cyk7XG5cbiAgICAgICAgICAgIHRoaXMuYXBwID0gdG9kb0xpc3Q7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmFwcCk7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0b3JhZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmVTdG9yYWdlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLnN0b3JhZ2Uuc3RvcmVPYmplY3QodGhpcy5hcHApO1xuICAgIH1cblxuICAgIGluaXRQcm9qZWN0Qm9hcmQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicHJvamVjdGJvcmRcIik7XG4gICAgICAgIGNvbnN0IHByb2plY3RCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWJvYXJkJyk7XG5cbiAgICAgICAgcHJvamVjdEJvYXJkLmFwcGVuZENoaWxkKHRoaXMuZGlzcGxheVByb2plY3RMaXN0KCkpO1xuICAgICAgICBwcm9qZWN0Qm9hcmQuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVQcm9qZWN0Rm9ybSgpKTtcblxuICAgICAgICBjb25zdCBhZGRQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1idXR0b24nKTtcbiAgICAgICAgYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5hZGROZXdQcm9qZWN0KTtcblxuICAgIH1cblxuICAgIGRpc3BsYXlQcm9qZWN0TGlzdCA9ICgpID0+IHtcbiAgICAgICAgLy90aXRsZVxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJQcm9qZWN0c1wiO1xuXG4gICAgICAgIC8vaW5ib3ggZGl2XG4gICAgICAgIGNvbnN0IGluYm94QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGluYm94QnRuLmNsYXNzTGlzdC5hZGQoJ2luYm94Jyk7XG5cbiAgICAgICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcbiAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdmYScpO1xuICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2ZhLWlkLWNhcmQnKTtcbiAgICAgICAgY2FyZC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCB0cnVlKTtcblxuICAgICAgICBjb25zdCBjYXJkU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgY2FyZFNwYW4udGV4dENvbnRlbnQgPSBcIkluYm94XCI7XG5cbiAgICAgICAgaW5ib3hCdG4uYXBwZW5kQ2hpbGQoY2FyZCk7XG4gICAgICAgIGluYm94QnRuLmFwcGVuZENoaWxkKGNhcmRTcGFuKTtcblxuICAgICAgICByZXR1cm4gaW5ib3hCdG47XG4gICAgfVxuXG4gICAgY3JlYXRlUHJvamVjdEZvcm0gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcbiAgICAgICAgZm9ybS5zZXRBdHRyaWJ1dGUoXCJhY3Rpb25cIiwgXCIjXCIpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgcHJvamVjdElucHV0LnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiQWRkIFByb2plY3RcIik7XG4gICAgICAgIHByb2plY3RJbnB1dC5zZXRBdHRyaWJ1dGUoXCJyZXF1aXJlZFwiLCBcIlwiKTtcbiAgICAgICAgcHJvamVjdElucHV0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWl0ZW1cIik7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdEFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIHByb2plY3RBZGRCdG4uY2xhc3NMaXN0LmFkZChcImFkZC1idXR0b25cIik7XG5cbiAgICAgICAgY29uc3QgcGx1c0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XG4gICAgICAgIHBsdXNJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhJyk7XG4gICAgICAgIHBsdXNJY29uLmNsYXNzTGlzdC5hZGQoJ2ZhLXBsdXMnKTtcbiAgICAgICAgcGx1c0ljb24uc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgdHJ1ZSk7XG5cbiAgICAgICAgY29uc3QgYnRuU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgYnRuU3Bhbi50ZXh0Q29udGVudCA9IFwiQWRkXCI7XG5cbiAgICAgICAgcHJvamVjdEFkZEJ0bi5hcHBlbmRDaGlsZChwbHVzSWNvbik7XG4gICAgICAgIHByb2plY3RBZGRCdG4uYXBwZW5kQ2hpbGQoYnRuU3Bhbik7XG5cblxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKHByb2plY3RJbnB1dCk7XG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQocHJvamVjdEFkZEJ0bik7XG4gICAgICAgIFxuXG4gICAgICAgIHJldHVybiBmb3JtO1xuICAgIH1cblxuICAgIGFkZE5ld1Byb2plY3QgPSAoZXZ0KSA9PiB7XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtaXRlbScpLnZhbHVlO1xuXG4gICAgICAgIHRoaXMuYXBwLmFkZFByb2plY3QobmV3UHJvamVjdE5hbWUpO1xuICAgICAgICB0aGlzLnNhdmVTdG9yYWdlKCk7XG4gICAgfVxuXG59XG5cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBUYXNrLCBQcm9qZWN0LCBQcm9qZWN0Q29udHJvbGxlciB9IGZyb20gXCIuL3RvZG9QYXJ0cy5qc1wiO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gXCIuL3N0b3JhZ2UuanNcIjtcbmltcG9ydCB7IGZvcm1hdCB9IGZyb20gXCJkYXRlLWZuc1wiO1xuaW1wb3J0IHsgVUkgfSBmcm9tIFwiLi91aUNvbnRyb2xsZXIuanNcIjtcblxuLypcbmNvbnN0IHRhc2sxID0gbmV3IFRhc2soXCJFYXQgZm9vZFwiLCBcImVhdCB0aGUgZm9vdCB0b2RheVwiLCBcIjA5LzIyLzIwMjNcIiwgXCJVcmdlbnRcIik7XG50YXNrMS52aWV3VGFza0RldGFpbHMoKTtcblxudGFzazEuY29tcGxldGVUYXNrKCk7XG50YXNrMS52aWV3VGFza0RldGFpbHMoKTtcblxudGFzazEuc2V0RGVzY3JpcHRpb24oXCJJbSBhIGNoYW5nZWQgcGVyc29uXCIpO1xudGFzazEudmlld1Rhc2tEZXRhaWxzKCk7XG5cbnRhc2sxLnNldFRpdGxlKFwiQ29uc3VtZSBGb29kXCIpO1xudGFzazEudmlld1Rhc2tEZXRhaWxzKCk7XG5cbnRhc2sxLnNldER1ZURhdGUoXCIwOS8yNS8yMDIzXCIpO1xudGFzazEudmlld1Rhc2tEZXRhaWxzKCk7XG5cbnRhc2sxLnNldFByaW9yaXR5KFwiTm9ybWFsXCIpO1xudGFzazEudmlld1Rhc2tEZXRhaWxzKCk7XG5cblxuLy93b3Jrc1xubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJteUNhdFwiLCBcIlRvbVwiKTtcbi8vY29tZXMgb3V0IGFzIFtvYmplY3Qgb2JqZWN0XVxubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJmaXJzdFRhc2tcIiwgdGFzazEpO1xuXG4vL29iamVjdFxuY29uc3QgbXlUYXNrID0gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJmaXJzdFRhc2tcIiwgSlNPTi5zdHJpbmdpZnkodGFzazEpKTtcbmNvbnNvbGUubG9nKG15VGFzayk7XG5cbmNvbnN0IHRoZVRhc2sgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImZpcnN0VGFza1wiKVxuY29uc29sZS5sb2codGhlVGFzayk7XG5cbmNvbnN0IGNvbnZlcnRlZFRhc2sgPSBKU09OLnBhcnNlKHRoZVRhc2spO1xuXG5jb25zb2xlLmxvZyhjb252ZXJ0ZWRUYXNrKTtcbmNvbnNvbGUubG9nKGNvbnZlcnRlZFRhc2sudGl0bGUpO1xuXG4vL2Z1bmN0aW9uIHRvIGNvbnZlcnQgYSB0YXNrIHRha2VuIGZyb20gbG9jYWxTdG9yYWdlIChzbyB0aGF0IGl0IGhhcyB0aGUgZnVuY3Rpb25zIHdvcmtpbmcpXG5jb25zdCBjb252ZXJ0VGFza0Zyb21TdG9yYWdlID0gKHRhc2spID0+IHtcbiAgICBjb25zdCBjb252ZXJ0ZWRUYXNrID0gbmV3IFRhc2soXG4gICAgICAgIHRhc2sudGl0bGUsXG4gICAgICAgIHRhc2suZGVzY3JpcHRpb24sXG4gICAgICAgIHRhc2suZHVlRGF0ZSxcbiAgICAgICAgdGFzay5wcmlvcml0eSxcbiAgICAgICAgdGFzay5zdGF0dXNcbiAgICApXG4gICAgcmV0dXJuIGNvbnZlcnRlZFRhc2s7XG59XG5cbmNvbnN0IGNvbnZlcnRlZExhc3QgPSBjb252ZXJ0VGFza0Zyb21TdG9yYWdlKGNvbnZlcnRlZFRhc2spO1xuXG5jb252ZXJ0ZWRMYXN0LnZpZXdUYXNrRGV0YWlscygpO1xuXG4vL3Rlc3RpbmcgbG9jYWxTdG9yYWdlZm9yIGFycmF5c1xuY29uc3QgdGFza18xID0gbmV3IFRhc2soXCIxXCIsIFwiZmlyc3RcIiwgXCIwOS8yMC8yMDIzXCIsIFwibm9ybWFsXCIpO1xuY29uc3QgdGFza18yID0gbmV3IFRhc2soXCIyXCIsIFwic2Vjb25kXCIsIFwiMDkvMjAvMjAyM1wiLCBcIm5vcm1hbFwiKTtcbmNvbnN0IHRhc2tfMyA9IG5ldyBUYXNrKFwiM1wiLCBcInRoaXJkXCIsIFwiMDkvMjAvMjAyM1wiLCBcIm5vcm1hbFwiKTtcbmNvbnN0IHRhc2tfNCA9IG5ldyBUYXNrKFwiNFwiLCBcImZvdXJ0aFwiLCBcIjA5LzIwLzIwMjNcIiwgXCJub3JtYWxcIik7XG5jb25zdCB0YXNrXzUgPSBuZXcgVGFzayhcIjVcIiwgXCJmaWZ0aFwiLCBcIjA5LzIwLzIwMjNcIiwgXCJub3JtYWxcIik7XG5cbmNvbnN0IHRhc2tMaWJyYXJ5ID0gW107XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfMSk7XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfMik7XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfMyk7XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfNCk7XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfNSk7XG5jb25zb2xlLmxvZyh0YXNrTGlicmFyeSk7XG5cbmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGFza0xpYnJhcnlcIiwgSlNPTi5zdHJpbmdpZnkodGFza0xpYnJhcnkpKTtcblxuY29uc3QgdG9kb0RhaWx5ID0gbmV3IFByb2plY3QoXCJUb2RvIERhaWxpZXNcIik7XG50b2RvRGFpbHkuYWRkVGFzayh0YXNrXzEpO1xudG9kb0RhaWx5LmFkZFRhc2sodGFza18yKTtcbnRvZG9EYWlseS5hZGRUYXNrKHRhc2tfMyk7XG50b2RvRGFpbHkuYWRkVGFzayh0YXNrXzQpO1xudG9kb0RhaWx5LmFkZFRhc2sodGFza181KTtcbnRvZG9EYWlseS5hZGRUYXNrKHRhc2sxKTtcbnRvZG9EYWlseS5kZWxldGVUYXNrKHRhc2sxKTtcbnRvZG9EYWlseS52aWV3VGFza3MoKTtcblxubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2RvRGFpbGllc1wiLCBKU09OLnN0cmluZ2lmeSh0b2RvRGFpbHkpKTtcblxuY29uc3QgcHJvamVjdDEgPSBuZXcgUHJvamVjdChcIlByb2plY3QgT25lXCIpO1xucHJvamVjdDEuYWRkVGFzayhuZXcgVGFzayhcIjFcIiwgXCJkbyBkaXNoZXNcIiwgXCI5LzMzLzIwMjJcIiwgXCJ1cmdlbnRcIikpXG5wcm9qZWN0MS5hZGRUYXNrKG5ldyBUYXNrKFwiMlwiLCBcInJpbnNlIGRpc2hlc1wiLCBcIjkvMzMvMjAyMlwiLCBcInVyZ2VudFwiKSlcblxuY29uc3QgYXBwQ29udHJvbGxlciA9IG5ldyBQcm9qZWN0Q29udHJvbGxlcihcImhhcnJpc1RvZG9cIik7XG5hcHBDb250cm9sbGVyLmFkZFByb2plY3QodG9kb0RhaWx5KTtcbmFwcENvbnRyb2xsZXIuYWRkUHJvamVjdChwcm9qZWN0MSk7XG5jb25zb2xlLmxvZyhhcHBDb250cm9sbGVyKTtcblxubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJoYXJyaXNUb2RvXCIsIEpTT04uc3RyaW5naWZ5KGFwcENvbnRyb2xsZXIpKTtcblxuLyogZGF0YS1mbnMgKi9cbi8vIGZvcm1hdHRpbiBhIGRhdGUgaW4gbW0tZC15XG4vLyBjb2xsZWN0aW5nIGEgZGF0ZSB1c2luZyBhIHdpZGdldFxuXG4vLyB0b0RhdGUsIGlzVG9kYXksIGlzVGhpc1dlZWssIHN1YkRheXNcbi8vIHRlc3RpbmcgZGF0ZSBuZXcgZGF0ZVxuXG4vKlxuY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG5jb25zb2xlLmxvZyhkYXRlKTtcbmNvbnNvbGUubG9nKGZvcm1hdChkYXRlLCAneXl5eS1NTS1kZCcpKTtcbiovXG5cbi8qXG5cbmNvbnN0IHN0b3JhZ2UgPSBuZXcgU3RvcmFnZShcInRvZG9BcHBcIik7XG5cbmlmKHN0b3JhZ2UuY29udGFpbnNTdG9yYWdlKFwidG9kb0FwcFwiKSl7XG4gICAgY29uc29sZS5sb2coXCJjb250YWlucyBzdG9yYWdlIVwiKTtcbn1cblxuLy9pbml0aWFsaXplIGlmIG5vIGxvY2FsU3RvcmFnZSB5ZXRcbi8vc3RhcnQgb2YgdG9kbyBhcHBcbmNvbnN0IHRvZG9BcHAgPSBuZXcgUHJvamVjdENvbnRyb2xsZXIoXCJ0b2RvQXBwXCIpO1xuLy9kZWZhdWx0IHByb2plY3RcbnRvZG9BcHAuYWRkUHJvamVjdChcIkluYm94XCIpO1xuc3RvcmFnZS5zdG9yZU9iamVjdCh0b2RvQXBwKTtcbi8vXG5cbmNvbnN0IGFkZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLWJ1dHRvbicpO1xuY29uc3QgbmV3UHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3LXByb2plY3QtbmFtZScpO1xuXG5jb25zb2xlLmxvZyhhZGRQcm9qZWN0KTtcblxuYWRkUHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFkZEJ1dHRvbik7XG5cbmZ1bmN0aW9uIGFkZEJ1dHRvbihldnQpe1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnNvbGUubG9nKFwiY29uc29sZW1lXCIpO1xuICAgIGFsZXJ0KG5ld1Byb2plY3ROYW1lLnZhbHVlKTtcblxuICAgIHRvZG9BcHAuYWRkUHJvamVjdChuZXdQcm9qZWN0TmFtZS52YWx1ZSk7XG4gICAgc3RvcmFnZS5zdG9yZU9iamVjdCh0b2RvQXBwKTtcbn1cbiovXG5cbmNvbnN0IHVpID0gbmV3IFVJO1xuLy91aS5pbml0U3RvcmFnZSgpO1xuLy91aS5kaXNwbGF5UHJvamVjdEJvYXJkKCk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgdWkuaW5pdCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=