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

// Wallpapers
import nycImage from "./nyc.jpg";
import berlinImage from "./berlin.jpg";
import californiaImage from "./cali.jpg";
import switzerlandImage from "./switzerland.jpg";
import parisImage from "./paris.jpg";
import netherlandsImage from "./netherlands.jpg";
import parisImage2 from "./paris2.jpg";
export const wallpapersList = [["New York City", nycImage], ["Paris", parisImage2], ["California", californiaImage],
                                ["The Netherlands", netherlandsImage], ["Eiffel Tower", parisImage],
                                ["Switzerland", switzerlandImage], ["Berlin", berlinImage]];


const loadWallpaper = function() {
    const selectedWallpaperName = storageHandler.retrieveSelectedWallpaper();
    // locate in wallpapersList array
    let index = 0;
    while (index < wallpapersList.length && wallpapersList[index][0] != selectedWallpaperName) {
        index++;
    }
    const wallpaperImage = wallpapersList[index][1];

    // set as background
    const background = document.querySelector(".background");
    background.style.background = `url(${wallpaperImage})`;
    background.style.backgroundSize = "cover";
    background.style.backgroundPosition = "center";
}

/*
************************************************************************************
START SCRIPT
*/

export const myLists = [];

display.headerStartup();
loadWallpaper();
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