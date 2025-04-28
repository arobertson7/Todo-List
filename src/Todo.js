import { getTodaysDate } from "./format-date.js";

class Todo {
    title; // string
    description; // string
    dueDate; // string in format:  2025-6-16 / yyyy-M-d
    priority; // int (1 - high | 2 - medium | 3 - low)
    completed; // bool

    constructor(title, description = "", dueDate = getTodaysDate(), priority = 3) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    markComplete() {
        this.completed = true;
    }

};

export default Todo;