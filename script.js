console.log("Toy Story Invitation Loaded!");

const pullContainer = document.getElementById('pullContainer');
const pullRing = document.getElementById('pullRing');
const pullString = document.getElementById('pullString');
const invitationCard = document.getElementById('invitationCard');
const etchScreen = document.getElementById('etchScreen');

// Audio elements
const woodyAudio1 = document.getElementById('woodyAudio');
const woodyAudio2 = document.getElementById('woodyAudio2');
const revealAudio = document.getElementById('revealAudio');
const buzzAudio = document.getElementById('buzzAudio');
const mainAudio = document.getElementById('mainAudio');

let isDragging = false;
let startY = 0;
let currentY = 0;
const initialStringHeight = 150;

// Maximum distance the string can be pulled
const maxY = 250; 
// Distance required to trigger the card reveal
const triggerY = 120; 

// Flag to track if the card has been revealed
let hasPulled = false;

function playWoodyQuote() {
    try {
        // Randomly pick between woodyAudio1 and woodyAudio2
        const audioToPlay = Math.random() > 0.5 ? woodyAudio1 : woodyAudio2;
        if (audioToPlay) {
            audioToPlay.currentTime = 0;
            audioToPlay.play().catch(e => console.log("Woody audio play prevented", e));
        }
    } catch (e) {}
}

function playBuzzQuote() {
     try {
        if(buzzAudio) {
            buzzAudio.currentTime = 0;
            buzzAudio.play().catch(e => console.log("Buzz audio play prevented", e));
        }
    } catch (e) {}
}

function startDrag(y) {
    // We removed the 'already revealed' check here so users can keep pulling for audio!
    isDragging = true;
    startY = y;
    
    // Disable smooth transition while dragging for 1:1 follow
    pullString.style.transition = 'none';
    pullRing.style.transition = 'none';
}

function handleDrag(y) {
    if (!isDragging) return;
    
    // Calculate distance dragged
    currentY = y - startY;
    
    // Constrain the drag distance
    if (currentY < 0) currentY = 0;
    if (currentY > maxY) currentY = maxY;
    
    // "Extra line" logic: stretch the string by increasing its height ONLY.
    // Since the container is a flex column, the ring is automatically pushed down.
    // We DO NOT translate the ring, preventing the disconnection!
    pullString.style.height = `${initialStringHeight + currentY}px`;
    
    // Provide visual feedback (tension) when approaching the trigger point
    if (currentY > triggerY) {
        pullRing.style.backgroundColor = 'rgba(239, 71, 111, 0.6)'; // Turn red-ish
    } else {
        pullRing.style.backgroundColor = 'rgba(255,255,255,0.2)';
    }

    // Define max pull distance for title fade
    const maxPull = 150;
    
    // If pulled more than half way, start fading out the title image early
    const siteTitle = document.querySelector('.site-title-img');
    if (currentY > (maxPull / 2) && siteTitle) {
        // Start fading based on pull amount
        const fadeRatio = 1 - ((currentY - (maxPull / 2)) / (maxPull / 2));
        siteTitle.style.opacity = Math.max(0, fadeRatio);
    } else if (siteTitle && !hasPulled) {
        siteTitle.style.opacity = 1;
    }
}

function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    
    if (currentY > triggerY) {
        // Play quote!
        playWoodyQuote();
        
        // Trigger condition met -> Reveal setup (only if hidden)
        if(invitationCard.classList.contains('hidden')) {
            setTimeout(() => {
                revealInvitation();
                const buzzPrompt = document.getElementById('buzzPrompt');
                if(buzzPrompt) buzzPrompt.style.opacity = '0';
            }, 300);
        }
    } 
    
    // ALWAYS snap back the string to its original position so it stays on screen
    // and can be pulled again!
    pullString.style.transition = 'height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    pullRing.style.transition = 'background-color 0.4s';
    
    pullString.style.height = `${initialStringHeight}px`;
    pullRing.style.backgroundColor = 'rgba(255,255,255,0.2)';
    
    currentY = 0;
}

