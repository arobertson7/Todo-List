import { format, formatDistanceStrict } from "date-fns";

const formatDateFromInput = function(date) {
    if (date != "") {
        let yearMonthDay = date.split("-");
        // check month for leading 0
        if (yearMonthDay[1][0] == "0") {
            yearMonthDay[1] = yearMonthDay[1].substring(1);
        }
        // check day
        if (yearMonthDay[2][0] == "0") {
            yearMonthDay[2] = yearMonthDay[2].substring(1);
        }
        return yearMonthDay.join('-');
    }
}

const formatDateYYYYMMDD = function(date) {
    let yearMonthDay = date.split("-");
    // add 0 to beginning of month if necessary
    if (yearMonthDay[1].length == 1) {
        yearMonthDay[1] = "0" + yearMonthDay[1];
    }
    // same for day
    if (yearMonthDay[2].length == 1) {
        yearMonthDay[2] = "0" + yearMonthDay[2];
    }
    return yearMonthDay.join('-');
}

// param 'date' is a string in the form: 2025-8-17
const formatDueDateForDisplay = function(date) {
    if (!date || date == "") {
        return "No due date";
    }
    let today = getTodaysDate();
    // let distance = formatDistanceStrict(today, date); // returns string in: "2 days", "5 months" format
    // distance = distance.split(" "); // ["2", "days"]
    
    let formattedDueDate = "Due ";
    // case 1: If within 1 week, display the day (ex: Monday)
    // if (distance[1].substring(0, 3) == "day" && distance[0] < 7) {
    //     formattedDueDate += format(date, "EEEE");
    // }
    // case 2: If greater than 1 week but within year, display short month and day (ex: Aug 27)
    if (date.substring(0, 4) == today.substring(0, 4)) {
        formattedDueDate += formatShortMonthAndDay(date);
    }
    // case 3: If not in this year, display calendar date (ex: 01-01-2026)
    else {
        formattedDueDate += "in " + date.substring(0, 4);
    }
    return formattedDueDate;
}

const formatShortMonthAndDay = function(date) {
    let formatted = "";
    const yearMonthDay = date.split("-");
    const month = yearMonthDay[1];
    switch(true) {
        case month == "1":
            formatted += "Jan";
            break;
        case month == "2":
            formatted += "Feb";
            break;
        case month == "3":
            formatted += "March";
            break;
        case month == "4":
            formatted += "April";
            break;
        case month == "5":
            formatted += "May";
            break;
        case month == "6":
            formatted += "June";
            break;
        case month == "7":
            formatted += "July";
            break;
        case month == "8":
            formatted += "Aug";
            break;
        case month == "9":
            formatted += "Sept";
            break;
        case month == "10":
            formatted += "Oct";
            break;
        case month == "11":
            formatted += "Nov";
            break;
        case month == "12":
            formatted += "Dec";
            break;
    }
    formatted += ` ${yearMonthDay[2]}`;
    return formatted;
}

// get today's date in yyyy-m-d format
const getTodaysDate = function() {
    let today = new Date();
    today = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    return today;
}

export { formatDateFromInput, formatDateYYYYMMDD, formatDueDateForDisplay, getTodaysDate };