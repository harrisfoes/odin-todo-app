/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

    setProjectName = (newName) => {
        this.name = newName;
    }
     
}

class ProjectController{
    constructor(name){
        this.name = name;
        this.projectList = [];
    }

    addProject = (project) => {
        this.projectList.push(project);
    }

    deleteProjet = (projectIndex) => {
        //remove task based on index
        this.projectList = this.projectList.filter(index => {
            return index = projectIndex;
        });
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


console.log("bahog lubot")


const task1 = new _todoParts_js__WEBPACK_IMPORTED_MODULE_0__.Task("Eat food", "eat the foot today", "09/22/2023", "Urgent");
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

/*
--test localstorage
--test localstorage for objects

--test localstorage for arrays
--test localstorage for arrays of objects
*/

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
    const convertedTask = new _todoParts_js__WEBPACK_IMPORTED_MODULE_0__.Task(
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
const task_1 = new _todoParts_js__WEBPACK_IMPORTED_MODULE_0__.Task("1", "first", "09/20/2023", "normal");
const task_2 = new _todoParts_js__WEBPACK_IMPORTED_MODULE_0__.Task("2", "second", "09/20/2023", "normal");
const task_3 = new _todoParts_js__WEBPACK_IMPORTED_MODULE_0__.Task("3", "third", "09/20/2023", "normal");
const task_4 = new _todoParts_js__WEBPACK_IMPORTED_MODULE_0__.Task("4", "fourth", "09/20/2023", "normal");
const task_5 = new _todoParts_js__WEBPACK_IMPORTED_MODULE_0__.Task("5", "fifth", "09/20/2023", "normal");

const taskLibrary = [];
taskLibrary.push(task_1);
taskLibrary.push(task_2);
taskLibrary.push(task_3);
taskLibrary.push(task_4);
taskLibrary.push(task_5);
console.log(taskLibrary);

localStorage.setItem("taskLibrary", JSON.stringify(taskLibrary));

const todoDaily = new _todoParts_js__WEBPACK_IMPORTED_MODULE_0__.Project("Todo Dailies");
todoDaily.addTask(task_1);
todoDaily.addTask(task_2);
todoDaily.addTask(task_3);
todoDaily.addTask(task_4);
todoDaily.addTask(task_5);
todoDaily.addTask(task1);
todoDaily.deleteTask(task1);
todoDaily.viewTasks();

localStorage.setItem("todoDailies", JSON.stringify(todoDaily));

const project1 = new _todoParts_js__WEBPACK_IMPORTED_MODULE_0__.Project("Project One");
project1.addTask(new _todoParts_js__WEBPACK_IMPORTED_MODULE_0__.Task("1", "do dishes", "9/33/2022", "urgent"))
project1.addTask(new _todoParts_js__WEBPACK_IMPORTED_MODULE_0__.Task("2", "rinse dishes", "9/33/2022", "urgent"))

const appController = new _todoParts_js__WEBPACK_IMPORTED_MODULE_0__.ProjectController("harrisTodo");
appController.addProject(todoDaily);
appController.addProject(project1);
console.log(appController);

localStorage.setItem("harrisTodo", JSON.stringify(appController));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QixXQUFXLGlCQUFpQixpQkFBaUIsY0FBYyxhQUFhLGNBQWMsY0FBYyxZQUFZLFlBQVk7QUFDMUo7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTs7Ozs7O1VDL0VBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOa0U7O0FBRWxFOzs7QUFHQSxrQkFBa0IsK0NBQUk7QUFDdEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCLCtDQUFJO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxtQkFBbUIsK0NBQUk7QUFDdkIsbUJBQW1CLCtDQUFJO0FBQ3ZCLG1CQUFtQiwrQ0FBSTtBQUN2QixtQkFBbUIsK0NBQUk7QUFDdkIsbUJBQW1CLCtDQUFJOztBQUV2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxzQkFBc0Isa0RBQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxQkFBcUIsa0RBQU87QUFDNUIscUJBQXFCLCtDQUFJO0FBQ3pCLHFCQUFxQiwrQ0FBSTs7QUFFekIsMEJBQTBCLDREQUFpQjtBQUMzQztBQUNBO0FBQ0E7O0FBRUEsa0UiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLXRvZG8tYXBwLy4vc3JjL3RvZG9QYXJ0cy5qcyIsIndlYnBhY2s6Ly9vZGluLXRvZG8tYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL29kaW4tdG9kby1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL29kaW4tdG9kby1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9vZGluLXRvZG8tYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGl0bGUsZGVzY3JpcHRpb24sZHVlRGF0ZSxwcmlvcml0eSl7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gXCJwZW5kaW5nXCI7XG4gICAgfVxuXG4gICAgdmlld1Rhc2tEZXRhaWxzID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhgVGl0bGU6ICR7dGhpcy50aXRsZX0sIERlc2NyaXB0aW9uOiAke3RoaXMuZGVzY3JpcHRpb259LCBEdWUgZGF0ZTogJHt0aGlzLmR1ZURhdGV9LCBQcmlvcml0eTogJHt0aGlzLnByaW9yaXR5fSwgU3RhdHVzOiAke3RoaXMuc3RhdHVzfWApO1xuICAgIH1cblxuICAgIGNvbXBsZXRlVGFzayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBcImNvbXBsZXRlZFwiO1xuICAgIH1cblxuICAgIHNldFRpdGxlID0gKG5ld1RpdGxlKSA9PiB7XG4gICAgICAgIHRoaXMudGl0bGUgPSBuZXdUaXRsZTtcbiAgICB9XG5cbiAgICBzZXREZXNjcmlwdGlvbiA9IChuZXdEZXNjcmlwdGlvbikgPT4ge1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG4gICAgfVxuXG4gICAgc2V0RHVlRGF0ZSA9IChuZXdEdWVEYXRlKSA9PiB7XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IG5ld0R1ZURhdGU7XG4gICAgfVxuXG4gICAgc2V0UHJpb3JpdHkgPSAobmV3UHJpb3JpdHkpID0+IHtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xuICAgIH1cblxufVxuXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IobmFtZSl7XG4gICAgICAgIHRoaXMudGFza0xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBhZGRUYXNrID0gKHRhc2spID0+IHtcbiAgICAgICAgdGhpcy50YXNrTGlzdC5wdXNoKHRhc2spO1xuICAgIH1cblxuICAgIGRlbGV0ZVRhc2sgPSAodGFza0luZGV4KSA9PiB7XG4gICAgICAgIC8vcmVtb3ZlIHRhc2sgYmFzZWQgb24gaW5kZXhcbiAgICAgICAgdGhpcy50YXNrTGlzdCA9IHRoaXMudGFza0xpc3QuZmlsdGVyKGluZGV4ID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpbmRleCAhPSB0YXNrSW5kZXg7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZpZXdUYXNrcyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy50YXNrTGlzdC5mb3JFYWNoKCh0YXNrKSA9PiB0YXNrLnZpZXdUYXNrRGV0YWlscygpKTtcbiAgICB9XG5cbiAgICBzZXRQcm9qZWN0TmFtZSA9IChuZXdOYW1lKSA9PiB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5ld05hbWU7XG4gICAgfVxuICAgICBcbn1cblxuZXhwb3J0IGNsYXNzIFByb2plY3RDb250cm9sbGVye1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpe1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnByb2plY3RMaXN0ID0gW107XG4gICAgfVxuXG4gICAgYWRkUHJvamVjdCA9IChwcm9qZWN0KSA9PiB7XG4gICAgICAgIHRoaXMucHJvamVjdExpc3QucHVzaChwcm9qZWN0KTtcbiAgICB9XG5cbiAgICBkZWxldGVQcm9qZXQgPSAocHJvamVjdEluZGV4KSA9PiB7XG4gICAgICAgIC8vcmVtb3ZlIHRhc2sgYmFzZWQgb24gaW5kZXhcbiAgICAgICAgdGhpcy5wcm9qZWN0TGlzdCA9IHRoaXMucHJvamVjdExpc3QuZmlsdGVyKGluZGV4ID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpbmRleCA9IHByb2plY3RJbmRleDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBUYXNrLCBQcm9qZWN0LCBQcm9qZWN0Q29udHJvbGxlciB9IGZyb20gXCIuL3RvZG9QYXJ0cy5qc1wiO1xuXG5jb25zb2xlLmxvZyhcImJhaG9nIGx1Ym90XCIpXG5cblxuY29uc3QgdGFzazEgPSBuZXcgVGFzayhcIkVhdCBmb29kXCIsIFwiZWF0IHRoZSBmb290IHRvZGF5XCIsIFwiMDkvMjIvMjAyM1wiLCBcIlVyZ2VudFwiKTtcbnRhc2sxLnZpZXdUYXNrRGV0YWlscygpO1xuXG50YXNrMS5jb21wbGV0ZVRhc2soKTtcbnRhc2sxLnZpZXdUYXNrRGV0YWlscygpO1xuXG50YXNrMS5zZXREZXNjcmlwdGlvbihcIkltIGEgY2hhbmdlZCBwZXJzb25cIik7XG50YXNrMS52aWV3VGFza0RldGFpbHMoKTtcblxudGFzazEuc2V0VGl0bGUoXCJDb25zdW1lIEZvb2RcIik7XG50YXNrMS52aWV3VGFza0RldGFpbHMoKTtcblxudGFzazEuc2V0RHVlRGF0ZShcIjA5LzI1LzIwMjNcIik7XG50YXNrMS52aWV3VGFza0RldGFpbHMoKTtcblxudGFzazEuc2V0UHJpb3JpdHkoXCJOb3JtYWxcIik7XG50YXNrMS52aWV3VGFza0RldGFpbHMoKTtcblxuLypcbi0tdGVzdCBsb2NhbHN0b3JhZ2Vcbi0tdGVzdCBsb2NhbHN0b3JhZ2UgZm9yIG9iamVjdHNcblxuLS10ZXN0IGxvY2Fsc3RvcmFnZSBmb3IgYXJyYXlzXG4tLXRlc3QgbG9jYWxzdG9yYWdlIGZvciBhcnJheXMgb2Ygb2JqZWN0c1xuKi9cblxuLy93b3Jrc1xubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJteUNhdFwiLCBcIlRvbVwiKTtcbi8vY29tZXMgb3V0IGFzIFtvYmplY3Qgb2JqZWN0XVxubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJmaXJzdFRhc2tcIiwgdGFzazEpO1xuXG4vL29iamVjdFxuY29uc3QgbXlUYXNrID0gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJmaXJzdFRhc2tcIiwgSlNPTi5zdHJpbmdpZnkodGFzazEpKTtcbmNvbnNvbGUubG9nKG15VGFzayk7XG5cbmNvbnN0IHRoZVRhc2sgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImZpcnN0VGFza1wiKVxuY29uc29sZS5sb2codGhlVGFzayk7XG5cbmNvbnN0IGNvbnZlcnRlZFRhc2sgPSBKU09OLnBhcnNlKHRoZVRhc2spO1xuXG5jb25zb2xlLmxvZyhjb252ZXJ0ZWRUYXNrKTtcbmNvbnNvbGUubG9nKGNvbnZlcnRlZFRhc2sudGl0bGUpO1xuXG4vL2Z1bmN0aW9uIHRvIGNvbnZlcnQgYSB0YXNrIHRha2VuIGZyb20gbG9jYWxTdG9yYWdlIChzbyB0aGF0IGl0IGhhcyB0aGUgZnVuY3Rpb25zIHdvcmtpbmcpXG5jb25zdCBjb252ZXJ0VGFza0Zyb21TdG9yYWdlID0gKHRhc2spID0+IHtcbiAgICBjb25zdCBjb252ZXJ0ZWRUYXNrID0gbmV3IFRhc2soXG4gICAgICAgIHRhc2sudGl0bGUsXG4gICAgICAgIHRhc2suZGVzY3JpcHRpb24sXG4gICAgICAgIHRhc2suZHVlRGF0ZSxcbiAgICAgICAgdGFzay5wcmlvcml0eSxcbiAgICAgICAgdGFzay5zdGF0dXNcbiAgICApXG4gICAgcmV0dXJuIGNvbnZlcnRlZFRhc2s7XG59XG5cbmNvbnN0IGNvbnZlcnRlZExhc3QgPSBjb252ZXJ0VGFza0Zyb21TdG9yYWdlKGNvbnZlcnRlZFRhc2spO1xuXG5jb252ZXJ0ZWRMYXN0LnZpZXdUYXNrRGV0YWlscygpO1xuXG4vL3Rlc3RpbmcgbG9jYWxTdG9yYWdlZm9yIGFycmF5c1xuY29uc3QgdGFza18xID0gbmV3IFRhc2soXCIxXCIsIFwiZmlyc3RcIiwgXCIwOS8yMC8yMDIzXCIsIFwibm9ybWFsXCIpO1xuY29uc3QgdGFza18yID0gbmV3IFRhc2soXCIyXCIsIFwic2Vjb25kXCIsIFwiMDkvMjAvMjAyM1wiLCBcIm5vcm1hbFwiKTtcbmNvbnN0IHRhc2tfMyA9IG5ldyBUYXNrKFwiM1wiLCBcInRoaXJkXCIsIFwiMDkvMjAvMjAyM1wiLCBcIm5vcm1hbFwiKTtcbmNvbnN0IHRhc2tfNCA9IG5ldyBUYXNrKFwiNFwiLCBcImZvdXJ0aFwiLCBcIjA5LzIwLzIwMjNcIiwgXCJub3JtYWxcIik7XG5jb25zdCB0YXNrXzUgPSBuZXcgVGFzayhcIjVcIiwgXCJmaWZ0aFwiLCBcIjA5LzIwLzIwMjNcIiwgXCJub3JtYWxcIik7XG5cbmNvbnN0IHRhc2tMaWJyYXJ5ID0gW107XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfMSk7XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfMik7XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfMyk7XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfNCk7XG50YXNrTGlicmFyeS5wdXNoKHRhc2tfNSk7XG5jb25zb2xlLmxvZyh0YXNrTGlicmFyeSk7XG5cbmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGFza0xpYnJhcnlcIiwgSlNPTi5zdHJpbmdpZnkodGFza0xpYnJhcnkpKTtcblxuY29uc3QgdG9kb0RhaWx5ID0gbmV3IFByb2plY3QoXCJUb2RvIERhaWxpZXNcIik7XG50b2RvRGFpbHkuYWRkVGFzayh0YXNrXzEpO1xudG9kb0RhaWx5LmFkZFRhc2sodGFza18yKTtcbnRvZG9EYWlseS5hZGRUYXNrKHRhc2tfMyk7XG50b2RvRGFpbHkuYWRkVGFzayh0YXNrXzQpO1xudG9kb0RhaWx5LmFkZFRhc2sodGFza181KTtcbnRvZG9EYWlseS5hZGRUYXNrKHRhc2sxKTtcbnRvZG9EYWlseS5kZWxldGVUYXNrKHRhc2sxKTtcbnRvZG9EYWlseS52aWV3VGFza3MoKTtcblxubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2RvRGFpbGllc1wiLCBKU09OLnN0cmluZ2lmeSh0b2RvRGFpbHkpKTtcblxuY29uc3QgcHJvamVjdDEgPSBuZXcgUHJvamVjdChcIlByb2plY3QgT25lXCIpO1xucHJvamVjdDEuYWRkVGFzayhuZXcgVGFzayhcIjFcIiwgXCJkbyBkaXNoZXNcIiwgXCI5LzMzLzIwMjJcIiwgXCJ1cmdlbnRcIikpXG5wcm9qZWN0MS5hZGRUYXNrKG5ldyBUYXNrKFwiMlwiLCBcInJpbnNlIGRpc2hlc1wiLCBcIjkvMzMvMjAyMlwiLCBcInVyZ2VudFwiKSlcblxuY29uc3QgYXBwQ29udHJvbGxlciA9IG5ldyBQcm9qZWN0Q29udHJvbGxlcihcImhhcnJpc1RvZG9cIik7XG5hcHBDb250cm9sbGVyLmFkZFByb2plY3QodG9kb0RhaWx5KTtcbmFwcENvbnRyb2xsZXIuYWRkUHJvamVjdChwcm9qZWN0MSk7XG5jb25zb2xlLmxvZyhhcHBDb250cm9sbGVyKTtcblxubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJoYXJyaXNUb2RvXCIsIEpTT04uc3RyaW5naWZ5KGFwcENvbnRyb2xsZXIpKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=