// import Todo from "./Todo.js"
import { formatDateYYYYMMDD } from "./format-date.js"
import storageHandler from "./storage.js";

class TodoList {
    title // string
    // description; // string
    list = []; // array of Todo objects

    constructor(title) {
        this.title = title;
    }

    // getters and setters
    get title() {
        return this.title;
    }

    set title(title) {
        this.title = title;
    }

    setTitle(title) {
        this.title = title;
        storageHandler.updateLocalStorage();
    }

    // get description() {
    //     return this.description;
    // }

    // set description(description) {
    //     this.description = description;
    // }

    get list() {
        return this.list;
    }

    // methods
    // add a new todo
    add(Todo) {
        this.list.push(Todo);
        storageHandler.updateLocalStorage();
    }

    // remove a todo
    remove(Todo) {
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
        return this.list.length;
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

    // sorts the list by priority using insertion sort
    // param 'direction' takes string "high" or "low"
    sortByPriority(direction) {
        // sort by highest
        if (direction == "high") {
            for (let i = 1; i < this.list.length; i++) {
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
        // sort by lowest
        if (direction == "low") {
            for (let i = 1; i < this.list.length; i++) {
                let j = i;
                while (j > 0 && this.list[j].priority > this.list[j - 1].priority) {
                    // swap
                    const temp = this.list[j];
                    this.list[j] = this.list[j - 1];
                    this.list[j - 1] = temp;
                    j--;
                }
            }
        }
        storageHandler.updateLocalStorage();
    }

    // sorts the list by dueDate using insertion sort
    // param 'direction' takes string "earliest" or "latest"
    sortByDueDate(direction) {
        // fill an array with the string dates formatted in yyyy-mm-dd to make them comparable
        const formattedDates = [];
        for (let i = 0; i < this.list.length; i++) {
            const formatted = formatDateYYYYMMDD(this.list[i].dueDate);
            formattedDates.push(formatted);
        }

        // sort by earliest first
        if (direction == "earliest") {
            for (let i = 1; i < this.list.length; i++) {
                let j = i;
                while (j > 0 && formattedDates[j] < formattedDates[j - 1]) {
                    // swap in actual list
                    const temp = this.list[j];
                    this.list[j] = this.list[j - 1];
                    this.list[j - 1] = temp;

                    // swap in formattedDates list to keep it current
                    const tempFormatted = formattedDates[j];
                    formattedDates[j] = formattedDates[j - 1];
                    formattedDates[j - 1] = tempFormatted;
                    j--;
                }
            }
        }
        // sort by latest first
        if (direction == "latest") {
            for (let i = 1; i < this.list.length; i++) {
                let j = i;
                while (j > 0 && formattedDates[j] > formattedDates[j - 1]) {
                    // swap
                    const temp = this.list[j];
                    this.list[j] = this.list[j - 1];
                    this.list[j - 1] = temp;
                    
                    // swap in formattedDates list to keep it current
                    const tempFormatted = formattedDates[j];
                    formattedDates[j] = formattedDates[j - 1];
                    formattedDates[j - 1] = tempFormatted;
                    j--;
                }
            }
        }
        storageHandler.updateLocalStorage();
    }

    // sorts the list by completed status with 2 passes
    // param 'status' takes string "completed" or "incomplete"
    sortByCompletedStatus(status) {
        let result = [];
        // sort by completed
        if (status == "completed") {
            // add completed todo's to result array
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].completed) {
                    result.push(this.list[i]);
                }
            }
            // then add incomplete todo's to result array
            for (let j = 0; j < this.list.length; j++) {
                if (!this.list[j].completed) {
                    result.push(this.list[j]);
                }
            }
        }
        // sort by incomplete
        if (status == "incomplete") {
            // add incomplete todo's to result array
            for (let i = 0; i < this.list.length; i++) {
                if (!this.list[i].completed) {
                    result.push(this.list[i]);
                }
            }
            // then add completed todo's to result array
            for (let j = 0; j < this.list.length; j++) {
                if (this.list[j].completed) {
                    result.push(this.list[j]);
                }
            }
        }

        // copy result back to actual list
        this.list = result;
        storageHandler.updateLocalStorage();
    }
    
 };

export default TodoList;