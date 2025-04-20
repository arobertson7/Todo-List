// import Todo from "./Todo.js"

class TodoList {
    title // string
    description; // string
    list = []; // array of Todo objects
    finalDueDate; // ? for now a string

    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    // getters and setters
    get title() {
        return this.title;
    }

    set title(title) {
        this.title = title;
    }

    get description() {
        return this.description;
    }

    set description(description) {
        this.description = description;
    }

    get list() {
        return this.list;
    }

    get finalDueDate() {
        return this.finalDueDate;
    }

    // methods
    addTodo(Todo) {
        this.list.push(Todo);
    }

    removeTodo(Todo) {
        let index = 0;
        while (index < this.list.length && this.list[i].title != Todo.title) {
            index++;
        }
        // ToDo was not in the list
        if (index == this.list.length) {
            return;
        }
        // Remove from list if it exists
        for (let j = index + 1; j < this.list.length; j++) {
            this.list[j - 1] = this.list[j];
        }
        this.list.pop();
    }

    // returns the number of tasks in the list
    size() {
        return this.list.length();
    }

    // returns the number of completed tasks in the list
    getCompleted() {
        let counter = 0;
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].completed) {
                counter++;
            }
        }
        return counter;
    }

    // clear the list
    clear() {
        for (let i = this.list.length - 1; i >= 0; i--) {
            this.list.pop();
        }
    }

    // sorts the list by priority using insertion sort (highest to lowest)
    sortByPriority() {
        for (let i = 1; i < this.list.length(); i++) {
            let j = i;
            while (j > 0 && this.list[j].priority < this.list[j - 1].priority) {
                // swap
                const temp = this.list[j];
                this.list[j] = this.list[j - 1];
                this.list[j - 1] = temp;
                j--;
            }
        }
    }


    
 };

export default TodoList;