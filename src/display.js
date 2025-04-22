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
    }
    
    const displayList = function(thisList) {
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
                const todoCard = generateTodoCard(thisList.list[i]);
                list.appendChild(todoCard);
            }
        }
    
    }
    
    // creates and returns a "card" for the given Todo object
    const generateTodoCard = function(thisTodo) {
        const todo = document.createElement("div");
        todo.classList.add("todo");
    
        const todoHeader = document.createElement("div");
        todoHeader.classList.add("todo-header");
        todo.appendChild(todoHeader);
    
        const todoTitle = document.createElement("div");
        todoTitle.classList.add("todo-title");
        todoHeader.appendChild(todoTitle);
        const title = document.createElement("h3");
        title.textContent = thisTodo.title;
        todoTitle.appendChild(title);
        const editButton = document.createElement("button");
        editButton.classList.add("edit-button");
        editButton.textContent = "edit";
        todoTitle.appendChild(editButton);
    
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
        priorityNote.style.color = "rgb(43, 164, 92)";
        switch(true) {
            case thisTodo.priority == 1:
                priorityNote.textContent = "High Priority";
                break;
            case thisTodo.priority == 2:
                priorityNote.textContent = "Medium Priority";
                break;
            case thisTodo.priority == 3:
                priorityNote.textContent = "Low Priority";
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

    return {headerStartup, displayList};
})();

export default display;