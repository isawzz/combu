function test1() {
	canvas = document.getElementById('gameCanvas'); ctx = canvas.getContext('2d');
	//canvas.onclick = setGoalPosition;

	fillList();

	if (FRESH_START) { setUserId('amanda'); return; }

	userId = sessionStorage.getItem('userId'); // Check if a userId already exists in sessionStorage
	setUserId(valf(userId, 'felix'));

	console.log('user set to',U);
	sendGetReset();
	//startGameloop();

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

