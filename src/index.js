import "./styles.css";

import Todo from "./Todo.js";
import TodoList from "./TodoList.js";
import display from "./display.js";
export const myLists = [];


display.headerStartup();

const piano = new Todo("Play piano", "today we need to practice piano for 4 hours");
const sing = new Todo("Sing forever");
const eat = new Todo("Eat", "we must eat", "2025-4-28", 1)
const defaultList = new TodoList("Today's To-dos");
defaultList.add(piano);
defaultList.add(sing);
defaultList.add(eat);

myLists.push(defaultList);

display.displayList(defaultList);

// // display.clearListDisplay();

// const header = document.getElementById("header");
// header.addEventListener("click", () => {
//     console.log(defaultList.list);
// })

const list2 = new TodoList("List 2");

const guitar = new Todo("Play guitar", "today we need to practice guitar for 3 hours");
const german = new Todo("Speak some german");
const code = new Todo("Code", "we must code", "2025-7-8", 1)

list2.add(guitar);
list2.add(german);
list2.add(code);

myLists.push(list2);

const list3 = new TodoList("List 3");
const list4 = new TodoList("List 4");
myLists.push(list3);

