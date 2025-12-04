const character = document.getElementById('abdu-character');
const characterWrapper = document.getElementById('character-wrapper'); 
const danceBtn = document.getElementById('dance-btn');
const dressBtn = document.getElementById('dress-btn');
const bathBtn = document.getElementById('bath-btn');
// NEW Button Reference
const costumeBtn = document.getElementById('costume-btn'); 
const defaultBtn = document.getElementById('default-btn');

let currentAnimation = null; 
let isAnimatedState = false; 

// --- SPEECH FUNCTION (Unchanged) ---
function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.2; 
        utterance.pitch = 1.5; 
        window.speechSynthesis.speak(utterance);
    }
}

// --- CONTINUOUS FLOATING MOTION (Unchanged) ---
let floatFrame = 0;
const floatSpeed = 0.05; 
const floatAmplitude = 8; 

function startFloating() {
    if (!isAnimatedState) { 
        floatFrame += floatSpeed;
        const floatY = Math.sin(floatFrame) * floatAmplitude;
        characterWrapper.style.transform = `translateY(${floatY}px)`;
    }
    requestAnimationFrame(startFloating);
}


// --- TAP/CLICK REACTION (Unchanged) ---
character.addEventListener('click', handleCharacterInteraction);
character.addEventListener('touchstart', handleCharacterInteraction);

function handleCharacterInteraction() {
    stopAnimation(); 
    character.classList.add('is-pulsing');
    const reactionSound = new Audio('reaction.mp3'); 
    reactionSound.play().catch(error => {});
    speak("Whoa! I feel bubbly!"); 
    setTimeout(() => {
        character.classList.remove('is-pulsing');
    }, 500); 
}


// --- ANIMATION CONTROLS (ALL FRAMES ARE .PNG) ---

function stopAnimation() {
    if (currentAnimation) {
        clearInterval(currentAnimation);
        currentAnimation = null;
    }
}

function startAction(frames, interval, speechText) {
    stopAnimation();
    isAnimatedState = true; 
    
    let frameIndex = 0;
    currentAnimation = setInterval(() => {
        character.src = frames[frameIndex];
        frameIndex = (frameIndex + 1) % frames.length; 
    }, interval); 

    if (speechText) {
        speak(speechText);
    }
}

// Action functions
function startDance() {
    const frames = ['abdu_dance_1.png', 'abdu_dance_2.png']; 
    startAction(frames, 150, "I'm dancing! Look at my moves!");
}

// DRESS UP (HAT) - Uses abdu_hat_1.png and a generic second frame for wiggling
function dressUp() {
    const frames = ['abdu_hat_1.png', 'abdu_hat_1_wiggle.png']; // NOTE: You need to create this wiggle frame!
    startAction(frames, 300, "I look so stylish in this cap!");
}

// NEW: COSTUME (MASK/CAPE) - Uses abdu_hat_2.png and a generic second frame
function changeCostume() {
    const frames = ['abdu_hat_2.png', 'abdu_hat_2_wiggle.png']; // NOTE: You need to create this wiggle frame!
    startAction(frames, 300, "Ready for action! I'm Super Abdu!");
}

// TAKE A BATH - All frames fixed to .png
function takeABath() {
    const frames = ['abdu_bath_1.png', 'abdu_bath_2.png']; 
    startAction(frames, 400, "Ah, the water is nice and warm. Don't look!");
}

function goDefault() {
    stopAnimation();
    isAnimatedState = false; 
    // If you converted the original to transparent, change this to .png
    character.src = 'talking_abdu.jpg'; 
    speak("I'm back to normal!");
}

// --- ATTACH LISTENERS ---
danceBtn.addEventListener('click', startDance);
danceBtn.addEventListener('touchstart', startDance);
dressBtn.addEventListener('click', dressUp);
dressBtn.addEventListener('touchstart', dressUp);
// NEW Listener
costumeBtn.addEventListener('click', changeCostume); 
costumeBtn.addEventListener('touchstart', changeCostume);
bathBtn.addEventListener('click', takeABath);
bathBtn.addEventListener('touchstart', takeABath);
defaultBtn.addEventListener('click', goDefault);
defaultBtn.addEventListener('touchstart', goDefault);

// --- INITIAL START ---
window.onload = function() {
    goDefault(); 
    startFloating(); 
};
