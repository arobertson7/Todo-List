import { myLists } from "./index.js";
import Todo from "./Todo.js";
import TodoList from "./TodoList.js";

const storageHandler = (function() {
    // pushes everything currently in myLists to local storage
    // Currently attached to:
        // Todo.setCompleted()
        // TodoList.add()
        // display.handleEditedTask()
        // TodoList.setTitle()
        // index.updateHomeList()
        // index.removeList()
        // display.handleCreateNewList()
        // TodoList.sortByPriority()
        // TodoList.sortByDueDate()
        // TodoList.sortByCompletedStatus()
    const updateLocalStorage = function() {
        localStorage.setItem('myLists', JSON.stringify(myLists));
    }

    // void function populating myLists array based on the data in localStorage.
    // if localStorage is empty or myLists.length == 0, returns a myLists array with one default ToDoList
    const retrieveMyLists = function() {
        if (localStorage.getItem('myLists') && !JSON.parse(localStorage.getItem('myLists')).length == 0) {
            let parsedStorageArray = JSON.parse(localStorage.getItem('myLists'));
            for (let i = 0; i < parsedStorageArray.length; i++) {
                const todoList = convertParsedListToRealList(parsedStorageArray[i]);
                myLists.push(todoList);
            }
        }
        else {
            const defaultList = new TodoList("Todo List");
            myLists.push(defaultList);
        }

        updateLocalStorage();
    }

    // helper function called in retrieveMyLists()
    const convertParsedListToRealList = function(parsedList) {
        const realList = new TodoList(parsedList.title);
        for (let i = 0; i < parsedList.list.length; i++) {
            const parsedTodo = parsedList.list[i];
            const realTodo = convertParsedTaskToRealTask(parsedTodo);
            realList.add(realTodo);
        }
        return realList;
    }

    // helper function called in retrieveMyLists() via convertParsedListToRealList()
    const convertParsedTaskToRealTask = function(parsedTodo) {
        const realTodo = new Todo(parsedTodo.title, parsedTodo.description, parsedTodo.dueDate, parsedTodo.priority);
        realTodo.completed = parsedTodo.completed;
        return realTodo;
    }

    // returns the name of the selected wallpaper if found, else returns 'Eiffel Tower' as default
    const retrieveSelectedWallpaper = function() {
        if (localStorage.getItem('curWallpaper')) {
            return localStorage.getItem('curWallpaper');
        }
        else {
            return "Eiffel Tower";
        }
    }

    return { updateLocalStorage, retrieveMyLists, retrieveSelectedWallpaper };
})();

export default storageHandler;