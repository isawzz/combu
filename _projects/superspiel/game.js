const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', startNewGame);

let myPlayer = null;
let allPlayers = [];
let timerStarted = false;

canvas.addEventListener('click', (e) => {
	const rect = canvas.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	if (!myPlayer) {
		myPlayer = {
			isNewPlayer: true,
			goalPosition: { x, y }
		};

		// Start the timer
		timerStarted = true;
		//setInterval(sendUpdateToServer, 50);
	} else {
		myPlayer.goalPosition = { x, y };
	}

	sendUpdateToServer();
	setInterval(render, 50);
});

function startNewGame() {	sendUpdateToServer('startGame')}

function sendUpdateToServer(cmd=null) {
	let url='server.php';
	if (cmd) url += `?${cmd}=true`;
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(myPlayer)
	})
		.then(response => response.json())
		.then(data => {
			allPlayers = data.players;
			console.log('allPlayers', allPlayers)
			// render();
		});
}

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (const pl of allPlayers) {
		const xDiff = pl.goalPosition.x - pl.piecePosition.x;
		const yDiff = pl.goalPosition.y - pl.piecePosition.y;

		// Calculate movement towards the goal
		const length = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
		const speed = 1;  // Adjust speed as needed

		if (length > speed) {
			pl.piecePosition.x += (xDiff / length) * speed;
			pl.piecePosition.y += (yDiff / length) * speed;
		} else {
			pl.piecePosition.x = pl.goalPosition.x;
			pl.piecePosition.y = pl.goalPosition.y;
		}

		ctx.fillStyle = pl.color;
		ctx.fillRect(pl.piecePosition.x - 5, pl.piecePosition.y - 5, 10, 10);

		// Render player goal position (circle)
		if (pl.id == myPlayer.id) {
			myPlayer.piecePosition = pl.piecePosition;
			ctx.beginPath();
			ctx.arc(pl.goalPosition.x, pl.goalPosition.y, 3, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fill();
		}
	}
}
