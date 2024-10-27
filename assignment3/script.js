// Colours at the top here for ease of access
let brown = "#635043";
let violet = "#7F00FF";
let grey = "#3b3835";
let red = "#820e08";

// Initialise array for grid --> 2D array. Has 10 arrays within the array for rows and column.
let gridArray = [[], [], [], [], [], [], [], [], [], []];
let gridContainer = document.querySelector(".grid-container");
let grid = "";

// initialise 2D arrays for each of the section's coordinates of both draggable element, its colours for each sections,
// and the target's coordinates and colours.
// for a point of reference: [0] is row, [1] is column, [2] is colour.
let draggableSections = [[9, 1, red], [], [], [], []];
let targetSections = [[7, 7, grey], [], [], [], []];

// section background colour, and door "dimensions" and its colour for each section.
let backgroundColourArray = ["#1a1410", "white"];
let doorDimensions = [[5, 10, 6, 8, brown], [], [], [], []];

// declare first section; keeps track on which section this is currently on, starting with 0.
let currSection = 0;

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
        gridArray[i-1][j-1].style.transition = "background 1.5s";
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

// paints a rectangle of grid.
function paintRectangle(pointX1, pointX2, pointY1, pointY2, colour, transition) {
    let repeatY = pointY1;
    for (pointX1; pointX1 <= pointX2; pointX1++) {
        console.log(pointX1);
        for (pointY1; pointY1 <= pointY2; pointY1++) {
            gridArray[pointX1-1][pointY1-1].style.backgroundColor = colour;
            console.log(pointX1, pointY1);
        }
        pointY1 = repeatY;
    }
}

// changes background of the whole screen.
function paintBackground(colour) {
    currBGColour = colour;
    for (let i = 1; i < 11; i++) {
        for (let j = 1; j < 11; j++) {
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

function specifyValidDrop(pointX, pointY, colour) {
    targetX = pointX;
    targetY = pointY;
    hasListenerTarget = true;
    gridArray[pointX-1][pointY-1].style.backgroundColor = colour;
    gridArray[pointX-1][pointY-1].addEventListener("dragover", endDrag);
    gridArray[pointX-1][pointY-1].addEventListener("drop", dropped);
}

// enables the drop target to be valid.
function endDrag(event) {
    event.preventDefault();
    console.log("valid drop target");
}

// delay between transitions.
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// function handles what happens when the element gets dropped.
// made the function asynchronous in order to use the "await" expression for delays between transition of next section.
async function dropped() {
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
            draggedElement = null;
            console.log("draggable event listener removed.");
        }
        if (hasListenerTarget) {
            gridArray[targetX-1][targetY-1].removeEventListener("dragover", endDrag);
            gridArray[targetX-1][targetY-1].removeEventListener("drop", dropped);
            hasListenerTarget = false;
            console.log("drop target event listener removed.");
        }
        // delay for a second.
        await delay(1000);
        // then change the door's colours to the next background colour.
        paintRectangle(doorDimensions[0][0], doorDimensions[0][1], doorDimensions[0][2], doorDimensions[0][3], backgroundColourArray[1]);
        // delay once again.
        await delay (1500)
        // then, next section code.
        paintBackground(backgroundColourArray[1]);
    }
}

// initialise section 1.
paintBackground(backgroundColourArray[0]);
paintRectangle(doorDimensions[0][0], doorDimensions[0][1], doorDimensions[0][2], doorDimensions[0][3], doorDimensions[0][4]);
createDraggable(draggableSections[0][0], draggableSections[0][1], draggableSections[0][2]);
specifyValidDrop(targetSections[0][0], targetSections[0][1], targetSections[0][2]);