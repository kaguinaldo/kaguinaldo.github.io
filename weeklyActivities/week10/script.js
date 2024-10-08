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
// drop down menu function
const profileButton = document.querySelector("#profile-button");
const profileContent = document.querySelector("#profile-content");
profileButton.addEventListener("click", toggleMenu);

function toggleMenu() {
    console.log("wawa menu")
    profileContent.classList.toggle("show");
}

//------------------------------------------------
// scroll
const scrollContent = document.querySelector("#scroll-content");

const hscrollButton = document.querySelector("#hscroll-button");
console.log(hscrollButton);

hscrollButton.addEventListener("click", getHScroll);

const hscroll = document.querySelector("#hscroll");

function getHScroll() {
  hscroll.textContent = scrollContent.scrollLeft;
}

const vscrollButton = document.querySelector("#vscroll-button");
console.log(vscrollButton);

vscrollButton.addEventListener("click", getVScroll);

const vscroll = document.querySelector("#vscroll");

function getVScroll() {
  vscroll.textContent = scrollContent.scrollTop;
}

const hscroll150Button = document.querySelector("#hscroll150-button");
console.log(hscroll150Button);

hscroll150Button.addEventListener("click", gotoHScroll150);

function gotoHScroll150() {
  scrollContent.scrollTo({ left: 150, behavior: "smooth" });
}

const vscroll300Button = document.querySelector("#vscroll300-button");
console.log(vscroll300Button);

vscroll300Button.addEventListener("click", gotoVScroll300);

function gotoVScroll300() {
  scrollContent.scrollTo({ top: 300, behavior: "smooth" });
}

const wvscrollButton = document.querySelector("#wvscroll-button");
console.log(wvscrollButton);

wvscrollButton.addEventListener("click", getWVScroll);

const wvscroll = document.querySelector("#wvscroll");

function getWVScroll() {
  wvscroll.textContent = window.scrollY;
}