async function test1() {
	Canvas = document.getElementById('gameCanvas'); Ctx = Canvas.getContext('2d');
	//canvas.onclick = setGoalPosition;

	Users = await populateUsers();

	if (FRESH_START) { setUserId('amanda'); return; }

	userId = sessionStorage.getItem('userId'); // Check if a userId already exists in sessionStorage
	setUserId(valf(userId, 'mitra'));

	console.log('user set to',U);
	//sendGetReset();
	//startGameloop();
	let data = Session = await sendPostSimple();
	animateAllPlayers(data); //animatePlayer('amanda',data); //showPlayer('amanda',data); //showGoal(data.amanda.goal,data.amanda.color)

}
function test0() {
	Canvas = document.getElementById('gameCanvas'); Ctx = Canvas.getContext('2d');
	Canvas.onclick = sendMousePosition;

	populateUsers();

	if (FRESH_START) { setUserId('amanda'); return; }

	userId = sessionStorage.getItem('userId'); // Check if a userId already exists in sessionStorage
	setUserId(valf(userId, 'felix'));
	// console.log('userId from sessionStorage', userId)
	// if (!userId) { userId = "felix"; sessionStorage.setItem('userId', userId); }
	// document.getElementById('dUsernames').value = userId;

}

