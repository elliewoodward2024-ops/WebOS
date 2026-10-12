

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

function closeWindow(element) {
    element.style.display = "none";
}



var biggestIndex = 1;

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
        handleWindowTap(element)
    )
}

function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
}

function openWindow(element) {
    element.style.display = "block";
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    element.style.top = "";
    element.style.left = "";
}

window.onload = function () {
    openWindow(document.getElementById("welcome"));
};

dragElement(document.getElementById("welcome"));
dragElement(document.querySelector("#notes"))
addWindowTapHandling(document.getElementById("welcome"));
addWindowTapHandling(document.querySelector("#notes"));
