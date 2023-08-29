// game.js
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const playerId = Math.random().toString(36).substr(2, 9); // Generate a unique player ID

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

function updatePlayerPosition(player) {
	fetch('backend.php', {
		method: 'POST',
		body: new URLSearchParams({ playerId, x: player.x, y: player.y })
	})
		.then(response => response.json())
		.then(updatedPlayerData => {
			console.log('response',updatedPlayerData); //return;
			// Clear canvas
			context.clearRect(0, 0, canvas.width, canvas.height);

			// Draw all players based on updated positions
			for (const playerId in updatedPlayerData) {
				const p = updatedPlayerData[playerId];
				context.fillStyle = playerId === playerId ? 'blue' : 'red';
				context.fillRect(p.x - 10, p.y - 10, 20, 20);
			}
		});
}


