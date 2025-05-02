import Todo from "./Todo.js";
import TodoList from "./TodoList.js";
import { myLists } from "./index.js";
import { formatDateFromInput, formatDateYYYYMMDD, formatDueDateForDisplay } from "./format-date.js";
import cogIcon from "./cog.svg";
import homeIcon from "./home.svg";
import tuneIcon from "./tune.svg";
import downArrowIcon from "./down-arrow-icon.svg";
import upArrowIcon from "./up-arrow-icon.svg";

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
                }
                else if (i == 0) {
                    navButton.id = "nav-settings-button";
                    const tuneImageElement = document.createElement("img");
                    tuneImageElement.src = tuneIcon;
                    tuneImageElement.style.width = "60%";
                    tuneImageElement.style.height = "60%";
                    tuneImageElement.style.filter = "drop-shadow(1.5px 1.5px 1px rgb(0 0 0 / 0.4))";
                    navButton.appendChild(tuneImageElement);
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
        title.textContent = thisList.title;
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
            listContainer.appendChild(messageContainer);
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
            listContainer.appendChild(messageContainer);
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
            sortToggleButton.addEventListener("click", handleSortToggle);
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
        settingsButton.addEventListener("click", () => {
            prompt("hi");
        })


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
            listTitle.textContent = curList.title;
            listCard.appendChild(listTitle);
            const progress = document.createElement("p");
            progress.classList.add("list-progress");
            progress.textContent = `${curList.getCompleted()} / ${curList.size()} tasks completed`;
            listCard.appendChild(progress);
            listCollection.appendChild(listCard);

            listCard.addEventListener("click", () => {
                displayList(myLists[i]);
            })
        }
    }

    const handleCreateNewList = function(event) {
        event.preventDefault();

        const newListTitle = document.getElementById("new-list-title").value;
        const newList = new TodoList(newListTitle);
        myLists.push(newList);

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
        const sortType = event.target.value;
        switch(true) {
            case sortType == 'priority-sort':
                todoList.sortByPriority("high");
                break;
            case sortType == 'due-date-sort':
                todoList.sortByDueDate("earliest");
                break;
            case sortType == 'completed-status-sort':
                todoList.sortByCompletedStatus("completed");
                break;
        }
        const listContainer = document.querySelector(".list-container");
        listContainer.classList.add("sorted");
        refreshList(todoList);
    }

    const handleSortToggle = function() {
        
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

    return {headerStartup, displayList};
})();

export default display;