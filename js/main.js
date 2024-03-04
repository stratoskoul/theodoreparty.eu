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

function createFirework() {
  const centerX = Math.random() * window.innerWidth;
  const centerY = Math.random() * window.innerHeight;
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
  const numTrails = Math.floor(Math.random() * 15) + 5;

  for (let i = 0; i < numTrails; i++) {
    const trail = document.createElement('div');
    trail.classList.add('firework-trail');
    trail.style.left = centerX + 'px';
    trail.style.top = centerY + 'px';
    trail.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('fireworks-container').appendChild(trail);
  }

  setTimeout(function() {
    for (let i = 0; i < numTrails; i++) {
      document.getElementById('fireworks-container').removeChild(document.querySelector('.firework-trail'));
    }
  }, 1000);

  const firework = document.createElement('div');
  firework.classList.add('firework');
  firework.style.left = centerX + 'px';
  firework.style.top = centerY + 'px';
  firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  document.getElementById('fireworks-container').appendChild(firework);

  setTimeout(function() {
    document.getElementById('fireworks-container').removeChild(firework);
  }, 1000);
}

setInterval(createFirework, 2000);
