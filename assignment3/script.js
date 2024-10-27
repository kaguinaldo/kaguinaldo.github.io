// Initialise array for grid --> 2D array. Has 10 arrays within the array for rows and columns.
let gridArray = [[], [], [], [], [], [], [], [], [], []];
let gridContainer = document.querySelector(".grid-container");
let grid = "";

let brown = "#EADDCA";

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
    
}

paintStraightLine(5, 8, "row", 4, brown);