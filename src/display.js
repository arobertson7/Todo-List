import Todo from "./Todo.js";
import TodoList from "./TodoList.js";
import { myLists } from "./index.js";

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
            }
    
            nav.childNodes[2].textContent = "My Lists";
            nav.childNodes[2].addEventListener("click", displayMyLists);
    
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
                for (let j = 0; j < addTaskPriorityButtons.length; j++) {
                    if (addTaskPriorityButtons[j] != addTaskPriorityButtons[i]) {
                        if (j == 0) {
                            addTaskPriorityButtons[j].style.backgroundColor = "white";
                            addTaskPriorityButtons[j].childNodes[1].style.color = "var(--high-priority-color)";
                        }
                        else if (j == 1) {
                            addTaskPriorityButtons[j].style.backgroundColor = "white";
                            addTaskPriorityButtons[j].childNodes[1].style.color = "var(--medium-priority-color)";
                        }
                        else if (j == 2) {
                            addTaskPriorityButtons[j].style.backgroundColor = "white";
                            addTaskPriorityButtons[j].childNodes[1].style.color = "var(--low-priority-color)";
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
                for (let j = 0; j < editTaskPriorityButtons.length; j++) {
                    if (editTaskPriorityButtons[j] != editTaskPriorityButtons[i]) {
                        if (j == 0) {
                            editTaskPriorityButtons[j].style.backgroundColor = "white";
                            editTaskPriorityButtons[j].childNodes[1].style.color = "var(--high-priority-color)";
                        }
                        else if (j == 1) {
                            editTaskPriorityButtons[j].style.backgroundColor = "white";
                            editTaskPriorityButtons[j].childNodes[1].style.color = "var(--medium-priority-color)";
                        }
                        else if (j == 2) {
                            editTaskPriorityButtons[j].style.backgroundColor = "white";
                            editTaskPriorityButtons[j].childNodes[1].style.color = "var(--low-priority-color)";
                        }
                    }
                }
            })
        }
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

        const sortTasksButton = document.createElement("button");
        sortTasksButton.classList.add("sort-tasks-button");
        sortTasksButton.textContent = "Sort By";
        listOptions.appendChild(addTaskButton);
        listOptions.appendChild(sortTasksButton);
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

        const editButton = document.createElement("button");
        editButton.classList.add("edit-button");
        editButton.textContent = "edit";
        // event listeners for Edit button
        editButton.addEventListener("click", () => {
            const dialog = document.getElementById("edit-task-dialog");
            dialog.showModal();
        
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
            dueDateField.value = thisTodo.dueDate;
            
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
            for (let j = 0; j < editTaskPriorityButtons.length; j++) {
                if (j != priorityIndex) {
                    if (j == 0) {
                        editTaskPriorityButtons[j].style.backgroundColor = "white";
                        editTaskPriorityButtons[j].childNodes[1].style.color = "var(--high-priority-color)";
                    }
                    else if (j == 1) {
                        editTaskPriorityButtons[j].style.backgroundColor = "white";
                        editTaskPriorityButtons[j].childNodes[1].style.color = "var(--medium-priority-color)";
                    }
                    else if (j == 2) {
                        editTaskPriorityButtons[j].style.backgroundColor = "white";
                        editTaskPriorityButtons[j].childNodes[1].style.color = "var(--low-priority-color)";
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

            // close dialog button
            const closeDialogButton = document.querySelector(".close-edit-dialog-button");
            closeDialogButton.addEventListener("click", () => {
                // reset form and close modal
                editsForm.reset();
                editsForm.classList.remove(editsForm.classList[1]);
                dialog.close();
                overlay.style.visibility = "hidden";
                listContainer.style.visibility = "visible";
            })

            const submitEditsButton = document.querySelector(".submit-edited-task-form-button");
            submitEditsButton.addEventListener("click", function(event) {
                handleEditedTask(thisList, taskIndex, event);
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
        const dueDate = document.createElement("div");
        dueDate.classList.add("due-date");
        const dueDateNote = document.createElement("p");
        // HANDLE DUE DATE CASES MORE LATER (COLORS AND MESSAGE FORMATTING)
        dueDateNote.style.color = "rebeccapurple";
        dueDateNote.textContent = thisTodo.dueDate;
        dueDate.appendChild(dueDateNote);
        details.appendChild(dueDate);
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
    
        const description = document.createElement("p");
        description.textContent = thisTodo.description;
        todo.appendChild(description);
    
        const completedButton = document.createElement("button");
        completedButton.classList.add("completed-button");
        completedButton.textContent = "mark completed";
        todo.appendChild(completedButton);
        
        return todo;
    }

    const clearContent = function() {
        const content = document.getElementById("content");
        for (let i = content.childNodes.length - 1; i >= 0; i--) {
            content.removeChild(content.childNodes[i]);
        }
    }

    // Here, this = thisList, via handleAddedTask.bind(thisList)
    const handleAddedTask = function(event) {
        event.preventDefault();

        // retrieve info
        const newTitle = document.getElementById("new-task-title").value;
        const newDescription = document.getElementById("new-task-description").value;
        const newDueDate = document.getElementById("new-task-due-date").value;
        const newPriority = document.querySelector('input[name="priority"]:checked').value;
      
        // create new Todo object and add to List
        const newTodo = new Todo(newTitle, newDescription, newDueDate, newPriority);
        this.add(newTodo); // "this" references "thisList"
        
        // add to list display
        clearContent();
        displayList(this);

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
        thisList.list[taskIndex].dueDate = editedDueDate;
        thisList.list[taskIndex].priority = editedPriority;

        // reset form, close modal, and refresh list
        const editsForm = document.querySelector(".edit-task-form");
        editsForm.reset();
        const dialog = document.getElementById("edit-task-dialog");
        dialog.close();
        const overlay = document.querySelector(".modal-overlay");
        overlay.style.visibility = "hidden";
        clearContent();
        displayList(thisList);

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

    return {headerStartup, displayList};
})();

export default display;