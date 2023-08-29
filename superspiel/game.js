var canvas, ctx, thisPlayer = null, allPlayers = [], running = false;
onload = start;

function start() {
	canvas = document.getElementById('gameCanvas');	ctx = canvas.getContext('2d');
	startButton = document.getElementById('startButton');	startButton.addEventListener('click', startNewGame);

	canvas.addEventListener('click', (e) => {
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		if (!thisPlayer) {
			let id = getRandomColor();
			thisPlayer = {
				id: id,
				color: id,
				goalPosition: { x, y },
				piecePosition: { x, y }
			};
			sendUpdateToServer('join');

			//timerStarted = true;// Start the timer
			//setInterval(sendUpdateToServer, 50);
		} else {
			thisPlayer.goalPosition = { x, y };
			sendUpdateToServer();
		}


	});

}
function startNewGame() { sendUpdateToServer('start') }
function getRandomColor() {
	const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
	return randomColor;
}
function sendUpdateToServer(cmd = null) {
	let data = { cmd: cmd ?? '', thisPlayer: thisPlayer };
	fetch('server.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then(response => response.text())
		.then(textdata => {
			try {
				let jsdata = JSON.parse(textdata);
				allPlayers = jsdata.allPlayers;
				console.log('jsdata', jsdata)
				render();
			} catch {
				console.log('ERROR!')
				//console.log('text', textdata)

			}

		});
}
function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	console.log('rendering!')
	for (const id in allPlayers) {
		let pl = allPlayers[id]
		console.log('pl', pl)
		const xDiff = pl.goalPosition.x - pl.piecePosition.x;
		const yDiff = pl.goalPosition.y - pl.piecePosition.y;
		console.log('xy', xDiff, yDiff)

		// Calculate movement towards the goal
		const length = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
		const speed = 1;  // Adjust speed as needed
		console.log('l', length, speed)

		if (length > speed) {
			pl.piecePosition.x += (xDiff / length) * speed;
			pl.piecePosition.y += (yDiff / length) * speed;
		} else {
			pl.piecePosition.x = pl.goalPosition.x;
			pl.piecePosition.y = pl.goalPosition.y;
		}

		ctx.fillStyle = pl.color;
		ctx.fillRect(pl.piecePosition.x - 5, pl.piecePosition.y - 5, 10, 10);
		console.log('filled rect')

		// Render player goal position (circle)
		if (pl.id == thisPlayer.id) {
			console.log('rendering!')
			thisPlayer.piecePosition = pl.piecePosition;
			ctx.beginPath();
			ctx.arc(pl.goalPosition.x, pl.goalPosition.y, 3, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fill();
		}
	}
	console.log('DONE!')
}
