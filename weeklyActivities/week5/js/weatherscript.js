function checkWeather() {
    let body = document.querySelector("body");
    let outer = document.querySelector(".outer");
    let inputTemp = document.querySelector("#temp");
    let temp = inputTemp.value;
    console.log("current temp is", temp);
    if (temp >= 40) {
        body.style.backgroundColor = "red";
        outer.style.backgroundColor = "blue";
        console.log("arhghghghg nooooooo is HOT");
    }
    else if (temp < 40 && temp >= 30) {
        body.style.backgroundColor = "limegreen";
        outer.style.backgroundColor = "#6D1112";
        console.log("is nice and warm");
    }
    else if (temp < 30 && temp >= 15) {
        body.style.backgroundColor = "#001B35";
        outer.style.backgroundColor = "#5E4636";
        console.log("the ideal weather");
    }
    else {
        body.style.backgroundColor = "grey";
        outer.style.backgroundColor = "#1D77A9";
        console.log("don't get frostbitten now");
    }
}