function revealInvitation() {
    // Set flag to true
    hasPulled = true;

    // Reveal the card
    invitationCard.classList.remove('hidden');
    console.log("Howdy partner! The invitation has been revealed.");
    // Audio and drawing wait for the knob click!

    // Add a class that smoothly hides the pull container so it doesn't overlap
    document.getElementById('pullContainer').classList.add('hidden');
    
    // Smoothly hide the Woody and Buzz container
    const charactersContainer = document.getElementById('charactersContainer');
    if (charactersContainer) {
        charactersContainer.classList.add('fade-out');
    }
    
    // Ensure site title stays hidden after pull
    const siteTitle = document.querySelector('.site-title-img');
    if (siteTitle) {
        siteTitle.classList.add('fade-out');
        siteTitle.style.opacity = 0; // Force to 0 just in case
    }
}

// Etch A Sketch Knob Logic
const knobLeft = document.getElementById('knobLeft');
const knobRight = document.getElementById('knobRight');
const etchPrompt = document.getElementById('etchPrompt');
const etchDetails = document.getElementById('etchDetails');
let isDetailsRevealed = false;

function handleKnobClick(knob) {
    // Add twist animation
    knob.classList.add('twist');
    setTimeout(() => knob.classList.remove('twist'), 500);
    
    if (!isDetailsRevealed) {
        isDetailsRevealed = true;
        
        // Emulate erasing the Etch A Sketch by vigorously shaking the whole card!
        invitationCard.classList.add('shake-animation');
        
        // Fade out prompt while shaking
        etchPrompt.style.opacity = '0';
        
        setTimeout(() => {
            // Remove the shake class so it can be re-triggered if ever needed, and stop shaking
            invitationCard.classList.remove('shake-animation');
            etchPrompt.style.display = 'none';
            
            // Show details and start drawing
            etchDetails.style.display = 'flex';
            etchDetails.classList.add('draw-animation');
            
            // Play Main Audio song
            if(mainAudio) {
                mainAudio.currentTime = 0;
                mainAudio.play().catch(e => console.log("Main Audio play prevented", e));
            } else {
                // Fallback to basic chime
                try {
                    revealAudio.currentTime = 0;
                    revealAudio.play().catch(e => console.log(e));
                } catch(e) {}
            }
            
        }, 600); // 600ms matches the shake-animation CSS duration
    }
}

if (knobLeft) knobLeft.addEventListener('click', () => handleKnobClick(knobLeft));
if (knobRight) knobRight.addEventListener('click', () => handleKnobClick(knobRight));

// Buzz Hitbox Logic
const buzzHitbox = document.getElementById('buzzHitbox');
const buzzPrompt = document.getElementById('buzzPrompt');
if (buzzHitbox) {
    buzzHitbox.addEventListener('click', () => {
        // Play quote first!
        playBuzzQuote();
        
        if(invitationCard.classList.contains('hidden')) {
            // Very slight delay for reveal so you can hear the start of the quote
            setTimeout(() => {
                revealInvitation();
                if(buzzPrompt) buzzPrompt.style.opacity = '0';
            }, 300);
        }
    });
}

// Ensure elements exist before adding listeners
if (pullRing && pullContainer) {
    // Mouse Events
    pullRing.addEventListener('mousedown', (e) => startDrag(e.clientY));
    window.addEventListener('mousemove', (e) => handleDrag(e.clientY));
    window.addEventListener('mouseup', endDrag);

    // Touch Events for Mobile support
    pullRing.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientY), {passive: false});
    window.addEventListener('touchmove', (e) => {
        if(isDragging) e.preventDefault(); // Prevent scrolling while dragging
        handleDrag(e.touches[0].clientY);
    }, {passive: false});
    window.addEventListener('touchend', endDrag);
}
