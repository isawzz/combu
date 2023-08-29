// game.js
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const playerId = Math.random().toString(36).substr(2, 9); // Generate a unique player ID
const playerColor = getRandomColor(); // Get a random player color

const player = {
    x: 0,
    y: 0
};

canvas.addEventListener('click', (event) => {
    player.x = event.clientX - canvas.getBoundingClientRect().left;
    player.y = event.clientY - canvas.getBoundingClientRect().top;

    // Send player update to the backend
    updatePlayerPosition(player);
});

function getRandomColor() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
}

function updatePlayerPosition(player) {
    fetch('backend.php', {
        method: 'POST',
        body: new URLSearchParams({ playerId, x: player.x, y: player.y })
    })
    .then(response => response.json())
    .then(updatedPlayerData => {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw all players based on updated positions and colors
        for (const playerId in updatedPlayerData) {
            const p = updatedPlayerData[playerId];
            const color = playerId === playerId ? playerColor : p.color;
            context.fillStyle = color;
            context.fillRect(p.x - 10, p.y - 10, 20, 20);
        }
    });
}
