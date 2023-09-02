var canvas, ctx, userId, users, FRESHSTART=false;
onload = start

function start() {
	test0();
}
function test0() {
	canvas = document.getElementById('gameCanvas'); ctx = canvas.getContext('2d');
	canvas.onclick = sendMousePosition;

	fillList();

	if (FRESHSTART)	{setUserId('amanda'); return;}

	userId = sessionStorage.getItem('userId'); // Check if a userId already exists in sessionStorage
	setUserId(valf(userId,'felix'));
	// console.log('userId from sessionStorage', userId)
	// if (!userId) { userId = "felix"; sessionStorage.setItem('userId', userId); }
	// document.getElementById('userList').value = userId;

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
	var userList = document.getElementById("userList");

	// Clear the list (if you want to refresh its contents)
	userList.innerHTML = '';

	users = {
		felix:{ name: 'felix', color: 'blue' },
		amanda:{ name: 'amanda', color: 'green' },
		tom:{ name: 'tom', color: 'maroon' },
		gul:{ name: 'gul', color: 'red' },
		mitra:{ name: 'mitra', color: 'hotpink' },
		mac:{ name: 'mac', color: 'orange' }
	}; // You can customize this array
	let items = Object.values(users);
	for (var i = 0; i < items.length; i++) {
		var li = document.createElement("li");
		li.innerHTML = items[i].name;
		mStyle(li,{fg:items[i].color,display:'inline',maleft:10,cursor:'pointer'})
		items[i].live = {div:li};
		li.onclick = ev=>setUserId(ev.target.innerText);
		userList.appendChild(li);
	}
}
function getMousePosition(parent, ev) {
	const rect = parent.getBoundingClientRect();
	const x = ev.clientX - rect.left;
	const y = ev.clientY - rect.top;
	return { x, y };
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
	let item = users[name];
	let elem = iDiv(item);
	//console.log('elem',elem)
	// Remove 'selected' class from all list items
	var allItems = document.querySelectorAll("#userList li");
	allItems.forEach(el=> {		el.classList.remove("selected");	});

	// Add 'selected' class to the clicked item
	elem.classList.add("selected");
	//console.log('selected user',item);

	userId = item.name; //document.getElementById('userList').value;
	sessionStorage.setItem('userId', userId);
}

