const myVideo = document.querySelector("#my-video");
const playPauseButton = document.querySelector("#play-pause-button");

playPauseButton.addEventListener("click", playPauseMe);

const playPauseImg = document.querySelector("#play-pause-img");

function playPauseMe() {
    if (myVideo.paused || myVideo.ended) {
        myVideo.play();
        playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
    }
    else {
        myVideo.pause();
        playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
    }
}