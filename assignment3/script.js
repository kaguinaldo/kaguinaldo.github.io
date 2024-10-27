// Initialise array for grid --> 2D array. Has 10 arrays within the array for rows and columns.
let gridArray = [[], [], [], [], [], [], [], [], [], []];
let gridContainer = document.querySelector(".grid-container");
let grid = "";

// initialise 2D arrays for each of the section's coordinates of both draggable element, its colours, 

// initialise dragged element.
let draggedElement = null;

// keep track of previous coordinates of draggable
var dragX = 1;
var dragY = 1;

// keep track if draggable has event listener.
var hasListener = false;

// keep track as to what colour the draggable is currently.
var currDragColor = "red";

// keep track as to what colour the background is currently.
var currBGColour = "black";

// same deal as draggable, except for the actual target.
var targetX = 1;
var targetY = 1;
var hasListenerTarget = false;

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

// put all query selectors into all coordinates. for the sake of simplicity of coding,
// i will make the target the only valid drop target.
for (let i = 1; i < 11; i++) {
    for (let j = 1; j < 11; j++) {
        gridArray[i-1][j-1] = document.querySelector(`#x${i}y${j}`);
        console.log (gridArray[i-1][j-1]);
    }
}

// simple function to paint a straight line from one point to another. 
function paintStraightLine(pointX, pointY, rowOrColumn, otherPoint, colour) {
 
    for (pointX; pointX <= pointY; pointX++) {
        if (rowOrColumn == "row") { // row gets painted from (x, y1) to (x, y2)
            gridArray[otherPoint-1][pointX-1].style.backgroundColor = colour;
        }
        else if (rowOrColumn == "column") { // column gets painted from (x1, y) to (x2, y)
            gridArray[pointX-1][otherPoint-1].style.backgroundColor = colour;
        }
        else { // in case that the rowOrColumn has a typo, or it somehow doesn't work. this will exit the loop.
            console.log("row/column undefined. perhaps a typo in the code.");
            break;
        }
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
    currDragColor = colour;
    hasListener = true;
    gridArray[pointX-1][pointY-1].style.backgroundColor = colour;
    gridArray[pointX-1][pointY-1].draggable = true; 
    gridArray[pointX-1][pointY-1].addEventListener("dragstart", startDrag);

}

// initialise drag when user drags it.
function startDrag() {
    draggedElement = gridArray[dragX-1][dragY-1];
    console.log("dragging");
    console.log(draggedElement);
}

function specifyValidDrop(pointX, pointY) {
    targetX = pointX;
    targetY = pointY;
    hasListenerTarget = true;
    gridArray[pointX-1][pointY-1].addEventListener("dragover", endDrag);
    gridArray[pointX-1][pointY-1].addEventListener("drop", dropped);
}

function endDrag(event) {
    event.preventDefault();
    console.log("valid drop target");
}

function dropped() {
    if (draggedElement) {
        // if dragged over, firstly change colour of the valid target.
        gridArray[targetX-1][targetY-1].style.backgroundColor = currDragColor;

        // then, change the draggable's previous location to background colour.
        gridArray[dragX-1][dragY-1].style.backgroundColor = currBGColour;

        // then, remove their event listeners for the next section, as well as disabling
        // the draggable's "draggable" property.
        if (hasListener) {
            gridArray[dragX-1][dragY-1].removeEventListener("dragstart", startDrag);
            gridArray[dragX-1][dragY-1].draggable = false; 
            hasListener = false;
            console.log("draggable event listener removed.");
        }
        if (hasListenerTarget) {
            gridArray[targetX-1][targetY-1].removeEventListener("dragover", endDrag);
            gridArray[targetX-1][targetY-1].removeEventListener("drop", dropped);
            hasListenerTarget = false;
            console.log("drop target event listener removed.");
        }

        // then, next section code. 
    }
}


paintStraightLine(5, 8, "row", 4, brown);

createDraggable(1, 2, "red");

specifyValidDrop(5, 5);