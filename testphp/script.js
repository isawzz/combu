var canvas, ctx, userId, users, FRESH_START = false, FPS = 200;
onload = start

function start() {
	test1();
}
function test1() {
	canvas = document.getElementById('gameCanvas'); ctx = canvas.getContext('2d');
	canvas.onclick = setGoalPosition;

	fillList();

	if (FRESH_START) { setUserId('amanda'); return; }

	userId = sessionStorage.getItem('userId'); // Check if a userId already exists in sessionStorage
	setUserId(valf(userId, 'felix'));
	startGameloop();

}
async function startGameloop(){
	// send user data to host,
	await sendPostUpdatePositions();
	// get back all users' data
	// present on canvas - no interpolation for now!
}



function test0() {
	canvas = document.getElementById('gameCanvas'); ctx = canvas.getContext('2d');
	canvas.onclick = sendMousePosition;

	fillList();

	if (FRESH_START) { setUserId('amanda'); return; }

	userId = sessionStorage.getItem('userId'); // Check if a userId already exists in sessionStorage
	setUserId(valf(userId, 'felix'));
	// console.log('userId from sessionStorage', userId)
	// if (!userId) { userId = "felix"; sessionStorage.setItem('userId', userId); }
	// document.getElementById('dUsernames').value = userId;

}

function drawCircleC(pos, sz = 10, color = 'red') {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(pos.x, pos.y, sz / 2, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
}
function drawRectC(pos, sz = 10, color = 'red') {
	// C ... ctx is set!
	ctx.fillStyle = color;
	ctx.fillRect(pos.x - sz / 2, pos.y - sz / 2, sz, sz);

}
function fillList() {
	var dUsernames = document.getElementById("dUsernames");
	//mCenterFlex(dUsernames);

	// Clear the list (if you want to refresh its contents)
	dUsernames.innerHTML = '';

	let r = getCanvasRect(), offs = 8;
	let [x, y, w, h] = [r.x, r.y, r.w, r.h];
	users = {
		felix: { name: 'felix', color: 'blue', startPos: { x: 0 + offs, y: 0 + offs } },
		amanda: { name: 'amanda', color: 'green', startPos: { x: w - offs, y: h - offs } },
		gul: { name: 'gul', color: 'deepskyblue', startPos: { x: 0 + offs, y: h - offs } },
		mitra: { name: 'mitra', color: 'hotpink', startPos: { x: w - offs, y: 0 + offs } },
	}; // You can customize this array
	for (const name in users) {
		var li = document.createElement("div");
		mStyle(li, { fg: users[name].color, display: 'inline', maleft: 10, cursor: 'pointer' })
		li.innerHTML = name;
		li.onclick = ev => setUserId(ev.target.innerHTML);
		li.id = name;
		dUsernames.appendChild(li);
	}
	console.log('list',dUsernames)
}
function getCanvasCenter() {
	return { x: canvas.width / 2, h: canvas.height / 2 };
}
function getCanvasRect() {
	return { x: 0, y: 0, w: canvas.width, h: canvas.height };
}
function getMousePosition(parent, ev) {
	const rect = parent.getBoundingClientRect();
	const x = ev.clientX - rect.left;
	const y = ev.clientY - rect.top;
	return { x, y };
}
async function sendPostUpdatePositions(ev) {
	const message = document.getElementById('messageInput').value;
	const timestamp = new Date().getTime();
	console.log('userId', userId)

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
	const astext = await response.text();
	console.log('text',astext)
	const data = JSON.parse(astext); //await response.json();

	showLatency(latency);
	console.log('data',data);
	// showGoal(goal);
	// showPiece(pos);
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
async function sendGetReset() {
	const response = await fetch('server.php?action=reset');
	const data = await response.json();

	const textarea = document.getElementById('messagesOutput');
	textarea.value = JSON.stringify(data, null, 2);
	textarea.scrollTop = textarea.scrollHeight;
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
function showLatency(latency) {
	document.getElementById('latencyOutput').innerText = `Latency: ${latency.toFixed(2)}ms`;
}
function showPiece(pos) {
	drawCircleC(pos, 8, 'yellow'); //zeichne auch dem canvas ein rect mit mittelpunkt pos und groesse 10px
}
function showGoal(pos) {
	drawRectC(pos); //zeichne auch dem canvas ein rect mit mittelpunkt pos und groesse 10px
}
function setUserId(name) {
	let item = U = jsCopy(users[name]);
	let elem = mBy(name);
	//console.log('elem',elem)
	// Remove 'selected' class from all list items
	var allItems = document.querySelectorAll("#dUsernames div");
	allItems.forEach(el => { el.classList.remove("selected"); });

	// Add 'selected' class to the clicked item
	elem.classList.add("selected");
	//console.log('selected user',item);

	userId = item.name; //document.getElementById('dUsernames').value;
	item.pos = item.startPos;
	item.goal = getCanvasCenter();
	sessionStorage.setItem('userId', userId);
	mBy('dLoggedInAs').innerHTML = `logged in as <span style="color:${item.color}">${name}</span>`
}

