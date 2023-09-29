import { Task, Project, ProjectController } from "./todoParts.js";
import { format } from "date-fns";

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

const date = new Date();
console.log(date);
console.log(format(date, 'yyyy-MM-dd'));