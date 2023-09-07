var canvas, ctx, userId, users, FRESH_START = false, FPS = 200;
onload = start

async function start() {
	test1(); //macht canvas und sets userId und U
	await sendPostSimple();
}
async function sendPostSimple() { let data = await sendPost(U); console.log('session', data.session.users); }
async function sendPost(o) {
	const start = performance.now();
	const response = await fetch('server.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(o)
	});
	const end = performance.now();

	const latency = end - start;
	showLatency(latency);

	const astext = await response.text();
	const data = tryJSONParse(astext);
	return data;
}
function tryJSONParse(astext) {
	try {
		const data = JSON.parse(astext);
		return data;
	} catch {
		console.log('text', astext)
		return { message: 'ERROR', text: astext }
	}
}
function movePieceCloserToGoal(pos, goal) {
	let dx = goal.x - pos.x;
	let dy = goal.y - pos.y;
	//console.log('dx,dy',dx,dy)
	return { x: pos.x + dx / 10, y: pos.y + dy / 10 }
}

