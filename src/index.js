import "./styles.css";
import Todo from "./Todo.js";
import TodoList from "./TodoList.js";
import display from "./display.js";
import storageHandler from "./storage.js";
export const removeList = function(indexToRemove) {
    for (let i = indexToRemove + 1; i < myLists.length; i++) {
        myLists[i - 1] = myLists[i];
    }
    myLists.pop();
    storageHandler.updateLocalStorage();
}
// swaps list at 'indexToSwap' with list at index 0, making it the new home list
export const updateHomeList = function(indexToSwap) {
    const newHomeList = myLists[indexToSwap];
    myLists[indexToSwap] = myLists[0];
    myLists[0] = newHomeList;
    storageHandler.updateLocalStorage();
}

/*
************************************************************************************
START SCRIPT
*/

export const myLists = [];

display.headerStartup();
storageHandler.retrieveMyLists();
let homeList = myLists[0];
display.displayList(homeList);

// const task1 = new Todo("Task 1", "Something to do", "2025-6-16", 2);
// const task2 = new Todo("Task 2", "Something else to do", "2025-6-16", 2);
// const task3 = new Todo("Task 3", "Something further to do", "2025-6-16", 2);



// const toDoList = new TodoList("todoList");
// toDoList.add(task1);
// toDoList.add(task2);
// toDoList.add(task3);

// const secondToDoList = new TodoList("secondToDoList");
// secondToDoList.add(task2);
// secondToDoList.add(task3);

// const thirdToDoList = new TodoList("thirdToDoList");
// thirdToDoList.add(task2);

// myLists.push(toDoList);
// myLists.push(secondToDoList);
// myLists.push(thirdToDoList);