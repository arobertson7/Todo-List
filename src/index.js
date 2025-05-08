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
export const wallpapersList = [["Eiffel Tower", parisImage], ["New York City", nycImage], ["California", californiaImage],
                                ["The Netherlands", netherlandsImage], ["Paris", parisImage2],
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

if (!localStorage.getItem('firstVisitCompleted')) {
    document.getElementById("content").classList.add("first-visit");
}

export const myLists = [];

display.headerStartup();
loadWallpaper();
storageHandler.retrieveMyLists();
let homeList = myLists[0];
display.displayList(homeList);

if (document.querySelector(".empty-list-message")) {
    const openingMessage = document.querySelector(".empty-list-message");
    openingMessage.textContent = "Add a new task and get started!";
    openingMessage.style.fontSize = "1.2rem";
    openingMessage.style.fontWeight = "500";
}