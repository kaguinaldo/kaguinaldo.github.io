const audio = document.querySelector("#relaxing-music");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img"); // for play-pause change
const progressBar = document.querySelector("#progress-bar-fill");
// set up loop button
const loopButton = document.querySelector("#loop-btn");
let loop = false;
// volume buttons
const decVol = document.querySelector("#decrease-volume");
const incVol = document.querySelector("#increase-volume");
// mute button
const muteButton = document.querySelector("#muted-btn");
let muted = false;
// text to be changed
const volText = document.querySelector("#volume");
const loopText = document.querySelector("#isLooping");
const muteText = document.querySelector("#isMuted");

audio.removeAttribute('controls');

// set up event listeners
playPauseBtn.addEventListener("click", togglePlayPause);
loopButton.addEventListener("click", loopAudio);
audio.addEventListener("timeupdate", updateProgressBar);
decVol.addEventListener("click", decreaseVolume);
incVol.addEventListener("click", increaseVolume);
muteButton.addEventListener("click", mute);

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

// volume function; increment by 10%
// volume is in range of 0-1.
function decreaseVolume() {
    if (audio.volume <= 0) {
        console.log("volume is already at 0%");
    }
    else {
        audio.volume = (audio.volume - 0.1).toFixed(1);
        // return current volume number
        volText.textContent = `${audio.volume * 100}%`;
        console.log("volume decreased by 10%, current volume:", audio.volume);
    }
}

function increaseVolume() {
    if (audio.volume >= 1.0) {
        console.log("volume is already at 100%");
    }
    else {
        
        audio.volume = (audio.volume + 0.1).toFixed(1);
        volText.textContent = `${audio.volume * 100}%`;
        console.log("volume increased by 10%, current volume:", audio.volume);
    }
}

// loop audio function.
function loopAudio() {
    if (loop) {
        console.log("looping disabled");
        loop = false;
        loopButton.style.backgroundColor = '#5e5a84';
        loopText.textContent = "No";
    }
    else {
        console.log("looping enabled");
        loop = true;
        loopButton.style.backgroundColor = '#333352';
        loopText.textContent = "Yes";
    }
}

function loopReplay() {
    if (loop) {
        console.log("loop is enabled; going back to beginning.")
        audio.currentTime = 0;
        audio.play();
    }
}

function mute() {
    if (muted) {
        console.log("unmuted");
        muted = false;
        muteButton.style.backgroundColor = '#5e5a84';
        muteText.textContent = "No";
    }
    else {
        console.log("muted");
        muted = true;
        muteButton.style.backgroundColor = '#333352';
        muteText.textContent = "Yes";
    }
    audio.muted = muted;
}
