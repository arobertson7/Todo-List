import "./styles.css";

import Todo from "./Todo.js";
import TodoList from "./TodoList.js";

const todo1 = new Todo("Task 1", "My first task", "March 9", 3);

todo1.completed = true;

console.log(todo1.completed);