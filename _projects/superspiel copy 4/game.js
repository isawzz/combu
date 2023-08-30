var canvas, ctx, thisPlayer = null, allPlayers = [];
onload = start;
onbeforeunload = stopGame;
var interval = 1000, TO = null, running = false, rounds = 2, thisRound = 0;

function start() {
	test1();
}
function test1() {
	canvas = mBy('gameCanvas'); ctx = canvas.getContext('2d'); canvas.onclick = setGoal;
	//sendUpdateToServer('start');
}
function test0() {
	canvas = document.getElementById('gameCanvas'); ctx = canvas.getContext('2d');
	// startButton = document.getElementById('startButton'); startButton.addEventListener('click', startNewGame);
	canvas.addEventListener('click', (e) => {
		if (running) { stopGame(e); } else { setGoal(e); }
	});
}
function stopGame() { clearTimeout(TO); running = false; }
function setGoal(e) {
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
		running = true;
	} else {
		thisPlayer.goalPosition = { x, y };
	}
}
function startNewGame() { sendUpdateToServer('start') }
function getRandomColor() {
	const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
	return randomColor;
}
function sendUpdateToServer(cmd = null) {
	let data = { cmd: cmd, thisPlayer: thisPlayer };
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
				if (cmd) console.log('cmd', cmd)
				if (cmd == 'join') {
					thisPlayer.id = jsdata.id;
					console.log('joined as player', thisPlayer.id)
				}
				if (cmd != 'start') {
					render();
					if (thisRound++ <= rounds) {
						TO = setTimeout(sendUpdateToServer, interval)
						running = true;
					} else { stopGame(); }
				}
			} catch {
				console.log('ERROR!')
				//stopGame();
				console.log('text', textdata)

			}

		});
}
function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//console.log('rendering!')
	for (const id in allPlayers) {
		let pl = allPlayers[id]
		//console.log('pl', pl)
		const xDiff = pl.goalPosition.x - pl.piecePosition.x;
		const yDiff = pl.goalPosition.y - pl.piecePosition.y;
		//console.log('xy', xDiff, yDiff)

		// Calculate movement towards the goal
		const length = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
		const speed = 1;  // Adjust speed as needed
		//console.log('l', length, speed)

		if (length > speed) {
			pl.piecePosition.x += (xDiff / length) * speed;
			pl.piecePosition.y += (yDiff / length) * speed;
		} else {
			pl.piecePosition.x = pl.goalPosition.x;
			pl.piecePosition.y = pl.goalPosition.y;
		}

		ctx.fillStyle = pl.color;
		ctx.fillRect(pl.piecePosition.x - 5, pl.piecePosition.y - 5, 10, 10);
		//console.log('filled rect')

		// Render player goal position (circle)
		if (pl.id == thisPlayer.id) {
			//console.log('rendering!')
			thisPlayer.piecePosition = pl.piecePosition;
			ctx.beginPath();
			ctx.arc(pl.goalPosition.x, pl.goalPosition.y, 3, 0, 2 * Math.PI);
			ctx.closePath();
			ctx.fill();
		}
	}
	//console.log('DONE!')
}
