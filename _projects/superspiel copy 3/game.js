// game.js
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
let playerId = '';
let playerColor = getRandomColor();

const player = {
    x: 0,
    y: 0
};

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startNewGame);

const joinButton = document.getElementById('joinButton');
joinButton.addEventListener('click', joinGame);

canvas.addEventListener('click', (event) => {
    player.x = event.clientX - canvas.getBoundingClientRect().left;
    player.y = event.clientY - canvas.getBoundingClientRect().top;

    // Send player update to the backend
    updatePlayerPosition(player);
});

function startNewGame() {
    fetch('backend.php?startGame=true', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(updatedPlayerData => {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayers(updatedPlayerData);
    });
}

function joinGame() {
    // Generate a unique player ID
    playerId = Math.random().toString(36).substr(2, 9);

    // Send join message to the backend with initial data
    fetch('backend.php', {
        method: 'POST',
        body: new URLSearchParams({ playerId, color: playerColor, x: player.x, y: player.y })
    })
    .then(response => response.json())
    .then(updatedPlayerData => {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayers(updatedPlayerData);
    });
}

function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function updatePlayerPosition(player) {
    fetch('backend.php', {
        method: 'POST',
        body: new URLSearchParams({ playerId, color: playerColor, x: player.x, y: player.y })
    })
    .then(response => response.json())
    .then(updatedPlayerData => {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawPlayers(updatedPlayerData);
    });
}

function drawPlayers(playerData) {
    // Draw all players based on updated positions and colors
    for (const playerId in playerData) {
        const p = playerData[playerId];
        context.fillStyle = p.color;
        context.fillRect(p.x - 10, p.y - 10, 20, 20);
    }
}
