async function __sendPostUpdatePositions(ev) {
	const message = document.getElementById('messageInput').value;
	const timestamp = new Date().getTime();
	console.log('<== SEND', U.pos)

	const postData = {
		action: 'updatePositions',
		timestamp: timestamp,
		user: U,
		message: message,
		userId: userId
	};
	addKeys(U, postData);

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
	const data = tryJSONParse(astext);
	return data;
}
async function sendMousePosition(ev) {
	const message = document.getElementById('messageInput').value;
	const timestamp = new Date().getTime();
	const goal = getMousePosition(canvas, ev)
	const pos = { x: goal.x - 20, y: goal.y - 20 }
	console.log('userId', userId)

	const postData = {
		timestamp: timestamp,
		message: message,
		goal: goal,
		pos: pos,
		userId: userId
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
	showGoal(goal);
	showPiece(pos);
}
async function sendPostMessage() {
	const message = document.getElementById('messageInput').value;
	const timestamp = new Date().getTime();

	const postData = {
		timestamp: timestamp,
		message: message,
		userId: userId
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
	document.getElementById('latencyOutput').innerText = `Latency: ${latency.toFixed(2)}ms`;
}
async function sendGetPositions() {
	const response = await fetch('server.php?action=positions');
	const data = await response.json();

	const textarea = document.getElementById('messagesOutput');
	textarea.value = JSON.stringify(data, null, 2);
	textarea.scrollTop = textarea.scrollHeight;
}
async function sendGetMessages() {
	const response = await fetch('server.php?action=download');
	const data = await response.json();

	const textarea = document.getElementById('messagesOutput');
	textarea.value = JSON.stringify(data, null, 2);
	textarea.scrollTop = textarea.scrollHeight;
}
function setGoalPosition(ev) {
	U.goal = getMousePosition(canvas, ev);
}
async function startGameloop() {
	// send user data to host,
	let data = await sendPostUpdatePositions();

	const session = data.session;
	const userlist = session.users;
	//console.log('session', session);
	for(const id of userlist){
		let o=session[id];
		//console.log('__________id',id,'U.name',U.name,'\no',o)
		if (id == U.name){
			console.log('==> RECEIVE',o.pos)
			o.pos=U.pos=movePointCloser(o.pos,o.goal);
			showGoal(o.goal,o.color);
		}
		showPiece(o.pos,o.color);
	}

	// get back all users' data
	// present on canvas - no interpolation for now!
}
