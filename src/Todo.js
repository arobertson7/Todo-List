class Todo {
    title; // string
    description; // string
    dueDate; // ? for now a string
    priority; // int (1 - high | 2 - medium | 3 - low)
    completed; // bool

    constructor(title, description = "", dueDate = "No due date", priority = 3) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

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

    get dueDate() {
        return this.dueDate;
    }

    set dueDate(dueDate) {
        this.dueDate = dueDate;
    }

    get priority() {
        return this.priority;
    }

    set priority(priority) {
        this.priority = priority;
    }

    get completed() {
        return this.completed;
    }

    set completed(completed) {
        this.completed = completed;
    }

};

export default Todo;