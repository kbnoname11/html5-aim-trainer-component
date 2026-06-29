let score = 0;
let timeLeft = 30;
let gameInterval = null;
let isPlaying = false;

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const btnPlay = document.getElementById('btn-play');
const btnExit = document.getElementById('btn-exit');
const scoreVal = document.getElementById('score-val');
const timerVal = document.getElementById('timer-val');
const target = document.getElementById('target');
const targetArea = document.getElementById('target-area');

// Game Management Logic
function startGame() {
    if (isPlaying) return;
    isPlaying = true;
    score = 0;
    timeLeft = 30;
    
    scoreVal.textContent = score;
    timerVal.textContent = timeLeft;
    
    startScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    moveTarget();
    target.style.display = 'block';
    
    gameInterval = setInterval(() => {
        timeLeft--;
        timerVal.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    target.style.display = 'none';
    gameScreen.classList.remove('active');
    startScreen.classList.add('active');
}

function moveTarget() {
    const areaWidth = targetArea.clientWidth;
    const areaHeight = targetArea.clientHeight;
    
    // Boundary offsets to prevent target bleeding over edges
    const padding = 30; 
    const randomX = Math.random() * (areaWidth - padding * 2) + padding;
    const randomY = Math.random() * (areaHeight - padding * 2) + padding;
    
    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
}

// Event Triggers
btnPlay.addEventListener('click', startGame);
btnExit.addEventListener('click', endGame);

target.addEventListener('mousedown', (e) => {
    if (!isPlaying) return;
    e.stopPropagation(); // Prevents miss detection
    score++;
    scoreVal.textContent = score;
    moveTarget();
});

// ESC Key Event Handler for Instant Exiting
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isPlaying) {
        endGame();
    }
});
