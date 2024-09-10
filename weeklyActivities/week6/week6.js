function checkGrade() {
    const a1 = document.querySelector("#answer1");
    const a1Value = parseFloat(a1.value);
    console.log(a1Value); // if just a1 is put instead, it'll spit out the 
                          // html format <input... yada instead
    
    const a2 = document.querySelector("#answer2");
    const a2Value = parseFloat(a2.value);
    console.log(a2Value);

    let total = sum(a1Value, a2Value);
    console.log(total);

    giveReport(total);
}

function sum(val1, val2) {
    return val1 + val2;
}

function giveReport(score) {
    const report = document.querySelector("#report");
    const q2 = document.querySelector("#question2");
    q2.textContent = "What is your A2 Score?";
    if (score > 30) {
        console.log("HD");
        report.textContent = "You have achieved High Distinction!";
    }
    else if (score <= 30 && score > 20) {
        console.log("D");
        report.textContent = "You have achieved Distinction!";
    }
    else if (score <= 20 && score > 10) {
        console.log("P");
        report.textContent = "wowie,,, you passed";
    }
    else {
        console.log("F");
        report.textContent = "NAURRR you failed :((((";
    }
}

function toggleMe(id) {
    const current = document.querySelector(id);
    current.classList.toggle("round");
}

const header = document.querySelector("header");
header.innerHTML += `<p class="red-heading">The greatest empire the world has seen</p>`;
