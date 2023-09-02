async function sendPOST() {
	const message = document.getElementById('messageInput').value;
	const timestamp = new Date().getTime();

	const postData = {
			timestamp: timestamp,
			message: message,
			windowId: windowUniqueId  // add the unique ID here
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
async function downloadMessages() {
	const response = await fetch('server.php?action=download');
	const data = await response.json();

	// Format the JSON and display in the textarea
	document.getElementById('messagesOutput').value = JSON.stringify(data, null, 2);
}
function generateUniqueId() {
	const array = new Uint32Array(4);
	window.crypto.getRandomValues(array);
	return Array.from(array).map(val => val.toString(16)).join('-');
}

// This ID will be unique per browser window/tab
const windowUniqueId = generateUniqueId();
