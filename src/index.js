import { Task } from "./todoParts.js";

console.log("bahog lubot")


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
