
/* Defining all the variables and accessing the HTML elements */

let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track_artist");
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;

let isPlaying = false;

let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [


{
    name: "Drowning in the Sound (demo)",

    artist: "Amanda Palmer",

    image: "/home/lee/code_stuff/musicPlayer/resources/javascript/imgs/drowning.jpg";

    path: "/home/lee/code_stuff/musicPlayer/resources/javascript/Amanda Palmer - Amanda Palmer - Drowning In The Sound (Demo).mp3"

},

{
    name: "The French Brexit Song",

    artist: "Amanda Palmer, Sarah-Louise Young, and Maxim Melton" ,

    image: "/home/lee/code_stuff/musicPlayer/resources/javascript/imgs/brexit.jpg",

    path: "/home/lee/code_stuff/musicPlayer/resources/javascript/Amanda Palmer, Sarah-Louise Young, and Maxim Melton - The French Brexit Song.mp3",
},


{
    name: "Mother (Pink Floyd cover)",

    artist: "Amanda Palmer & Jherek Bischoff",

    image: "/home/lee/code_stuff/musicPlayer/resources/javascript/imgs/mother.jpg",

    path: "/home/lee/code_stuff/musicPlayer/resources/javascript/Amanda Palmer - Amanda Palmer & Jherek Bischoff - Mother.mp3",
},


{
    name: "Ashes to Ashes",

    artist: "Jherek Bischoff and Amanda Palmer",

    image: "/home/lee/code_stuff/musicPlayer/resources/javascript/imgs/ashes.jpg",

    path: "/home/lee/code_stuff/musicPlayer/resources/javascript/Jherek Bischoff and Amanda Palmer - Ashes To Ashes .mp3",
},


{
    name: "Small Hands, Small Heart (Demo)" ,

    artist: "Amanda Palmer",

    image: "/home/lee/code_stuff/musicPlayer/resources/javascript/imgs/smallHands.jpg", 

    path: "/home/lee/code_stuff/musicPlayer/resources/javascript/Amanda Palmer - Amanda Palmer - Small Hands, Small Heart (Demo).mp3",
},


{
    name: "Letter to John Schreiner",

    artist: "Jason Webley",

    image: "/home/lee/code_stuff/musicPlayer/resources/javascript/imgs/giraffe.jpg",

    path: "/home/lee/code_stuff/musicPlayer/resources/javascript/Jason Webley - Letter to John Schreiner.mp3" ,
}


];

/* Loading a new track from the track list */

function loadTrack(track_index) {

    clearInterval(updateTimer);

    resetValues(); /* resets duration values and slider position */

    curr_track.src = track_list[track_index].path; /* src property used to assign new source to audio element */

    curr_track.load();

    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";

    track_name.textContent = track_list[track_index].name;

    track_artist.textContent = track_list[track_index].artist;

    now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

    updateTimer = setInterval(seekUpdate, 1000);

    curr_track.addEventListener("ended", nextTrack);

    random_bg_color();

}


function random_bg_color() {

    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

    document.body.style.background = bgColor;

}

function resetValues() {

    curr_time.textContent = "00:00";

    total_duration.textContent = "00:00";

    seek_slider.value = 0;
}

/* Configuring Player Buttons */

/* Handles the actual playing and pausing of the track */
function playpauseTrack() {

    if (!isPlaying) playTrack();

    else pauseTrack();

}

/* Handles playing of currently loaded track, icon of button changes to pause*/
function playTrack() {

    curr_track.play();

    isPlaying = true;

    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';

}

function pauseTrack() {

    curr_track.pause();

    isPlaying = false;

    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';

}

/*Moves index forward */
function nextTrack() {

    if (track_index < track_list.length - 1)
        track_index += 1;

    else track_index = 0;

    loadTrack(track_index);
    playTrack();

}

/* Moves index backward. */
function prevTrack() {

    if (track_index > 0)
        track_index -= 1;

    else track_index = track_list.length;

    loadTrack(track_index);
    playTrack();
}

/* Configuring sliders */

function seekTo() {

    seekto = curr_track.duration * (seek_slider.value / 100);

    curr_track.currentTime = seekto;
}

function setVolume() {

    curr_track.volume = volume_slider.value / 100;

}

/* Updates the seek slider relative to the current time of the track */
function seekUpdate() {

    let seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);

        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);

        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);

        let durationMinutes = Math.floor(curr_track.duration / 60);

        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

            if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
            if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }

            if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes;}
            if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; } 

            curr_time.textContent = currentMinutes + ":" + currentSeconds;

            total_duration.textContent = durationMinutes + ":" + durationSeconds;
        
        }
};