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
    "He moves all day, but yet, it never seemed to be erratic on his movements.",
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

const textSound = new Audio('click.mp3');
textSound.volume = 0.3;

const bgMusic = new Audio('waves.mp3');
bgMusic.volume = 0.15;
bgMusic.loop = true;

setTimeout(() => {
    bgMusic.play().catch(e => console.log('Audio autoplay blocked'));
}, 1000);

function typeText(text, callback) {
    isTyping = true;
    continueIndicator.classList.add('hidden');
    dialogueText.textContent = '';
    
    let charIndex = 0;
    const typingSpeed = 30;
    
    const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
            dialogueText.textContent += text[charIndex];
            
            textSound.currentTime = 0;
            textSound.play().catch(e => {});
            
            charIndex++;
        } else {
            clearInterval(typeInterval);
            isTyping = false;
            continueIndicator.classList.remove('hidden');
            if (callback) callback();
        }
    }, typingSpeed);
}

function showNextLine() {
    if (isTyping) {
        return;
    }
    
    if (currentLine < dialogueLines.length) {
        typeText(dialogueLines[currentLine]);
        currentLine++;
    } else {
        dialogueText.textContent = "";
        continueIndicator.classList.add('hidden');
    }
}

setTimeout(() => {
    showNextLine();
}, 4000);

document.addEventListener('click', () => {
    bgMusic.play().catch(e => {});
    if (!isTyping && currentLine > 0) {
        showNextLine();
    }
});

document.addEventListener('keydown', (e) => {
    bgMusic.play().catch(e => {});
    if ((e.key === 'Enter' || e.key === ' ' || e.key === 'z' || e.key === 'x') && !isTyping && currentLine > 0) {
        showNextLine();
    }
});
