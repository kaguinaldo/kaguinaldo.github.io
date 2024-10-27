// Initialise array for grid --> 2D array. Has 10 arrays within the array for rows and columns.
let gridArray = [[], [], [], [], [], [], [], [], [], []];
let gridContainer = document.querySelector(".grid-container");
let grid = "";

// initialise dragged element.
let draggedElement = null;

// keep track of previous coordinates of draggable
var dragX = 1;
var dragY = 1;

// keep track if draggable has event listener.
var hasListener = false;

// colours for ease of access
let brown = "#6F4E37";
let violet = "#7F00FF";

// automate HTML <div> tags 
for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
        grid += `
        <div id="x${i}y${j}"></div>`;
    }
}

gridContainer.innerHTML = grid;

for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
        gridArray[i-1][j-1] = document.querySelector(`#x${i}y${j}`);
        console.log (gridArray[i-1][j-1]);
    }
}

function paintStraightLine(pointX, pointY, rowOrColumn, otherPoint, colour) {
    if (rowOrColumn == "row") {
        for (pointX; pointX <= pointY; pointX++) {
            gridArray[otherPoint-1][pointX-1].style.backgroundColor = colour;
        }
    }
    else if (rowOrColumn == "column") {
        for (pointX; pointX <= pointY; pointX++) {
            gridArray[pointX-1][otherPoint-1].style.backgroundColor = colour;
        }
    }
    else {
        console.log("row/column undefined or typo.");
    }
}

function paintBackground(colour) {
    for (let i = 1; i < 11; i++) {
        for (let j = 1; j < 11; j++) {
            gridArray[i-1][j-1].style.transition = "background 2s";
            gridArray[i-1][j-1].style.backgroundColor = colour;
        }
    }
}

// initialise draggable.
function createDraggable(pointX, pointY, colour) {
    dragX = pointX;
    dragY = pointY;
    hasListener = true;
    gridArray[pointX-1][pointY-1].style.backgroundColor = colour;
    gridArray[pointX-1][pointY-1].draggable = true; 
    gridArray[pointX-1][pointY-1].addEventListener("dragstart", startDrag);
    gridArray[pointX-1][pointY-1].addEventListener("dragover", endDrag);
    
}



paintStraightLine(5, 8, "row", 4, brown);

createDraggable(1,1, "red");