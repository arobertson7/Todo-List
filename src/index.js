import "./styles.css";

import Todo from "./Todo.js";
import TodoList from "./TodoList.js";
import display from "./display.js";


display.headerStartup();

const piano = new Todo("Play piano", "today we need to practice piano for 4 hours");
const sing = new Todo("Sing forever");
const eat = new Todo("Eat", "we must eat", "Due in 2 days", 1)
const defaultList = new TodoList("Today's To-dos");
defaultList.add(piano);
defaultList.add(sing);
defaultList.add(eat);


display.displayList(defaultList);



// remove everything below after finishing dialog box

const ok = function() {
    const dialog = document.getElementById("add-new-task-dialog");
    dialog.showModal();

    const overlay = document.querySelector(".modal-overlay");
    overlay.style.visibility = "visible";

    const listContainer = document.querySelector(".list-container");
    listContainer.style.visibility = "hidden";
}


const addTaskButton = document.querySelector(".add-task-button");
addTaskButton.addEventListener("click", () => {
    ok();
})
const highPriority = document.getElementById("high-priority");
highPriority.addEventListener("click", () => {
    const dialog = document.getElementById("add-new-task-dialog");
    dialog.close();

    const overlay = document.querySelector(".modal-overlay");
    overlay.style.visibility = "hidden";

    const listContainer = document.querySelector(".list-container");
    listContainer.style.visibility = "visible";
})