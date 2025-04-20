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

export { headerStartup };