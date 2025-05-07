import Todo from "./Todo.js";
import TodoList from "./TodoList.js";
import { myLists, removeList, updateHomeList, wallpapersList } from "./index.js";
import { formatDateFromInput, formatDateYYYYMMDD, formatDueDateForDisplay } from "./format-date.js";
import cogIcon from "./cog.svg";
import whiteCogIcon from "./cog-white.svg";
import homeIcon from "./home.svg";
import tuneIcon from "./tune.svg";
import downArrowIcon from "./down-arrow-icon.svg";
import upArrowIcon from "./up-arrow-icon.svg";
import editIcon from "./edit-icon.svg";
import storageHandler from "./storage.js";

export let listColorMap = [];

const listColorOptions = ["rgba(29, 150, 45, 0.87)", "rgba(187, 27, 81, 0.87)", "rgba(23, 130, 144, 0.87)",
    "rgba(110, 64, 163, 0.87)", "rgba(23, 144, 124, 0.87)", "rgba(25, 97, 199, 0.87)", "rgba(202, 37, 37, 0.87)",
    "rgba(161, 64, 163, 0.87)", "rgba(21, 96, 143, 0.87)", "rgba(236, 153, 0, 0.87)"
]

const display = (function() {

    const headerStartup = function() {
        const header = document.getElementById("header");
        const message = document.createElement("h1");
        message.textContent = "A busy day is a good day";
        header.appendChild(message);
    
        let clock = 1500;
        // fade message out
        setTimeout(() => {
            message.style.opacity = "0";
        }, clock);
    
        clock += 1000
        // replace message with nav
        setTimeout(() => {
            const nav = document.createElement("nav");
            nav.id = "nav";
            for (let i = 0; i < 3; i++) {
                const navButton = document.createElement("button");
                navButton.style.opacity = "0";
                nav.appendChild(navButton);
                if (i == 1) {
                    navButton.id = "nav-home-button";
                    const homeImageElement = document.createElement("img");
                    homeImageElement.src = homeIcon;
                    homeImageElement.style.width = "70%";
                    homeImageElement.style.height = "70%";
                    homeImageElement.style.filter = "drop-shadow(1.5px 1.5px 1px rgb(0 0 0 / 0.4))";
                    navButton.appendChild(homeImageElement);
                    navButton.addEventListener("click", () => {
                        if (getHomeList()) {
                            displayList(getHomeList());
                        }
                    });
                }
                else if (i == 0) {
                    navButton.id = "nav-settings-button";
                    const tuneImageElement = document.createElement("img");
                    tuneImageElement.src = tuneIcon;
                    tuneImageElement.style.width = "60%";
                    tuneImageElement.style.height = "60%";
                    tuneImageElement.style.filter = "drop-shadow(1.5px 1.5px 1px rgb(0 0 0 / 0.4))";
                    navButton.appendChild(tuneImageElement);
                    navButton.addEventListener("click", displaySettings);
                }
                else if (i == 2) {
                    navButton.id = "nav-my-lists-button";
                    const myListsText = document.createElement("p");
                    myListsText.textContent = "My Lists";
                    navButton.appendChild(myListsText);
                    navButton.addEventListener("click", displayMyLists);
                }
            }
    
            header.removeChild(message);
            header.appendChild(nav);
        }, clock);
    
        clock += 20;
        // fade nav in
        setTimeout(() => {
            for (let j = 0; j < 3; j++) {
                nav.childNodes[j].style.opacity = "1";
            }
        }, clock);

        // initialize priority button transition styles
        initializeDialogButtonTransitionStyles();
    }
    
    // const displayHeaderMessage = function(displayMessage) {
    //     const header = document.getElementById("header");
    //     let clock = 0;

    //     const message = document.createElement("h1");
    //     message.textContent = displayMessage;

    //     // to ensure the dialog buttons below only get initialized once
    //     let dialogButtonsInitialized = true;

    //     if (document.getElementById("nav")) {
    //         // CASE 1: NAV EXISTS - FADE BUTTONS OUT, MESSAGE IN

    //         // fade buttons out
    //         const navButtons = document.getElementById("nav").childNodes;
    //         for (let i = 0; i < navButtons.length; i++) {
    //             navButtons[i].style.opacity = "0";
    //         }

    //         // remove nav after fade finishes
    //         clock += 1000;
    //         message.style.opacity = "0";
    //         message.classList.add("header-message-fade");
    //         setTimeout(() => {
    //             header.removeChild(document.getElementById("nav"));
    //             // fade message in
    //             header.appendChild(message);
    //         }, clock);

    //         clock += 20;
    //         setTimeout(() => {
    //             message.style.opacity = "1";
    //         }, clock);

    //         clock -= 300;
    //     }
    //     else {
    //         // CASE 2: PAGE LOAD - DISPLAY MESSAGE RIGHT AWAY
    //         header.appendChild(message);

    //         // do we don't fade message right as page loads
    //         setTimeout(() => {
    //             message.classList.add("header-message-fade");
    //         }, 1000);

    //         dialogButtonsInitialized = false;
    //     }



    //     // MESSAGE FADE OUT, BUTTONS FADE IN
    //     clock += 1500;
    //     // fade message out
    //     setTimeout(() => {
    //         message.style.opacity = "0";
    //     }, clock);
    
    //     clock += 1000
    //     // replace message with nav
    //     setTimeout(() => {
    //         const nav = document.createElement("nav");
    //         nav.id = "nav";
    //         for (let i = 0; i < 3; i++) {
    //             const navButton = document.createElement("button");
    //             navButton.style.opacity = "0";
    //             nav.appendChild(navButton);
    //             if (i == 1) {
    //                 navButton.id = "nav-home-button";
    //                 const homeImageElement = document.createElement("img");
    //                 homeImageElement.src = homeIcon;
    //                 homeImageElement.style.width = "70%";
    //                 homeImageElement.style.height = "70%";
    //                 homeImageElement.style.filter = "drop-shadow(1.5px 1.5px 1px rgb(0 0 0 / 0.4))";
    //                 navButton.appendChild(homeImageElement);
    //                 navButton.addEventListener("click", () => {
    //                     if (getHomeList()) {
    //                         displayList(getHomeList());
    //                     }
    //                     displayHeaderMessage("Home List");
    //                 });
    //             }
    //             else if (i == 0) {
    //                 navButton.id = "nav-settings-button";
    //                 const tuneImageElement = document.createElement("img");
    //                 tuneImageElement.src = tuneIcon;
    //                 tuneImageElement.style.width = "60%";
    //                 tuneImageElement.style.height = "60%";
    //                 tuneImageElement.style.filter = "drop-shadow(1.5px 1.5px 1px rgb(0 0 0 / 0.4))";
    //                 navButton.appendChild(tuneImageElement);
    //                 navButton.addEventListener("click", displaySettings);
    //             }
    //             else if (i == 2) {
    //                 navButton.id = "nav-my-lists-button";
    //                 const myListsText = document.createElement("p");
    //                 myListsText.textContent = "My Lists";
    //                 navButton.appendChild(myListsText);
    //                 navButton.addEventListener("click", displayMyLists);
    //             }
    //         }
    
    //         header.removeChild(message);
    //         header.appendChild(nav);
    //     }, clock);
    
    //     clock += 20;
    //     // fade nav in
    //     setTimeout(() => {
    //         for (let j = 0; j < 3; j++) {
    //             nav.childNodes[j].style.opacity = "1";
    //         }
    //     }, clock);


    //     if (!dialogButtonsInitialized) {
    //         // initialize priority button transition styles
    //         initializeDialogButtonTransitionStyles();
    //     }
    // }

    const getHomeList = function() {
        if (myLists.length != 0) {
            return myLists[0];
        }
    }

    const getListColor = function(listName) {
        // if color for this list is set, return it
        listColorMap = storageHandler.retrieveListColorMap();
        let mapIndex = 0;
        while (mapIndex < listColorMap.length && listColorMap[mapIndex][0] != listName) {
            mapIndex++;
        }

        if (mapIndex != listColorMap.length) {
            return listColorMap[mapIndex][1];
        }
        // else return next unused list color in listColorOptions
        else {
            const nextUnusedColorIndex = listColorMap.length % listColorOptions.length;
            const listColor = listColorOptions[nextUnusedColorIndex];
            listColorMap.push([listName, listColor]);
            storageHandler.updateListColorMap();

            return listColor;
        }
    }

    const initializeDialogButtonTransitionStyles = function() {
        // style add task priority buttons
        const addTaskPriorityButtons = document.querySelectorAll(".styled-priority-button");
        for (let i = 0; i < addTaskPriorityButtons.length; i++) {
            addTaskPriorityButtons[i].addEventListener("click", () => {
                const thisPriority = addTaskPriorityButtons[i].classList[1];
                addTaskPriorityButtons[i].style.backgroundColor = `var(--${thisPriority}-priority-color)`;
                addTaskPriorityButtons[i].childNodes[1].style.color = "white";
                addTaskPriorityButtons[i].childNodes[0].setAttribute('checked', 'checked');
                for (let j = 0; j < addTaskPriorityButtons.length; j++) {
                    if (addTaskPriorityButtons[j] != addTaskPriorityButtons[i]) {
                        if (j == 0) {
                            addTaskPriorityButtons[j].style.backgroundColor = "white";
                            addTaskPriorityButtons[j].childNodes[1].style.color = "var(--high-priority-color)";
                            addTaskPriorityButtons[j].childNodes[0].removeAttribute('checked');
                        }
                        else if (j == 1) {
                            addTaskPriorityButtons[j].style.backgroundColor = "white";
                            addTaskPriorityButtons[j].childNodes[1].style.color = "var(--medium-priority-color)";
                            addTaskPriorityButtons[j].childNodes[0].removeAttribute('checked');
                        }
                        else if (j == 2) {
                            addTaskPriorityButtons[j].style.backgroundColor = "white";
                            addTaskPriorityButtons[j].childNodes[1].style.color = "var(--low-priority-color)";
                            addTaskPriorityButtons[j].childNodes[0].removeAttribute('checked');
                        }
                    }
                }
            })
        }

        // style edit task priority buttons
        const editTaskPriorityButtons = document.querySelectorAll(".styled-edited-priority-button");
        for (let i = 0; i < editTaskPriorityButtons.length; i++) {
            editTaskPriorityButtons[i].addEventListener("click", () => {
                const thisPriority = editTaskPriorityButtons[i].classList[1];
                editTaskPriorityButtons[i].style.backgroundColor = `var(--${thisPriority}-priority-color)`;
                editTaskPriorityButtons[i].childNodes[1].style.color = "white";
                editTaskPriorityButtons[i].childNodes[0].setAttribute('checked', 'checked');
                for (let j = 0; j < editTaskPriorityButtons.length; j++) {
                    if (editTaskPriorityButtons[j] != editTaskPriorityButtons[i]) {
                        if (j == 0) {
                            editTaskPriorityButtons[j].style.backgroundColor = "white";
                            editTaskPriorityButtons[j].childNodes[1].style.color = "var(--high-priority-color)";
                            editTaskPriorityButtons[j].childNodes[0].removeAttribute('checked');
                        }
                        else if (j == 1) {
                            editTaskPriorityButtons[j].style.backgroundColor = "white";
                            editTaskPriorityButtons[j].childNodes[1].style.color = "var(--medium-priority-color)";
                            editTaskPriorityButtons[j].childNodes[0].removeAttribute('checked');
                        }
                        else if (j == 2) {
                            editTaskPriorityButtons[j].style.backgroundColor = "white";
                            editTaskPriorityButtons[j].childNodes[1].style.color = "var(--low-priority-color)";
                            editTaskPriorityButtons[j].childNodes[0].removeAttribute('checked');
                        }
                    }
                }
            })
        }

        // style edited completed status buttons
        const completedButton = document.querySelector(".styled-edited-completed-button");
        const incompleteButton = document.querySelector(".styled-edited-incomplete-button");
        completedButton.addEventListener("click", () => {
            completedButton.style.backgroundColor = "rgb(47, 181, 93)";
            completedButton.childNodes[1].style.color = "white";
            completedButton.childNodes[0].setAttribute('checked', 'checked');

            incompleteButton.style.backgroundColor = "white";
            incompleteButton.childNodes[1].style.color = "rgb(47, 181, 93)";
            if (incompleteButton.childNodes[0].hasAttribute('checked')) {
                incompleteButton.childNodes[0].removeAttribute('checked');
            }
        })
        incompleteButton.addEventListener("click", () => {
            incompleteButton.style.backgroundColor = "rgb(47, 181, 93)";
            incompleteButton.childNodes[1].style.color = "white";
            incompleteButton.childNodes[0].setAttribute('checked', 'checked');

            completedButton.style.backgroundColor = "white";
            completedButton.childNodes[1].style.color = "rgb(47, 181, 93)";
            if (completedButton.childNodes[0].hasAttribute('checked')) {
                completedButton.childNodes[0].removeAttribute('checked');
            }
        })
    }
    
    const displayList = function(thisList) {
        // add more pics for diff backgrounds on diff lists
        // const background = document.querySelector(".background");
        // switch(true) {
        //     case thisList == myLists[0]:
        //         background.style.background = "url('./berlin.jpg')";
        //         break;
        //     case thisList == myLists[1]:
        //         background.style.background = 'url("./nyc.jpg")';
        //         break;
        //     case thisList == myLists[2]:
        //         background.style.background = 'url("./dresden.jpg")';
        //         break;
        // }


        clearContent();
        const content = document.getElementById("content");
    
        const listContainer = document.createElement("div");
        listContainer.classList.add("list-container");
        content.appendChild(listContainer);
    
        const title = document.createElement("h2");
        title.classList.add('list-header');
        title.textContent = thisList.title;
        title.style.backgroundColor = getListColor(thisList.title);
        listContainer.appendChild(title);
    
        const listOptions = document.createElement("div");
        listOptions.classList.add("list-options");
        const addTaskButton = document.createElement("button");
        addTaskButton.classList.add("add-task-button");
        addTaskButton.textContent = "Add New Task";

        const sortTasksSelect = document.createElement("select");
        sortTasksSelect.id = "sort-by";
        sortTasksSelect.setAttribute('name', 'sort-by');
        const sortLabel = document.createElement("label");
        sortLabel.setAttribute('for', 'sort-by');
        sortLabel.textContent = "Sort by";
        sortTasksSelect.appendChild(sortLabel);
        for (let i = 0; i < 4; i++) {
            const option = document.createElement("option");
            if (i == 0) {
                option.setAttribute('value', 'sort-by-placeholder');
                option.setAttribute('disabled', 'disabled');
                option.setAttribute('selected', 'selected');
                option.textContent = "Sort by";
            }
            else if (i == 1) {
                option.setAttribute('value', 'priority-sort');
                option.textContent = "Priority";
            }
            else if (i == 2) {
                option.setAttribute('value', 'due-date-sort');
                option.textContent = "Due Date";
            }
            else if (i == 3) {
                option.setAttribute('value', 'completed-status-sort');
                option.textContent = "Completed";
            }
            sortTasksSelect.appendChild(option);
        }
        sortTasksSelect.addEventListener("change", function(event) {
            handleSortSelection(event, thisList);
        });

        listOptions.appendChild(addTaskButton);
        listOptions.appendChild(sortTasksSelect);
        listContainer.appendChild(listOptions);

        // event listeners for addNewTask button
        addTaskButton.addEventListener("click", () => {
            const dialog = document.getElementById("add-new-task-dialog");
            dialog.showModal();
            const title = document.getElementById("new-task-title");
            title.focus();
        
            const overlay = document.querySelector(".modal-overlay");
            overlay.style.visibility = "visible";

            const listContainer = document.querySelector(".list-container");
            listContainer.style.visibility = "hidden";

            const submitButton = document.querySelector(".submit-new-task-form-button");
            submitButton.addEventListener("click", handleAddedTask.bind(thisList));

            const closeDialogButton = document.querySelector(".close-dialog-button");
            closeDialogButton.addEventListener("click", () => {
                dialog.close();
                overlay.style.visibility = "hidden";
                listContainer.style.visibility = "visible";

                // bandaid solution for now to avoid multiple event listeners for submit
                const form = document.querySelector(".add-new-task-form");
                const oldSubmitButton = document.querySelector(".submit-new-task-form-button");
                form.removeChild(oldSubmitButton);
                const newSubmitButton = document.createElement("button");
                newSubmitButton.classList.add("submit-new-task-form-button");
                newSubmitButton.textContent = "Add";
                form.appendChild(newSubmitButton);
            })

            // make sure no filled in priority buttons if there wasn't previous input
            const titleField = document.getElementById("new-task-title").value;
            const descriptionField = document.getElementById("new-task-description").value;
            const dueDateField = document.getElementById("new-task-due-date").value;
            if (titleField == "" && descriptionField == "" && dueDateField == "") {
                const priorityButtons = document.querySelectorAll(".styled-priority-button");
                // briefly remove class here to avoid transition on load
                for (let i = 0; i < priorityButtons.length; i++) {
                    priorityButtons[i].classList.remove("color-transition");
                }
                priorityButtons[0].style.backgroundColor = "white";
                priorityButtons[0].childNodes[1].style.color = "var(--high-priority-color)";
                priorityButtons[1].style.backgroundColor = "white";
                priorityButtons[1].childNodes[1].style.color = "var(--medium-priority-color)";
                priorityButtons[2].style.backgroundColor = "white";
                priorityButtons[2].childNodes[1].style.color = "var(--low-priority-color)";
                // add class back
                setTimeout(() => {
                    for (let i = 0; i < priorityButtons.length; i++) {
                        priorityButtons[i].classList.add("color-transition");
                    }
                }, 700);
            }
        })
    
        const list = document.createElement("div");
        list.classList.add("list");
        listContainer.appendChild(list);
    
        // display message if there are no tasks
        if (thisList.size() == 0) {
            const messageContainer = document.createElement("div");
            messageContainer.classList.add("empty-list-message");
            const message = document.createElement("h2");
            message.textContent = "You're all caught up! Go enjoy the sun!☀️";
            messageContainer.appendChild(message);
            list.appendChild(messageContainer);
        }
        else {
            for (let i = 0; i < thisList.size(); i++) {
                // create and append task
                const todoCard = generateTodoCard(thisList, i);
                list.appendChild(todoCard);
            }
        }
    
    }
    
    // creates and returns a "card" for the given Todo object
    const generateTodoCard = function(thisList, taskIndex) {
        const thisTodo = thisList.list[taskIndex]; // Todo object

        const todo = document.createElement("div"); // Todo card DOM element
        todo.classList.add("todo");
        // todo.classList.add(`index${taskIndex}`);

        const editButton = document.createElement("button");
        editButton.classList.add("edit-button");
        editButton.textContent = "edit";
        // event listeners for Edit button
        editButton.addEventListener("click", () => {
            const dialog = document.getElementById("edit-task-dialog");
            dialog.showModal();

            // show completed status options iff the task is marked completed
            if (thisList.list[taskIndex].completed) {
                dialog.querySelector(".edited-completed-status-form-container").style.visibility = "visible";
            }
        
            const overlay = document.querySelector(".modal-overlay");
            overlay.style.visibility = "visible";
        
            const listContainer = document.querySelector(".list-container");
            listContainer.style.visibility = "hidden";

            // fill current values into the form
            const titleField = document.getElementById("edited-task-title");
            titleField.value = thisTodo.title;
            const descriptionField = document.getElementById("edited-task-description");
            descriptionField.value = thisTodo.description;
            const dueDateField = document.getElementById("edited-task-due-date");
            dueDateField.value = formatDateYYYYMMDD(thisTodo.dueDate);
            
            // specific to priority
            const priorityIndex = thisTodo.priority - 1;
            const editTaskPriorityButtons = document.querySelectorAll(".styled-edited-priority-button");
            // briefly remove class here to avoid transition on load
            for (let i = 0; i < editTaskPriorityButtons.length; i++) {
                editTaskPriorityButtons[i].classList.remove("color-transition");
            }
            const priorityAsString = editTaskPriorityButtons[priorityIndex].classList[1];
            editTaskPriorityButtons[priorityIndex].style.backgroundColor = `var(--${priorityAsString}-priority-color)`;
            editTaskPriorityButtons[priorityIndex].childNodes[1].style.color = "white";
            editTaskPriorityButtons[priorityIndex].childNodes[0].setAttribute('checked', 'checked');
            for (let j = 0; j < editTaskPriorityButtons.length; j++) {
                if (j != priorityIndex) {
                    if (j == 0) {
                        editTaskPriorityButtons[j].style.backgroundColor = "white";
                        editTaskPriorityButtons[j].childNodes[1].style.color = "var(--high-priority-color)";
                        if (editTaskPriorityButtons[j].childNodes[0].hasAttribute('checked')) {
                            editTaskPriorityButtons[j].childNodes[0].removeAttribute('checked');
                        }
                    }
                    else if (j == 1) {
                        editTaskPriorityButtons[j].style.backgroundColor = "white";
                        editTaskPriorityButtons[j].childNodes[1].style.color = "var(--medium-priority-color)";
                        if (editTaskPriorityButtons[j].childNodes[0].hasAttribute('checked')) {
                            editTaskPriorityButtons[j].childNodes[0].removeAttribute('checked');
                        }
                    }
                    else if (j == 2) {
                        editTaskPriorityButtons[j].style.backgroundColor = "white";
                        editTaskPriorityButtons[j].childNodes[1].style.color = "var(--low-priority-color)";
                        if (editTaskPriorityButtons[j].childNodes[0].hasAttribute('checked')) {
                            editTaskPriorityButtons[j].childNodes[0].removeAttribute('checked');
                        }
                    }
                }
            }
            // add class back
            setTimeout(() => {
                for (let i = 0; i < editTaskPriorityButtons.length; i++) {
                    editTaskPriorityButtons[i].classList.add("color-transition");
                }
            }, 700);

            const editsForm = document.querySelector(".edit-task-form");
            editsForm.classList.add(`taskIndex${taskIndex}`);

            const submitEditsButton = document.querySelector(".submit-edited-task-form-button");
            submitEditsButton.addEventListener("click", function(event) {
                handleEditedTask(thisList, taskIndex, event);
            })

            // close dialog button
            const closeDialogButton = document.querySelector(".close-edit-dialog-button");
            closeDialogButton.addEventListener("click", () => {
                // reset form and close modal
                editsForm.reset();
                editsForm.classList.remove(editsForm.classList[1]);
                dialog.close();
                overlay.style.visibility = "hidden";
                listContainer.style.visibility = "visible";
                // if visible, reset completed status options to hidden and "completed" as selected
                if (dialog.querySelector(".edited-completed-status-form-container").style.visibility = "visible") {
                    hideAndResetCompletedStatusField();
                }

                // bandaid solution for now to avoid multiple event listeners for submit
                const form = document.querySelector(".edit-task-form");
                const oldSubmitButton = document.querySelector(".submit-edited-task-form-button");
                form.removeChild(oldSubmitButton);
                const newSubmitButton = document.createElement("button");
                newSubmitButton.classList.add("submit-edited-task-form-button");
                newSubmitButton.textContent = "Save";
                form.appendChild(newSubmitButton);
            })
        })
        todo.appendChild(editButton);
    
        const todoHeader = document.createElement("div");
        todoHeader.classList.add("todo-header");
        todo.appendChild(todoHeader);
    
        const todoTitle = document.createElement("div");
        todoTitle.classList.add("todo-title");
        todoHeader.appendChild(todoTitle);
        const title = document.createElement("h3");
        title.textContent = thisTodo.title;
        todoTitle.appendChild(title);
    
        const details = document.createElement("div");
        details.classList.add("details");
        todoHeader.appendChild(details);
        
        // PRIORITY COLORS AS WELL
        const priority = document.createElement("div");
        priority.classList.add("priority");
        const priorityNote = document.createElement("p");
        switch(true) {
            case thisTodo.priority == 1:
                priorityNote.textContent = "High Priority";
                priority.style.border = "1.5px solid var(--high-priority-color)";
                priorityNote.style.color = "var(--high-priority-color)";
                break;
            case thisTodo.priority == 2:
                priorityNote.textContent = "Medium Priority";
                priority.style.border = "1.5px solid var(--medium-priority-color)";
                priorityNote.style.color = "var(--medium-priority-color)";
                break;
            case thisTodo.priority == 3:
                priorityNote.textContent = "Low Priority";
                priority.style.border = "1.5px solid var(--low-priority-color)";
                priorityNote.style.color = "var(--low-priority-color)";
        }
        priority.appendChild(priorityNote);
        details.appendChild(priority);

        const dueDate = document.createElement("div");
        dueDate.classList.add("due-date");
        const dueDateNote = document.createElement("p");
        // HANDLE DUE DATE CASES MORE LATER (COLORS AND MESSAGE FORMATTING)
        dueDateNote.style.color = "rebeccapurple";
        dueDateNote.textContent = formatDueDateForDisplay(thisTodo.dueDate);
        dueDate.appendChild(dueDateNote);
        details.appendChild(dueDate);
    
        const description = document.createElement("p");
        description.classList.add("todo-description");
        description.textContent = thisTodo.description;
        todo.appendChild(description);
    
        const completedButton = document.createElement("button");
        completedButton.classList.add("completed-button");
        completedButton.textContent = "mark completed";
        todo.appendChild(completedButton);
        completedButton.addEventListener("click", () => {
            thisList.list[taskIndex].setCompleted();
            markCardCompleted(todo);
        })

        if (thisList.list[taskIndex].completed) {
            markCardCompleted(todo);
        }
        
        return todo;
    }

    const hideAndResetCompletedStatusField = function() {
        document.querySelector(".edited-completed-status-form-container").style.visibility = "hidden";
        const completedButton = document.querySelector(".styled-edited-completed-button");
        const incompleteButton = document.querySelector(".styled-edited-incomplete-button");
        completedButton.style.backgroundColor = "rgb(47, 181, 93)";
        completedButton.childNodes[1].style.color = "white";
        completedButton.childNodes[0].setAttribute('checked', 'checked');
        incompleteButton.style.backgroundColor = "white";
        incompleteButton.childNodes[1].style.color = "rgb(47, 181, 93)";
        if (incompleteButton.childNodes[0].hasAttribute('checked')) {
            incompleteButton.childNodes[0].removeAttribute('checked');
        }
    }

    // this clear everything in id="content"
    const clearContent = function() {
        const content = document.getElementById("content");
        for (let i = content.childNodes.length - 1; i >= 0; i--) {
            content.removeChild(content.childNodes[i]);
        }
    }

    // this clears and updates the list itself (list title and options buttons stay)
    const refreshList = function(thisList) {
        const listContainer = document.querySelector(".list-container");
        const list = listContainer.querySelector(".list");
        listContainer.removeChild(list);

        const refreshedlist = document.createElement("div");
        refreshedlist.classList.add("list");
        listContainer.appendChild(refreshedlist);
    
        // display message if there are no tasks
        if (thisList.size() == 0) {
            const messageContainer = document.createElement("div");
            messageContainer.classList.add("empty-list-message");
            const message = document.createElement("h2");
            message.textContent = "You're all caught up! Go enjoy the sun!☀️";
            messageContainer.appendChild(message);
            refreshedlist.appendChild(messageContainer);
        }
        else {
            for (let i = 0; i < thisList.size(); i++) {
                // create and append task
                const todoCard = generateTodoCard(thisList, i);
                refreshedlist.appendChild(todoCard);
            }
        }

        // add sort toggle button if list was just sorted (the first time - doesn't duplicate buttons)
        if (listContainer.classList.contains("sorted") && !document.getElementById("sort-toggle-button")) {
            const sortToggleButton = document.createElement("button");
            sortToggleButton.id = "sort-toggle-button";
            const arrowImage = document.createElement("img");
            arrowImage.src = downArrowIcon;
            sortToggleButton.appendChild(arrowImage);
            const listOptions = document.querySelector(".list-options")
            listOptions.appendChild(sortToggleButton);
            sortToggleButton.addEventListener("click", function () {
                handleSortToggle(thisList);
            });
        }
    }

    // Here, this = thisList, via handleAddedTask.bind(thisList)
    const handleAddedTask = function(event) {
        event.preventDefault();

        // retrieve info
        const newTitle = document.getElementById("new-task-title").value;
        const newDescription = document.getElementById("new-task-description").value;
        let newDueDate = document.getElementById("new-task-due-date").value;
        newDueDate = formatDateFromInput(newDueDate);
        const newPriority = document.querySelector('input[name="priority"]:checked').value;
      
        // create new Todo object and add to List
        const newTodo = new Todo(newTitle, newDescription, newDueDate, newPriority);
        this.add(newTodo); // "this" references "thisList"
        
        // add to list display
        refreshList(this);

        // close dialog and reset form
        const form = document.querySelector(".add-new-task-form");
        form.reset();
        const dialog = document.getElementById("add-new-task-dialog");
        dialog.close();
        const overlay = document.querySelector(".modal-overlay");
        overlay.style.visibility = "hidden";
        const listContainer = document.querySelector(".list-container");
        listContainer.style.visibility = "visible";

        // bandaid solution for now to avoid duplicate event listeners, was causing problems
        const oldSubmitNewTaskButton = document.querySelector(".submit-new-task-form-button");
        form.removeChild(oldSubmitNewTaskButton);
        const newSubmitNewTaskButton = document.createElement("button");
        newSubmitNewTaskButton.classList.add("submit-new-task-form-button");
        newSubmitNewTaskButton.textContent = "Add";
        form.appendChild(newSubmitNewTaskButton);
    }

    // Here, this = thisList, via handleEditedTask.bind(thisList)
    const handleEditedTask = function(thisList, taskIndex, event) {
        event.preventDefault();

        // retrieve info
        const editedTitle = document.getElementById("edited-task-title").value;
        const editedDescription = document.getElementById("edited-task-description").value;
        const editedDueDate = document.getElementById("edited-task-due-date").value;
        const editedPriority = document.querySelector('input[name="edited-priority"]:checked').value;

        // update Todo Object in the List
        thisList.list[taskIndex].title = editedTitle;
        thisList.list[taskIndex].description = editedDescription;
        thisList.list[taskIndex].dueDate = formatDateFromInput(editedDueDate);
        thisList.list[taskIndex].priority = editedPriority;
        // updated completed status if it was changed to incomplete
        const incompleteStatusInput = document.getElementById("edited-incomplete-button");
        if (incompleteStatusInput.hasAttribute('checked')) {
            thisList.list[taskIndex].completed = false;
            hideAndResetCompletedStatusField();
        }
        storageHandler.updateLocalStorage();

        // reset form, close modal, and refresh list
        const editsForm = document.querySelector(".edit-task-form");
        editsForm.reset();
        const dialog = document.getElementById("edit-task-dialog");
        dialog.close();
        const overlay = document.querySelector(".modal-overlay");
        overlay.style.visibility = "hidden";
        const listContainer = document.querySelector(".list-container");
        listContainer.style.visibility = "visible";
        refreshList(thisList);

        // bandaid solution for now to avoid duplicate event listeners, was causing problems
        const oldSubmitEditsButton = document.querySelector(".submit-edited-task-form-button");
        editsForm.removeChild(oldSubmitEditsButton);
        const newSubmitEditsButton = document.createElement("button");
        newSubmitEditsButton.classList.add("submit-edited-task-form-button");
        newSubmitEditsButton.textContent = "Save";
        editsForm.appendChild(newSubmitEditsButton);
    }

    const displayMyLists = function() {
        clearContent();

        const content = document.getElementById("content");
        const myListsContainer = document.createElement("div");
        myListsContainer.classList.add("my-lists-container");
        content.appendChild(myListsContainer);
        const myListsHeader = document.createElement("h2");
        myListsHeader.textContent = "My Lists";
        myListsContainer.appendChild(myListsHeader);

        // options buttons
        const myListOptions = document.createElement("div");
        myListOptions.classList.add("my-list-options");
        const newListButton = document.createElement("button");
        newListButton.classList.add("new-list-button");
        newListButton.textContent = "New List";
        myListOptions.appendChild(newListButton);
        newListButton.addEventListener("click", () => {
            const dialog = document.getElementById("add-new-list-dialog");
            dialog.showModal();
            const title = document.getElementById("new-list-title");
            title.focus();
        
            const overlay = document.querySelector(".modal-overlay");
            overlay.style.visibility = "visible";

            content.style.visibility = "hidden";

            const closeDialogButton = document.querySelector(".close-new-list-dialog-button");
            closeDialogButton.addEventListener("click", () => {
                dialog.close();
                overlay.style.visibility = "hidden";
                content.style.visibility = "visible";
            })

            const submitButton = document.querySelector(".submit-new-list-button");
            submitButton.addEventListener("click", handleCreateNewList);
        });

        myListsContainer.appendChild(myListOptions);
        const settingsButton = document.createElement("button");
        settingsButton.classList.add("my-list-settings-button");
        const cogImageElement = document.createElement("img");
        cogImageElement.style.width = "100%";
        cogImageElement.style.height = "100%";
        cogImageElement.src = cogIcon;
        cogImageElement.style.fill = "green";
        cogImageElement.style.filter = "drop-shadow(1px 1px 1px rgb(0 0 0 / 0.4))";
        settingsButton.appendChild(cogImageElement);
        myListsContainer.appendChild(settingsButton);
        settingsButton.addEventListener("click", openMyListSettings);

        // lists
        const listCollection = document.createElement("div");
        listCollection.classList.add("my-lists");
        myListsContainer.appendChild(listCollection);

        for (let i = 0; i < myLists.length; i++) {
            const curList = myLists[i];

            const listCard = document.createElement("div");
            listCard.classList.add("list-card");
            const listTitle = document.createElement("h3");
            listTitle.classList.add("list-card-title");
            listTitle.style.backgroundColor = getListColor(curList.title);
            listTitle.textContent = curList.title;
            listCard.appendChild(listTitle);
            const progress = document.createElement("p");
            progress.classList.add("list-progress");
            progress.textContent = `${curList.getCompleted()} / ${curList.size()} tasks completed`;
            listCard.appendChild(progress);
            listCollection.appendChild(listCard);

            listCard.addEventListener("click", () => {
                if (!document.querySelector(".edit-list-button")) {
                    displayList(myLists[i]);
                }
            })
        }
    }

    const refreshMyLists = function() {
        const listCollection = document.querySelector(".my-lists");
        // clear list collection
        for (let i = listCollection.childNodes.length - 1; i >= 0 ; i--) {
            listCollection.removeChild(listCollection.childNodes[i]);
        }
        // re-add updated cards
        for (let i = 0; i < myLists.length; i++) {
            const curList = myLists[i];

            const listCard = document.createElement("div");
            listCard.classList.add("list-card");
            const listTitle = document.createElement("h3");
            listTitle.classList.add("list-card-title");
            listTitle.textContent = curList.title;
            listCard.appendChild(listTitle);
            const progress = document.createElement("p");
            progress.classList.add("list-progress");
            progress.textContent = `${curList.getCompleted()} / ${curList.size()} tasks completed`;
            listCard.appendChild(progress);
            listCollection.appendChild(listCard);

            listCard.addEventListener("click", () => {
                if (!document.querySelector(".edit-list-button")) {
                    displayList(myLists[i]);
                }
            })
        }
    }

    const openMyListSettings = function() {
        const myListContainer = document.querySelector(".my-lists-container");
        myListContainer.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        const cogButton = document.querySelector(".my-list-settings-button");
        // cogButton.style.zIndex = "1000";
        // cogButton.childNodes[0].src = whiteCogIcon;

        const listCards = document.querySelectorAll(".list-card");
        for (let i = 0; i < listCards.length; i++) {
            const overlay = document.createElement("div");
            overlay.classList.add("my-list-settings-overlay");
            listCards[i].appendChild(overlay);
            listCards[i].style.boxShadow = "2px 2px 4px 2px rgba(0, 0, 0, 0.4)";
            listCards[i].removeChild(listCards[i].childNodes[1]);
            listCards[i].childNodes[0].style.zIndex = "150";
            // listCards[i].childNodes[0].style.background = "linear-gradient(to bottom right, rgba(85, 85, 85, 0.356), 0.7%, rgba(255, 255, 255, 0.8))";
            myListContainer.childNodes[0].textContent = "Edit";
            myListContainer.childNodes[0].style.padding = "0px 22px";
            const newListButton = document.querySelector(".new-list-button");
            newListButton.style.visibility = "hidden";
            // create edit button
            const editListButton = document.createElement("button");
            editListButton.classList.add("edit-list-button");
            editListButton.appendChild(document.createElement("h4"));
            editListButton.childNodes[0].textContent = "Edit";
            editListButton.addEventListener("click", function () {
                openEditListDialog(i);
            })
            const editIconImage = document.createElement("img");
            editIconImage.src = editIcon;
            editListButton.style.zIndex = "200";
            editListButton.style.boxShadow = "2px 2px 4px 2px rgba(0, 0, 0, 0.4)";
            editIconImage.style.width = "50%";
            editIconImage.style.height = "50%";
            editListButton.appendChild(editIconImage);
            listCards[i].appendChild(editListButton);
        }

        cogButton.addEventListener("click", displayMyLists);
    }

    const openEditListDialog = function(listIndex) {
        const dialog = document.getElementById("edit-list-dialog");
        dialog.showModal();
    
        const overlay = document.querySelector(".modal-overlay");
        overlay.style.visibility = "visible";

        const myListsContainer = document.querySelector(".my-lists-container");
        myListsContainer.style.visibility = "hidden";

        const listTitleHeader = document.querySelector(".edit-list-title");
        listTitleHeader.textContent = myLists[listIndex].title;

        // BUTTONS
        const renameListButton = dialog.querySelector(".rename-list-button");
        renameListButton.classList.add(`index${listIndex}`);
        const homeListButton = dialog.querySelector(".home-list-button");
        homeListButton.classList.add(`index${listIndex}`);
        const removeListButton = dialog.querySelector(".remove-list-button");
        removeListButton.classList.add(`index${listIndex}`);

        if (listIndex == 0) {
            const homeListIcon = document.querySelector(".home-list-icon");
            homeListIcon.style.visibility = "visible";

            homeListButton.style.background = "linear-gradient(to bottom right, rgba(0, 0, 0, 0.198), 5%, rgb(77, 139, 190))";
            homeListButton.style.border = "none";
            homeListButton.style.color = "white";
            homeListButton.childNodes[0].textContent = "Home List"; // span contains the text
            homeListButton.style.fontWeight = "600";
        }
        else {
            homeListButton.style.fontWeight = null;
        }

        // EVENT LISTENERS FOR EDITING BUTTONS
        renameListButton.addEventListener("click", handleClickRenameListButton);
        homeListButton.addEventListener("click", handleClickHomeListButton);
        removeListButton.addEventListener("click", confirmRemoveList);
        listTitleHeader.addEventListener("click", handleClickRenameListButton);

        const doneButton = document.querySelector(".submit-edit-list-button");
        doneButton.addEventListener("click", handleSubmitEditedList);

        const closeDialogButton = document.querySelector(".close-edit-list-dialog-button");
        closeDialogButton.addEventListener("click", () => {
            dialog.close();
            overlay.style.visibility = "hidden";
            myListsContainer.style.visibility = "visible";

            removeListButton.classList.remove(`index${listIndex}`);
            homeListButton.classList.remove(`index${listIndex}`);
            renameListButton.classList.remove(`index${listIndex}`);
            const homeListIcon = document.querySelector(".home-list-icon");
            homeListIcon.style.visibility = "hidden";

            homeListButton.style.background = null;
            homeListButton.style.border = null;
            homeListButton.style.color = null;
            homeListButton.style.fontWeight = null;
            homeListButton.childNodes[0].textContent = "Set Home List";

            // remove event listeners
            renameListButton.removeEventListener("click", handleClickRenameListButton);
            homeListButton.removeEventListener("click", handleClickHomeListButton);
            removeListButton.removeEventListener("click", confirmRemoveList);
            listTitleHeader.removeEventListener("click", handleClickRenameListButton);

            // avoid multiple event listeners for submit
            doneButton.removeEventListener("click", handleSubmitEditedList);
            

            if (homeListButton.classList.contains("home-list-updated")) {
                homeListButton.classList.remove("home-list-updated");
                displayMyLists();
                openMyListSettings();
            }

            if (renameListButton.classList.contains("title-updated")) {
                renameListButton.classList.remove("title-updated");
                displayMyLists();
                openMyListSettings();
            }

            if (document.querySelector(".confirm-remove-container")) {
                const editListInfo = document.querySelector(".edit-list-info");
                const confirmRemoveContainer = document.querySelector(".confirm-remove-container");
                editListInfo.removeChild(confirmRemoveContainer);
                removeListButton.style.visibility = "visible";
            }
        })

    }

    const handleSubmitEditedList = function(event) {
        event.preventDefault();

        const dialog = document.getElementById("edit-list-dialog");
        dialog.close();
        const overlay = document.querySelector(".modal-overlay");
        overlay.style.visibility = "hidden";
        const myListsContainer = document.querySelector(".my-lists-container");
        myListsContainer.style.visibility = "visible";

        const removeListButton = dialog.querySelector(".remove-list-button");
        const homeListButton = dialog.querySelector(".home-list-button");
        const renameListButton = dialog.querySelector(".rename-list-button");

        if (homeListButton.classList.contains("home-list-updated")) {
            homeListButton.classList.remove("home-list-updated");
        }
        if (renameListButton.classList.contains("title-updated")) {
            renameListButton.classList.remove("title-updated");
        }

        const curListIndex = parseInt(renameListButton.classList[1].substring(5));
        removeListButton.classList.remove(`index${curListIndex}`);
        homeListButton.classList.remove(`index${curListIndex}`);
        renameListButton.classList.remove(`index${curListIndex}`);
        const homeListIcon = document.querySelector(".home-list-icon");
        homeListIcon.style.visibility = "hidden";

        homeListButton.style.background = null;
        homeListButton.style.border = null;
        homeListButton.style.color = null;
        homeListButton.style.fontWeight = null;
        homeListButton.childNodes[0].textContent = "Set Home List";

        renameListButton.removeEventListener("click", handleClickRenameListButton);
        homeListButton.removeEventListener("click", handleClickHomeListButton);
        removeListButton.removeEventListener("click", confirmRemoveList);
        const listTitleHeader = document.querySelector(".edit-list-title");
        listTitleHeader.removeEventListener("click", handleClickRenameListButton);

        if (document.querySelector(".confirm-remove-container")) {
            const editListInfo = document.querySelector(".edit-list-info");
            const confirmRemoveContainer = document.querySelector(".confirm-remove-container");
            editListInfo.removeChild(confirmRemoveContainer);
            removeListButton.style.visibility = "visible";
        }

        displayMyLists();
    }

    const handleClickRenameListButton = function() {
        const form = document.querySelector(".edit-list-form");
        const titleHeader = document.querySelector(".edit-list-title");
        const originalTitle = titleHeader.textContent;

        const editTitleInput = document.createElement("input");
        editTitleInput.setAttribute("type", "text");
        editTitleInput.id = "edit-title-input";
        editTitleInput.setAttribute("name", "edited-title-input");
        editTitleInput.value = originalTitle;

        form.insertBefore(editTitleInput, titleHeader);
        form.removeChild(titleHeader);

        editTitleInput.focus();
        editTitleInput.select();

        editTitleInput.addEventListener("focusout", () => {
            const updatedTitle = editTitleInput.value;

            titleHeader.textContent = updatedTitle;
            form.insertBefore(titleHeader, editTitleInput);
            form.removeChild(editTitleInput);

            // update actual list in myLists
            const renameListButton = document.querySelector(".rename-list-button");
            const curListIndex = parseInt(renameListButton.classList[1].substring(5));
            // myLists[curListIndex].title = updatedTitle;
            myLists[curListIndex].setTitle(updatedTitle);
            
            if (!renameListButton.classList.contains("title-updated")) {
                renameListButton.classList.add("title-updated");
            }
        })
    }

    const handleClickHomeListButton = function() {
        const homeListIcon = document.querySelector(".home-list-icon");

        // if already selected
        if (homeListIcon.style.visibility == "visible") {
            const selectedMessage = document.querySelector(".home-list-selected-text");
            selectedMessage.style.opacity = "1";
            setTimeout(() => {
                selectedMessage.style.opacity = "0";
            }, 1750)
        }
        // not yet selected
        else {
            // styling change
            homeListIcon.style.visibility = "visible";
            const homeListButton = document.querySelector(".home-list-button");
            homeListButton.style.background = "linear-gradient(to bottom right, rgba(0, 0, 0, 0.198), 5%, rgb(77, 139, 190))";
            homeListButton.style.border = "none";
            homeListButton.style.color = "white";
            homeListButton.style.fontWeight = "600";
            homeListButton.childNodes[0].textContent = "Home List"; // span contains the text

            // set this list to index 0 (location for home list) in myLists
            const curListIndex = parseInt(homeListButton.classList[1].substring(5));
            updateHomeList(curListIndex);
            homeListButton.classList.add("home-list-updated");
        }
    }

    const confirmRemoveList = function() {
        const editListInfo = document.querySelector(".edit-list-info");
        const removeListButton = editListInfo.querySelector(".remove-list-button");

        const confirmRemoveContainer = document.createElement("div");
        confirmRemoveContainer.classList.add("confirm-remove-container");
        const confirmRemoveButton = document.createElement("button");
        confirmRemoveButton.setAttribute("type", "button");
        confirmRemoveButton.textContent = "Confirm Remove";
        confirmRemoveContainer.appendChild(confirmRemoveButton);
        const cancelRemoveButton = document.createElement("button");
        cancelRemoveButton.textContent = "Cancel";
        confirmRemoveContainer.appendChild(cancelRemoveButton);

        editListInfo.insertBefore(confirmRemoveContainer, removeListButton);
        removeListButton.style.visibility = "hidden";

        confirmRemoveButton.addEventListener("click", () => {
            const editListInfo = document.querySelector(".edit-list-info");
            const confirmRemoveContainer = document.querySelector(".confirm-remove-container");
            editListInfo.removeChild(confirmRemoveContainer);
            const removeListButton = editListInfo.querySelector(".remove-list-button");
            removeListButton.style.visibility = "visible";
            handleClickRemoveListButton();
        })

        cancelRemoveButton.addEventListener("click", () => {
            const editListInfo = document.querySelector(".edit-list-info");
            const confirmRemoveContainer = document.querySelector(".confirm-remove-container");
            editListInfo.removeChild(confirmRemoveContainer);
            const removeListButton = editListInfo.querySelector(".remove-list-button");
            removeListButton.style.visibility = "visible";
        });
    }

    const handleClickRemoveListButton = function() {        
        const removeListButton = document.querySelector(".remove-list-button");
        const indexToRemove = parseInt(removeListButton.classList[1].substring(5));
        removeList(indexToRemove); // function from display.js

        removeListButton.classList.remove(`index${indexToRemove}`);
        removeListButton.removeEventListener("click", handleClickRemoveListButton);
        displayMyLists();

        const dialog = document.getElementById("edit-list-dialog");
        dialog.close();
        const overlay = document.querySelector(".modal-overlay");
        overlay.style.visibility = "hidden";
    }

    const handleCreateNewList = function(event) {
        event.preventDefault();

        const newListTitle = document.getElementById("new-list-title").value;
        const newList = new TodoList(newListTitle);
        myLists.push(newList);
        storageHandler.updateLocalStorage();

        // reset form, close modal, and refresh myLists page
        const form = document.querySelector(".add-new-list-form");
        form.reset();
        const dialog = document.getElementById("add-new-list-dialog");
        dialog.close();
        const overlay = document.querySelector(".modal-overlay");
        overlay.style.visibility = "hidden";
        const content = document.getElementById("content");
        content.style.visibility = "visible";
        clearContent();
        displayMyLists();
    }

    const handleSortSelection = function(event, todoList) {
        const listContainer = document.querySelector(".list-container");
        listContainer.classList.add("sorted");

        const sortType = event.target.value;
        switch(true) {
            case sortType == 'priority-sort':
                todoList.sortByPriority("high");
                listContainer.classList.add("sorted-priority-high");
                break;
            case sortType == 'due-date-sort':
                todoList.sortByDueDate("earliest");
                listContainer.classList.add("sorted-due-date-high");
                break;
            case sortType == 'completed-status-sort':
                todoList.sortByCompletedStatus("completed");
                listContainer.classList.add("sorted-completed-high");
                break;
        }
        // if this isn't the first sort (toggle button is present), point arrow down
        if (document.getElementById("sort-toggle-button")) {
            const arrowIcon = document.getElementById("sort-toggle-button").childNodes[0];
            arrowIcon.src = downArrowIcon;
        }

        refreshList(todoList);
    }

    const handleSortToggle = function(todoList) {
        const listContainer = document.querySelector(".list-container");
        const currentSort = listContainer.classList[listContainer.classList.length - 1];
        // loop fixes bug of multiple sort type classes being present when switching sort types
        for (let i = 2; i < listContainer.classList.length; i++) {
            listContainer.classList.remove(listContainer.classList[i]);
        }
        const arrowIcon = document.getElementById("sort-toggle-button").childNodes[0];

        switch(true) {
            case currentSort == "sorted-priority-high":
                arrowIcon.src = upArrowIcon;
                todoList.sortByPriority("low");
                listContainer.classList.add("sorted-priority-low");
                break;
            case currentSort == "sorted-priority-low":
                arrowIcon.src = downArrowIcon;
                todoList.sortByPriority("high");
                listContainer.classList.add("sorted-priority-high");
                break;
            case currentSort == "sorted-due-date-high":
                arrowIcon.src = upArrowIcon;
                todoList.sortByDueDate("latest");
                listContainer.classList.add("sorted-due-date-low");
                break;
            case currentSort == "sorted-due-date-low":
                arrowIcon.src = downArrowIcon;
                todoList.sortByDueDate("earliest");
                listContainer.classList.add("sorted-due-date-high");
                break;
            case currentSort == "sorted-completed-high":
                arrowIcon.src = upArrowIcon;
                todoList.sortByCompletedStatus("incomplete");
                listContainer.classList.add("sorted-completed-low");
                break;
            case currentSort == "sorted-completed-low":
                arrowIcon.src = downArrowIcon;
                todoList.sortByCompletedStatus("completed");
                listContainer.classList.add("sorted-completed-high");
                break;
        }
        refreshList(todoList);
    }

    const markCardCompleted = function(card) {
        card.classList.add("color-transition");
        card.style.background = "rgb(47, 181, 93)";
        card.style.color = "white";
        const details = card.querySelector(".details");
        details.style.visibility = "hidden";
        const completedButton = card.querySelector(".completed-button");
        card.removeChild(completedButton);
        const completedMessage = document.createElement("p");
        completedMessage.style.gridColumn = "2";
        completedMessage.style.gridRow = "3";
        completedMessage.textContent = "Completed";
        completedMessage.style.border = "1px solid white";
        completedMessage.style.padding = "2px 10px";
        completedMessage.style.textShadow = "1px 1px 1px rgba(0, 0, 0, 0.68)";
        card.appendChild(completedMessage);
        card.querySelector(".todo-header").style.textShadow = "1px 1px 1px rgba(0, 0, 0, 0.68)";
        card.querySelector(".todo-description").style.textShadow = "1px 1px 1px rgba(0, 0, 0, 0.68)";
        const completedCheckMark = document.createElement("h6");
        completedCheckMark.classList.add("completed-check-mark");
        completedCheckMark.textContent = "✓";
        card.insertBefore(completedCheckMark, card.querySelector(".edit-button"));
    }

    const displaySettings = function() {
        clearContent();

        const content = document.getElementById("content");
        const settingsContainer = document.createElement("div");
        settingsContainer.classList.add("settings-container");
        content.appendChild(settingsContainer);

        const wallpapersSection = document.createElement("div");
        wallpapersSection.classList.add("wallpapers-section");
        settingsContainer.appendChild(wallpapersSection);
        const wallpaperCollectionTitle = document.createElement("h3");
        wallpaperCollectionTitle.textContent = "Wallpaper";
        wallpapersSection.appendChild(wallpaperCollectionTitle);

        const wallpapersCollection = document.createElement("div");
        wallpapersCollection.classList.add("wallpapers-collection");
        wallpapersSection.appendChild(wallpapersCollection);

        /////////////////////////////////

        for (let i = 0; i < wallpapersList.length; i++) {
            const wallpaperContainer = document.createElement("div");
            wallpaperContainer.classList.add("wallpaper");
            const wallpaperImage = document.createElement("img");
            wallpaperImage.src = wallpapersList[i][1];
            wallpaperContainer.appendChild(wallpaperImage);
            const wallpaperName = document.createElement("p");
            wallpaperName.textContent = wallpapersList[i][0];
            wallpaperContainer.appendChild(wallpaperName);

            wallpaperContainer.addEventListener("click", updateWallpaper);
            wallpapersCollection.appendChild(wallpaperContainer);

            // highlight current wallpaper on preferences display
            const selectedWallpaperName = storageHandler.retrieveSelectedWallpaper();
            if (wallpapersList[i][0] == selectedWallpaperName) {
                wallpaperContainer.classList.add("selected-wallpaper");
            }
        }
    }

    // 'this' refers to the wallpaperContainer div holding the wallpaper image and name
    const updateWallpaper = function() {
        const wallpaperName = this.childNodes[1].textContent;
        const wallpaperImage = this.childNodes[0].src;

        // set background
        const background = document.querySelector(".background");
        background.style.background = `url(${wallpaperImage})`;
        background.style.backgroundSize = "cover";
        background.style.backgroundPosition = "center";

        // change selected wallpaper on preferences display
        const oldWallpaper = document.querySelector(".selected-wallpaper");
        oldWallpaper.classList.remove("selected-wallpaper");
        this.classList.add("selected-wallpaper");

        // update selected wallpaper in localStorage (key is wallpaper name)
        localStorage.setItem('curWallpaper', wallpaperName);
    }

    return {headerStartup, displayList};
})();

export default display;