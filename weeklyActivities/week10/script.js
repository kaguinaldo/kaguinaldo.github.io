// hover functions
const wawa = document.querySelector("#wawa");
wawa.addEventListener("mouseover", showMoreInfo);
wawa.addEventListener("mouseout", hideMoreInfo);

const moreInfo = document.querySelector("#more-info");

// from display: none to block
// requires #id.class with "display: block" in it
function showMoreInfo() {
    moreInfo.classList.add("show");
    console.log("showing");
}

// from display: block to none
function hideMoreInfo() {
    moreInfo.classList.remove("show");
    console.log("hiding");
}
//---------------------------------------------------