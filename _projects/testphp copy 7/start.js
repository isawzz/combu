var canvas, ctx, userId, users, FRESH_START = false, FPS = 200;
onload = start

function start() {
	test1();
}
async function sendPostSimple() {
	//just send U
	U.timestamp = new Date().getTime();
	console.log('<== SEND', U.pos)

	const postData = {
		action: 'updatePositions',
		user: U,
	};

	const start = performance.now();
	const response = await fetch('server.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(postData)
	});
	const end = performance.now();

	const latency = end - start;
	showLatency(latency);

	const astext = await response.text();
	const data = outputJsonOrText(astext);
	return data;
}
function outputJsonOrText(astext) {
	try {
		const data = JSON.parse(astext); 
		return data;
	} catch {
		console.log('text', astext)

	}
}
function movePieceCloserToGoal(pos,goal){
	let dx=goal.x-pos.x;
	let dy=goal.y-pos.y;
	//console.log('dx,dy',dx,dy)
	return {x:pos.x+dx/10,y:pos.y+dy/10}
}

