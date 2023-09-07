var canvas, ctx, userId, users, FRESH_START = false, FPS = 200;
onload = start

async function start() {
	test1(); //macht canvas und sets userId und U
	let data = Session = await sendPostSimple();
	animateAllPlayers(data); //animatePlayer('amanda',data); //showPlayer('amanda',data); //showGoal(data.amanda.goal,data.amanda.color)
}
function animateAllPlayers(data){
	data.users.map(x=>animatePlayer(x,data))
}
function animatePlayer(id,data,steps=10){
	showPlayer(id,data);
	if (steps>0) setTimeout(()=>animatePlayer(id,data,steps-1),200)
}
function showPlayer(id,data){
	let pl = data[id];
	pl.pos = movePointCloser(pl.pos,pl.goal);
	showGoal(pl.goal,pl.color);
	showPiece(pl.pos,pl.color);
}
function movePointCloser(xy, xyGoal, percent=10) {
	let dx = xyGoal.x - xy.x;
	let dy = xyGoal.y - xy.y;
	//console.log('dx,dy',dx,dy)
	let frac = percent / 100;
	return { x: xy.x + dx * frac, y: xy.y + dy * frac }
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

