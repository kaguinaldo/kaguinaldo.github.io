const audio = document.querySelector("#relaxing-music");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
let loop = false;
const loopButton = document.querySelector("#loop-btn");

audio.removeAttribute('controls');

playPauseBtn.addEventListener("click", togglePlayPause);
loopButton.addEventListener("click", loopAudio);
audio.addEventListener("timeupdate", updateProgressBar);

// check if audio has ended: replay if loop is true
audio.addEventListener('ended', loopReplay);

function togglePlayPause() {
    console.log("play-pause clicked");
    
    if (audio.paused || audio.ended) {
        console.log("playing");
        audio.play();
        playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
    } 
    else {
        console.log('paused');
        audio.pause();
        playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
    }
}

function updateProgressBar() {
  const value = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = value + "%";
}

// volume function; increment by 10


// loop audio function.
function loopAudio() {
    if (loop) {
        loop = false;
        loopButton.style.backgroundColor = '#333352';
    }
    else {
        loop = true;
        loopButton.style.backgroundColor = '#5e5a84';
    }
}

function loopReplay() {
    if (loop) {
        audio.currentTime = 0;
        audio.play();
    }
}
