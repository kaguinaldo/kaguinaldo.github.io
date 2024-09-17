const myButton = document.querySelector("#my-button");

myButton.addEventListener("click", buttonClick);

const clickCount = document.querySelector("#click-count");

let buttonCount = 0;

function buttonClick() {
    console.log("wawa");
    buttonCount++;
    clickCount.textContent = buttonCount;
}

const toggleButton = document.querySelector("#toggle-button");
toggleButton.addEventListener("click", toggleMe);
let boxContainer = document.querySelector(".box-container");
let outer = document.querySelector(".outer");

function toggleMe() {
  boxContainer.classList.toggle("row-reverse");
}


const addButton = document.querySelector("#add-button");
addButton.addEventListener("click", addMe);
addButton.addEventListener("mouseover", dropMe);
addButton.addEventListener("mouseOut")
let count = 0;
function addMe() {
    if (count % 2 === 0) {
        boxContainer.innerHTML += `<div class="box purple-box"></div>`;
    }
    else {
        boxContainer.innerHTML += `<div class="box coral-box"></div>`;
    }
    count++;
}

const removeButton = document.querySelector("#remove-button");
removeButton.addEventListener("click", removeMe);

function removeMe() {
    let lastBox = boxContainer.lastElementChild;
    if (lastBox) {
        lastBox.remove();
    }
    count--;
}

