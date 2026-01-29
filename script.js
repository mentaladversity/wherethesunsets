const dialogueLines = [
    "I have always been the ocean.",
    "Wide.",
    "Heavy with memory.",
    "Carrying hurricanes I've survived and currents I never speak of.",
    "People look at me and think I am strong just because I've endured.",
    "And yet, they never noticed how much I've learned to hold without breaking.",
    "",
    "",
    "Then one day, there was that sun.",
    "He never seemed to be distant, but I could never reach him.",
    "Always visible from me, always warm, but never something I could touch.",
    "I watched him rise every day and wondered if he even knew I existed.",
    "",
    "The sun never rushed.",
    "He moves all day, but yet, he never seemed to be erratic on his movements.",
    "He danced with his clouds in the sky, and ever so slightly, glimmer and glow on my bed.",
    "I didn't want to pull him closer.",
    "I knew what happens when the ocean reaches for something so radiant and beautiful.",
    "So I waited.",
    "",
    "Day after day, he lingered longer.",
    "And the sky learned new colors because of him.",
    "So I waited.",
    "Second after second, he remained dancing.",
    "And his friends and family twinkled in the sky while he danced.",
    "So I waited.",
    "",
    "And when evening finally came, I felt it before I saw it.",
    "He was lowering down, ever so slowly.",
    "So I waited.",
    "",
    "And when the world held its breath as he touched the horizon,",
    "and when he met me, gazing longingly up at him.",
    "",
    "I didn't swallow him whole,",
    "I held him.",
    "",
    "His light didn't dissipate in my presence,",
    "but spread across my surface.",
    "Every wave.",
    "Every grain of sand.",
    "Every coral, felt his warmth.",
    "",
    "And that was when I understood.",
    "He always knew who I was, but he, too,",
    "Waited.",
    "",
    "Waited when the waves crash down on the gulf.",
    "Waited when the waters flow with a deep blue.",
    "Waited when the tides shift ever so slightly.",
    "And waited, when I was ready.",
    "",
    "And I'm always here, waiting, not because I have to.",
    "But because I want to be the place where he rests.",
    "And so we rest, rested as our colors collide, rested forevermore."
];

let currentLine = 0;
let isTyping = false;

const dialogueBox = document.getElementById('dialogue-box');
const dialogueText = document.getElementById('dialogue-text');
const continueIndicator = document.getElementById('continue-indicator');
const sunsetImage = document.getElementById('sunset-image');

const imageMap = {
    0: 'wave1.jpg',
    3: 'wave2.jpg',
    7: 'wave3.jpg',
    8: 'sun1.jpg',
    15: 'sun2.jpg',
    21: 'sun3.jpg',
    28: 'sunset.png'
};

function changeImage(imageSrc) {
    sunsetImage.style.opacity = '0';
    
    setTimeout(() => {
        sunsetImage.src = imageSrc;
        setTimeout(() => {
            sunsetImage.style.opacity = '1';
        }, 50);
    }, 1000);
}

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let clickBuffer = null;

const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 1;

let musicStarted = false;

fetch('click.mp3')
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
        clickBuffer = audioBuffer;
        console.log('Click sound loaded');
    })
    .catch(e => console.error('Error loading click sound:', e));

function playClickSound() {
    if (!clickBuffer) return;
    
    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();
    
    source.buffer = clickBuffer;
    gainNode.gain.value = 0.3;
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    source.start(0);
}

function startMusic() {
    if (!musicStarted) {
        audioContext.resume().then(() => {
            bgMusic.play().catch(e => console.log('Music blocked'));
            musicStarted = true;
        });
    }
}

function typeText(text, callback) {
    isTyping = true;
    continueIndicator.classList.add('hidden');
    dialogueText.textContent = '';
    
    let charIndex = 0;
    const typingSpeed = 50;
    
    const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
            dialogueText.textContent += text[charIndex];
            playClickSound();
            charIndex++;
        } else {
            clearInterval(typeInterval);
            isTyping = false;
            continueIndicator.classList.remove('hidden');
            if (callback) callback();
        }
    }, typingSpeed);
    
    const skipTyping = () => {
        clearInterval(typeInterval);
        dialogueText.textContent = text;
        isTyping = false;
        continueIndicator.classList.remove('hidden');
        dialogueBox.removeEventListener('dblclick', skipTyping);
        if (callback) callback();
    };
    
    dialogueBox.addEventListener('dblclick', skipTyping);
}

function showNextLine() {
    if (isTyping) {
        return;
    }
    
    if (currentLine < dialogueLines.length) {
        if (imageMap[currentLine]) {
            changeImage(imageMap[currentLine]);
        }
        
        typeText(dialogueLines[currentLine]);
        currentLine++;
    } else {
        dialogueText.textContent = "";
        continueIndicator.classList.add('hidden');
    }
}

setTimeout(() => {
    startMusic();
    sunsetImage.style.opacity = '1';
    showNextLine();
}, 4000);

document.addEventListener('click', () => {
    startMusic();
    if (!isTyping && currentLine > 0) {
        showNextLine();
    }
});

document.addEventListener('keydown', (e) => {
    startMusic();
    if ((e.key === 'Enter' || e.key === ' ' || e.key === 'z' || e.key === 'x') && !isTyping && currentLine > 0) {
        showNextLine();
    }
});
