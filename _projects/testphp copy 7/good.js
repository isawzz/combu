
function drawCircleC(pos, sz = 10, color = 'red') {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(pos.x, pos.y, sz / 2, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
}
function drawRectC(pos, sz = 10, color = 'red') {
	// C ... ctx is set! pos is pos ON CANVAS!!! must be adjusted!!!!!!!
	//console.log('HALLO???', pos, sz, color)
	ctx.fillStyle = color;
	ctx.fillRect(pos.x, pos.y, sz, sz);
	// ctx.fillRect(pos.x - sz / 2, pos.y - sz / 2, sz, sz);

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
	//console.log('list',dUsernames)
}
function getCanvasCenter() {
	return { x: canvas.width / 2, y: canvas.height / 2 };
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
async function sendGetReset() {
	const response = await fetch('server.php?action=reset');
	const data = await response.json();

	const textarea = document.getElementById('messagesOutput');
	textarea.value = JSON.stringify(data, null, 2);
	textarea.scrollTop = textarea.scrollHeight;
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

	userId = item.userId = item.name; //document.getElementById('dUsernames').value;
	item.pos = item.startPos;
	item.goal = getCanvasCenter();
	sessionStorage.setItem('userId', userId);
	mBy('dLoggedInAs').innerHTML = `logged in as <span style="color:${item.color}">${name}</span>`
}
function showPiece(pos, color) {
	drawCircleC(pos, 8, color); //zeichne auch dem canvas ein rect mit mittelpunkt pos und groesse 10px
}
function showGoal(pos, color) {
	drawRectC(pos, 10, color); //zeichne auch dem canvas ein rect mit mittelpunkt pos und groesse 10px
}
