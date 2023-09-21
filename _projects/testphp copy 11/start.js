var Canvas, Ctx, FRESH_START = false, FPS = 200;
onload = start;

async function start() {
	//test4_twemoji();
	let result = await test5(); console.log('DONE:', result);
}
async function test5() {
	//Canvas = document.getElementById('gameCanvas'); 
	Canvas = mDom('dMain', { w: 500, h: 400, bg: '#333', rounding: 12, display: 'inline-block' }, { id: 'canvas', tag: 'canvas', width: 500, height: 300 });
	Ctx = Canvas.getContext('2d');

	//user menu

	// Session = await getSession();
	// ClientId = getClientId();

	// //wenn jetzt die id in der user list ist, dann log in
	// if (isdef(Session.users) && Session.users.includes(ClientId)) { 
	// 	setClient(ClientId); 
	// } else console.log('no users available!')

	return 'no result'; //{Session,ClientId};
}

async function onclickReset() { console.log('session reset:', await sendPhpCommand('reset')); }

async function sendPhpCommand(command) {
	let type = detectSessionType();
	let url = 'api.php?action=';
	if (type == 'live') url = 'http://localhost:8080/ma/basecommon/' + url;
	url += command;
	const response = await fetch(url);
	//const data = await response.json();
	const astext = await response.text();
	const data = tryJSONParse(astext);
	return data;
}



























function test4_twemoji() {
	mBy('dUsernames').innerHTML = twemoji.parse('😄');
}
async function test3() { return await sendGetReset(); }

async function test2() {
	Canvas = document.getElementById('gameCanvas'); Ctx = Canvas.getContext('2d');
	Session = await getSession();
	ClientId = getClientId();

	//wenn jetzt die id in der user list ist, dann log in
	if (isdef(Session.users) && Session.users.includes(ClientId)) {
		setClient(ClientId);
	} else console.log('no users available!')

	return { Session, ClientId };
}
function setClient(id) {
	ClientId = id;
	sessionStorage.setItem('ClientId', ClientId);
}
function showClientLoggedIn() {
	//assumes Session.users.includes(ClientId) && Session[ClientId] exists
	ClientData.user = jsCopy(Session[ClientId]);

	let elem = mBy(name);
	//console.log('elem',elem)
	// Remove 'selected' class from all list items
	var allItems = document.querySelectorAll("#dUsernames div");
	allItems.forEach(el => { el.classList.remove("selected"); });

	// Add 'selected' class to the clicked item
	elem.classList.add("selected");
	//console.log('selected user',item);

	userId = item.id = item.name; //document.getElementById('dUsernames').value;
	item.pos = item.startPos;
	item.goal = getCanvasCenter();
	sessionStorage.setItem('userId', userId);
	mBy('dLoggedInAs').innerHTML = `logged in as <span style="color:${item.color}">${name}</span>`
}
function getClientId() { return ClientId = valf(sessionStorage.getItem('ClientId'), 'guest'); }

async function getSession() {
	let type = detectSessionType();
	if (type == 'live') { // live-server always starts with empty session!
		if (isEmpty(Session))
			return Session;
	} else { // php or telecave

		return await sendGet('session');
	}


	//ich hab jetzt in Session.users die user list, und in ClientData die id und color.
	if (isEmpty(Session)) {
		console.log('session is empty!');
		//sollte load from DB machen damit irgendwelche users hab!
		//was ich brauch ist: users,games,apps,tables
		//wo ist eine gute DB?
		//erstmal nur paar users, thats all

	}


}






