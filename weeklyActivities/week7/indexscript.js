const popButton = document.querySelector("#pop-button");
const playButton = document.querySelector("#play-button");
const pauseButton = document.querySelector("#pause-button");
const popSound = document.querySelector("#pop-sound");
const stardust = document.querySelector("#stardust");
const notify = document.querySelector("#notify");

popButton.addEventListener("click", playPopSound);
playButton.addEventListener("click", playStardust);
pauseButton.addEventListener("click", pauseStardust);

function playPopSound() {
    popSound.play();
}

function playNotify() {
    notify.play();
}

function playStardust() {
    stardust.play();
}

function pauseStardust() {
    stardust.pause();
}