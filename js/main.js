window.onscroll = function () { myFunction() };

var decor = document.getElementById("decor");
var sticky = decor.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky+201) {
        decor.classList.add("sticky")
    } else {
        decor.classList.remove("sticky");
    }
}

var myAudio = document.getElementById("audio");
var isPlaying = false;

function togglePlay() {
  isPlaying ? myAudio.pause() : myAudio.play();
};

myAudio.onplaying = function() {
  isPlaying = true;
};
myAudio.onpause = function() {
  isPlaying = false;
};