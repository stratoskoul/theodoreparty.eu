document.addEventListener('DOMContentLoaded', function () {

    const scrollIndicator = document.querySelector('.scroll-down');

    // Transition point - when to start the transition (in % of viewport height)
    const transitionPoint = 0.3;

    // Define the scroll threshold for indicator visibility
    const scrollThreshold = 10;

    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        // Show/hide scroll indicator based on scroll position
        if (scrollPosition <= scrollThreshold) {
            // At the top, show the indicator
            scrollIndicator.style.opacity = 1;
        } else {
            // Scrolled down, hide the indicator
            scrollIndicator.style.opacity = 0;
        }

        // Calculate how far down the page we've scrolled as a percentage
        const scrollPercentage = scrollPosition / windowHeight;

        // Start transition after reaching the transition point
        if (scrollPercentage > transitionPoint) {
            // Calculate opacity and transform based on scroll position
            const transitionProgress = Math.min((scrollPercentage - transitionPoint) / 0.4, 1);
        } else {
            // Reset to initial state if scrolled back up
            image1.style.opacity = 1;
            image1.style.transform = 'translate(-50%, -50%)';
            image2.style.opacity = 0;
            image2.style.transform = 'translate(-50%, -40%)';
        }
    });
});

// Track if music has been played
let musicStarted = false;
        
// Function to play music
function playBackgroundMusic() {
    if (musicStarted) return;
    
    const audio = document.getElementById('background-music');
    audio.volume = 0.5; // Set volume to 50%
    
    // Try to play
    audio.play()
        .then(() => {
            musicStarted = true;
            console.log('Music started successfully');
        })
        .catch(error => {
            console.log('Failed to start music:', error);
        });
}

// Method 1: Try to play on page load
document.addEventListener('DOMContentLoaded', function() {
    playBackgroundMusic();
});

// Method 2: Play on any scroll event
window.addEventListener('scroll', function() {
    playBackgroundMusic();
});

// Method 3: Play specifically on mouse wheel events
window.addEventListener('wheel', function(event) {
    playBackgroundMusic();
});

// Method 4: Play on other user interactions as backup
document.addEventListener('click', playBackgroundMusic);
document.addEventListener('touchstart', playBackgroundMusic);
document.addEventListener('keydown', playBackgroundMusic);