

function liveClock() {

    const target = document.getElementById('liveClock');
    const now = new Date();

    target.textContent = now.toLocaleTimeString();
}

setInterval(liveClock, 1000);
liveClock();








function dragElement(element) {
    if (!element) return;

    const header = document.getElementById(element.id + "header");


    const dragHandle = header || element;

    let initialX = 0;
    let initialY = 0;

    dragHandle.onmousedown = startDragging;

    function startDragging(e) {

        if (e.target.closest(".closebutton")) return;

        e.preventDefault();

        initialX = e.clientX;
        initialY = e.clientY;

        document.onmouseup = stopDragging;
        document.onmousemove = dragWindow;
    }

    function dragWindow(e) {
        e.preventDefault();

        const currentX = initialX - e.clientX;
        const currentY = initialY - e.clientY;

        initialX = e.clientX;
        initialY = e.clientY;

        element.style.top =
            (element.offsetTop - currentY) + "px";

        element.style.left =
            (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

const welcomeWindow = document.getElementById("welcome");

dragElement(welcomeWindow);



function closeWindow(element) {
    element.style.display = "none";
}