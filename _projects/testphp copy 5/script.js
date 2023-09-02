var canvas, ctx, userId;
onload = start

function start() {
	test0();
}
function test0() {
	userId = sessionStorage.getItem('userId'); // Check if a userId already exists in sessionStorage
	console.log('userId from sessionStorage',userId)
	if (!userId) { userId = "felix"; sessionStorage.setItem('userId', userId); }
	document.getElementById('userIdSelect').value = userId;

	canvas = document.getElementById('gameCanvas'); ctx = canvas.getContext('2d');
	canvas.onclick = sendMousePosition;
}
async function sendMousePosition(ev) {
	const message = document.getElementById('messageInput').value;
	const timestamp = new Date().getTime();
	const goal = getMousePosition(canvas,ev)
	const pos = {x:goal.x-20,y:goal.y-20}
	console.log('userId',userId)

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
function showPiece(pos){
	drawCircleC(pos,8,'yellow'); //zeichne auch dem canvas ein rect mit mittelpunkt pos und groesse 10px
}
function showGoal(pos){
	drawRectC(pos); //zeichne auch dem canvas ein rect mit mittelpunkt pos und groesse 10px
}
function drawCircleC(pos,sz=10,color='red'){
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(pos.x, pos.y, sz/2, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
}
function drawRectC(pos,sz=10,color='red'){
	// C ... ctx is set!
	ctx.fillStyle = color;
	ctx.fillRect(pos.x - sz/2, pos.y - sz/2, sz, sz);

}
function showLatency(latency){
	document.getElementById('latencyOutput').innerText = `Latency: ${latency.toFixed(2)}ms`;
}
function getMousePosition(parent,ev){
	const rect = parent.getBoundingClientRect();
	const x = ev.clientX - rect.left;
	const y = ev.clientY - rect.top;
	return {x,y};
}
function setUserId() {
	userId = document.getElementById('userIdSelect').value;
	sessionStorage.setItem('userId', userId);
}

async function sendPOST() {
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
async function resetUsers() {
	const response = await fetch('server.php?action=reset');
	const data = await response.json();

	const textarea = document.getElementById('messagesOutput');
	textarea.value = JSON.stringify(data, null, 2);
	textarea.scrollTop = textarea.scrollHeight;
}

async function downloadPositions() {
	const response = await fetch('server.php?action=positions');
	const data = await response.json();

	const textarea = document.getElementById('messagesOutput');
	textarea.value = JSON.stringify(data, null, 2);
	textarea.scrollTop = textarea.scrollHeight;
}
async function downloadMessages() {
	const response = await fetch('server.php?action=download');
	const data = await response.json();

	const textarea = document.getElementById('messagesOutput');
	textarea.value = JSON.stringify(data, null, 2);
	textarea.scrollTop = textarea.scrollHeight;
}

function fillList() {
	var userList = document.getElementById("userList");
	
	// Clear the list (if you want to refresh its contents)
	userList.innerHTML = '';

	var items = ["First item", "Second item", "Third item"]; // You can customize this array

	for(var i = 0; i < items.length; i++) {
			var li = document.createElement("li");
			li.innerHTML = items[i];
			li.onclick = function() {
					setUserId(this);
			};
			userList.appendChild(li);
	}
}

function setUserId(element) {
	// Your logic here
	var itemText = element.innerText;
	console.log(itemText);
}

