// Colours at the top here for ease of access
let brown = "#635043";
let violet = "#7F00FF";
let grey = "#3b3835";
let red = "#eb3636";

// Initialise array for grid --> 2D array. Has 10 arrays within the array for rows and column.
let gridArray = [[], [], [], [], [], [], [], [], [], []];
let gridContainer = document.querySelector(".grid-container");
let grid = "";

// initialise 2D arrays for each of the section's coordinates of both draggable element, its colours for each sections,
// and the target's coordinates and colours.
// for a point of reference: [0] is row, [1] is column, [2] is colour.
let draggableSections = [[9, 1, violet], [10, 4, "#25ba97"], [1, 7, "#ded13c"], [10, 10, red], [6, 9, "#e1e1e3"]];
let targetSections = [[7, 7, grey], [6, 8, "#85998f"], [8, 2, "#adaa86"], [5, 4, "#b58686"], [2, 2, "#8c8c91"]];

// section background colour, and door "dimensions" and its colour for each section.
// 6 elements in BGColour due to it being the last one. 
let backgroundColourArray = ["#1a1410", "#a1a8d1", "#1a7345", "#453821", "#1c1b1b", "white"];
let doorDimensions = [[5, 10, 6, 8, brown], [2, 10, 8, 10, "#3e453b"], [7, 10, 1, 3, "#333628"], [3, 10, 3, 8, "#7a6c68"], 
    [1, 10, 1, 7, "#616060"]];

// initialise text box's contents and coordinates.
let textSectionContent = [ [
    `<p>Waking up, there is only a door and a violet key...</p>`,
    `<p>Perhaps dragging it to the hole would open it.</p>
    `],
    `<p>Onto the next room... Seems that it's the same deal.</p>`,
    `<p>A bit small, but you can still crawl through it.</p>`,
    `<p>Rather gigantic, but you wouldn't let that stop you.</p>`,
    `<p>The final door, then you shall earn your freedom!</p>`,
    `<p>Congratulations -- You are now free.</p>`
];
let textSectionCoord = [[1, 4, 1, 6, "white"], [4, 2, null, null, "black"], [5, 1, null, null, "white"], [1, 7, null, null, "white"], 
    [3, 9, null, null, "white"], [5, 5, null, null, "black"]];

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

// paints a rectangle of grid.
function paintRectangle(pointX1, pointX2, pointY1, pointY2, colour, transition) {
    let repeatY = pointY1;
    for (pointX1; pointX1 <= pointX2; pointX1++) {
        console.log(pointX1);
        for (pointY1; pointY1 <= pointY2; pointY1++) {
            gridArray[pointX1-1][pointY1-1].style.backgroundColor = colour;
            console.log(pointX1, pointY1);
        }
        pointY1 = repeatY; // so that it goes back to the listed pointY per row.
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

function applyText(x, y, text, colour) {
    gridContainer.style.color = colour;
    gridArray[x-1][y-1].innerHTML = text;
    
}

function removeText(x, y) {
    gridArray[x-1][y-1].innerHTML = "";
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

// allows a cell to become a valid drop target.
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
        
        // remove current text.
        removeText(textSectionCoord[currSection][0], textSectionCoord[currSection][1]);
        if (textSectionCoord[currSection][2] != null) { 
            removeText(textSectionCoord[currSection][2], textSectionCoord[currSection][3]);
        }
        // delay for a second.
        await delay(1000);
        // then change the door's colours to the next background colour.
        paintRectangle(doorDimensions[currSection][0], doorDimensions[currSection][1], 
            doorDimensions[currSection][2], doorDimensions[currSection][3], backgroundColourArray[currSection + 1]);
        // delay once again. increment curr section number in the meantime.
        currSection += 1;
        // check if section is NOT the last:
        if (currSection < 5) {
            await delay(1500);
            // then, next section code.
            paintBackground(backgroundColourArray[currSection]);
            // delay a tiny bit.
            await delay(2000);
            paintRectangle(doorDimensions[currSection][0], doorDimensions[currSection][1], 
            doorDimensions[currSection][2], doorDimensions[currSection][3], doorDimensions[currSection][4]);
            createDraggable(draggableSections[currSection][0], draggableSections[currSection][1], draggableSections[currSection][2]);
            specifyValidDrop(targetSections[currSection][0], targetSections[currSection][1], targetSections[currSection][2]);
            // delay a tiny bit for text to appear.
            await delay(1200);
            applyText(textSectionCoord[currSection][0], textSectionCoord[currSection][1], 
                textSectionContent[currSection], textSectionCoord[currSection][4]);
        }
        else {
            await delay(1500);
            paintBackground(backgroundColourArray[currSection]);
            await delay(1200);
            applyText(textSectionCoord[currSection][0], textSectionCoord[currSection][1], 
                textSectionContent[currSection], textSectionCoord[currSection][4]);            
        }
    }
}

// initialise section 1.
paintBackground(backgroundColourArray[0]);
paintRectangle(doorDimensions[0][0], doorDimensions[0][1], doorDimensions[0][2], doorDimensions[0][3], doorDimensions[0][4]);
createDraggable(draggableSections[0][0], draggableSections[0][1], draggableSections[0][2]);
specifyValidDrop(targetSections[0][0], targetSections[0][1], targetSections[0][2]);
applyText(textSectionCoord[0][0], textSectionCoord[0][1], textSectionContent[0][0], textSectionCoord[0][4]);
applyText(textSectionCoord[0][2], textSectionCoord[0][3], textSectionContent[0][1], textSectionCoord[0][4]);