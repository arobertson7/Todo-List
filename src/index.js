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

// display.clearListDisplay();

const header = document.getElementById("header");
header.addEventListener("click", () => {
    console.log(defaultList.list);
})