

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
dragElement(document.querySelector("#calc"))

addWindowTapHandling(document.getElementById("welcome"));
addWindowTapHandling(document.querySelector("#notes"));
addWindowTapHandling(document.querySelector("#calc"));



const titleInput = document.getElementById("noteTitle");
const contentInput = document.getElementById("noteContent");
const saveButton = document.getElementById("saveButton");
const notesList = document.getElementById("notesList");

let notes = JSON.parse(localStorage.getItem("myNotes") || "[]");
let editingId = null;


function saveToStorage() {
    localStorage.setItem("myNotes", JSON.stringify(notes));
}

function renderNotes() {
    notesList.replaceChildren();

    notes.forEach(note => {
        const card = document.createElement("article");
        card.className = "note";
        const title = document.createElement("h3");
        title.textContent = note.title || "Untitled";

        const content = document.createElement("p");
        content.textContent = note.content;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", () => {
            titleInput.value = note.title;
            contentInput.value = note.content;
            editingId = note.id;
            saveButton.textContent = "Update Note";
            titleInput.focus();

        });
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            notes = notes.filter(item => item.id !== note.id);
            saveToStorage();
            renderNotes();
        });

        card.append(title, content, editButton, deleteButton);
        notesList.append(card);

    });
}

saveButton.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title && !content) {
        alert("Write something before saving.");
        return;
    }
    if (editingId !== null) {
        notes = notes.map(note =>
            note.id === editingId
                ? { ...note, title, content }
                : note
        );
    } else {
        notes.unshift({
            id: Date.now(),
            title,
            content
        });
    }

    saveToStorage();
    renderNotes();
    titleInput.value = "";
    contentInput.value = "";
    editingId = null;
    saveButton.textContent = "Save Note";
});

renderNotes();
saveToStorage()






function press(value) {
    const display = document.getElementById('calcInput');
    if (value === 'C') {
        display.value = '';
    } else {
        display.value += value;
    }
}

function calc() {
    const display = document.getElementById('calcInput');

    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "error";

    }


}

