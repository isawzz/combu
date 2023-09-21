
//#region testa
async function uploadSmallImage(ev) {
	// Convert image to base64
	let elem = mBy('img1');
	let filename = 'hallo3.png'

	if (isdef(ev)) {

		let label = ev.target;
		elem = label.parentNode.firstChild;
		filename = label.value + '.png';
		console.log('YES!!!!')
	}
	console.log('uploading!!!!', filename)

	const canvas = document.createElement('canvas');
	let [w, h] = [elem.offsetWidth, elem.offsetHeight];
	console.log('w', w, 'h', h);
	canvas.width = elem.width;
	canvas.height = elem.height;
	const ctx = canvas.getContext('2d');
	ctx.drawImage(elem, 0, 0, w, h);
	const imageData = canvas.toDataURL('image/png');

	// Send the image data to the server
	const response = await fetch('upload.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `imageData=${encodeURIComponent(imageData)}&filename=${encodeURIComponent(filename)}`,
	});

	if (response.ok) {
		console.log('Image uploaded successfully!');
	} else {
		console.error('Error uploading image!');
	}
}

async function sendGet(x) {
	const response = await fetch('server.php?action=' + x);
	//const data = await response.json();
	const astext = await response.text();
	const data = tryJSONParse(astext);
	return data;
}
function fetchImage(url) {
	fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.blob(); // Get the image data as a blob
		})
		.then((imageBlob) => {
			// Create an Object URL for the blob
			const imageUrl = URL.createObjectURL(imageBlob);

			// Display the image on the page (you can modify this part as needed)
			const imageElement = document.createElement('img');
			imageElement.src = imageUrl;
			document.body.appendChild(imageElement);

			// Clean up the Object URL when done to prevent memory leaks
			URL.revokeObjectURL(imageUrl);
		})
		.catch((error) => {
			console.error('Error fetching image:', error);
		});
}
function getImageFromPhpHost() {
	// URL of the PHP script that serves the image
	const imageUrl = '../animals/aaron-burden-3z8kVEYCYxY-unsplash.jpg';

	// Make a GET request to the PHP script
	fetch(imageUrl)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.blob(); // Get the image data as a blob
		})
		.then((imageBlob) => {
			// Create an Object URL for the blob
			const imageUrl = URL.createObjectURL(imageBlob);

			// Display the image on the page (you can modify this part as needed)
			const imageElement = document.createElement('img');
			imageElement.src = imageUrl;
			document.body.appendChild(imageElement);

			// Clean up the Object URL when done to prevent memory leaks
			URL.revokeObjectURL(imageUrl);
		})
		.catch((error) => {
			console.error('Error fetching image:', error);
		});
}

//#endregion

//#region testphp
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
	const goal = getMousePosition(Canvas, ev)
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
	U.goal = getMousePosition(Canvas, ev);
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
//#endregion

//#region tiere start

function showHome(){for(const id of ['New','Browse']) mStyle(`d${id}Collection`,{display:'none'})}
function onclickNew(){showHome();mStyle('dNewCollection',{display:'block'})}
function onclickBrowse(){showHome();mShow('dBrowseCollection')}

function showNavbar(titles,funcNames) {
	if (nundef(funcNames)){
		//standard is that funcs are named: onclick${title}
		funcNames = titles.map(x=>`onclick${capitalize(x)}`);
	}
  let html = `
    <nav class="navbar navbar-expand navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">`;
	for(let i=0;i<titles.length;i++){
		html+=`
					<li class="nav-item active">
					<a class="nav-link hoverHue" href="#" onclick="${funcNames[i]}()">${titles[i]}</a>
				</li>
			`;
	}
	html+=`
			</ul>
			</div>
		</nav>
		`;
  document.body.innerHTML += html;
}
function test1_loadAllAnimals() {
	loadImages();
}
function test0_uncommentIndexHtml() {
	img1.src = 'uploads/hallo3.png';
}
async function uploadSmallImage(ev) {
	// Convert image to base64
	let elem = mBy('img1');
	let filename = 'hallo3.png'

	if (isdef(ev)) {

		let label = ev.target;
		elem = label.parentNode.firstChild;
		filename = label.value + '.png';
		console.log('YES!!!!')
	}
	console.log('uploading!!!!',filename)

	const canvas = document.createElement('canvas');
	let [w, h] = [elem.offsetWidth, elem.offsetHeight];
	console.log('w', w, 'h', h);
	canvas.width = elem.width;
	canvas.height = elem.height;
	const ctx = canvas.getContext('2d');
	ctx.drawImage(elem, 0, 0, w, h);
	const imageData = canvas.toDataURL('image/png');

	// Send the image data to the server
	const response = await fetch('upload.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `imageData=${encodeURIComponent(imageData)}&filename=${encodeURIComponent(filename)}`,
	});

	if (response.ok) {
		console.log('Image uploaded successfully!');
	} else {
		console.error('Error uploading image.');
	}
}
function addImageWithLabel(image, dParent, imgStyles, labelStyles, imgSrc, labelText) {
	let mp0Style = { margin: 0, padding: 0, display: 'block' };
	let d = mDiv(dParent, mp0Style);
	let imgStyle = addKeys(mp0Style, { h: 250 });
	let img = mDom(d, imgStyle, { tag: 'img', src: image.path });
	img.onload = () => {
		let labelStyle = addKeys(mp0Style, { w: img.offsetWidth, box: true });
		let label = mDom(d, {}, { tag: 'input', type: 'text', value: rName() });
		mStyle(label, labelStyle);
		label.onclick = ev => ev.target.select();
		label.onkeydown = ev => { if (ev.keyCode === 13) { uploadSmallImage(ev) } }
	}
}
function loadImages() {
	const imageContainer = document.getElementById('image-container');
	mFlexWrap(imageContainer);
	mStyle(imageContainer, { gap: 10, margin: 0, padding: 0 })

	fetch('load_images.php')
		.then(response => response.json())
		.then(data => {
			data.forEach(image => addImageWithLabel(image, imageContainer));
		})
		.catch(error => console.error(error));
}

function allowDrop(event) {	event.preventDefault(); }

function dropImage(event) {
	event.preventDefault(); // Prevent the default behavior of the drop event

	// Get the data (URL) of the dropped item
	const imageURL = event.dataTransfer.getData("URL");

	// Set the source of the image element to the proxy endpoint
	const imageElement = document.getElementById("image");
	imageElement.src = `proxy.php?url=${encodeURIComponent(imageURL)}`;

	imageElement.onload = ev=>uploadNewImage(ev,imageURL);
	// // After displaying the image, upload it to the server
	// uploadImage(imageURL);
}
var N=10;
async function uploadNewImage(ev,url) {
	// Convert image to base64
	let elem = ev.target;
	let filename;
	//https://wallpapers.com/images/high/cat-pictures-puze2vwtzbj5s4tq.webp
	filename = stringAfterLast(url,'/');
	filename = stringBefore(filename,'-');
	filename += `${N++}.png`;

	console.log('filename',filename)

	console.log('uploading!!!!',filename)

	const canvas = document.createElement('canvas');
	let [w, h] = [elem.offsetWidth, elem.offsetHeight];
	console.log('w', w, 'h', h);
	canvas.width = elem.width;
	canvas.height = elem.height;
	const ctx = canvas.getContext('2d');
	ctx.drawImage(elem, 0, 0, w, h);
	const imageData = canvas.toDataURL('image/png');

	// Send the image data to the server
	const response = await fetch('upload.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `imageData=${encodeURIComponent(imageData)}&filename=${encodeURIComponent(filename)}`,
	});

	if (response.ok) {
		console.log('Image uploaded successfully!');
	} else {
		console.error('Error uploading image.');
	}
}
function mImageDropperForm(dParent) {
	//	let d = mDiv(dParent, { display: 'flex' });

	let html = `
		<div id="dNewCollection" style="display:flex;align-items:center;position:relative">
			<div style='width:400px;text-align:center;height:400px;'>
				<img style='margin-top:50px;height:300px;' id="image">
				<div style='position:absolute;width:300px;height:300px;left:50px;top:50px;border:dotted 1px black'  ondragover="allowDrop(event)" ondrop="dropImage(event)">drop here!</div>
			</div>
			<div id="dfNew" style="display:block">
				<form>
					<label for="category">Category:</label><br>
					<input type="text" id="category" name="category" placeholder="Enter category"><br><br>
					<label for="name">Name:</label><br>
					<input type="text" id="name" name="name" placeholder="Enter name">
				</form>
			</div>
		</div>

		`;
	html = `
		<div id="dNewCollection" style="display:flex;align-items:center;position:relative">
			<div style='width:400px;text-align:center;height:400px;'>
				<img style='margin-top:50px;height:300px;' id="image">
				<div style='position:absolute;width:300px;height:300px;left:50px;top:50px;border:dotted 1px black'  ondragover="allowDrop(event)" ondrop="dropImage(event)">drop here!</div>
			</div>
			<div id="dfNew" style="display:block;text-align:right">
				<form>
					<span>Category:</span>
					<input type="text" id="category" name="category" placeholder="Enter category"><br>
					<span>Name:</span>
					<input type="text" id="name" name="name" placeholder="Enter name">
				</form>
			</div>
		</div>

		`;
	html = `
		<div id="dNewCollection" style="display:flex;align-items:center;position:relative">
			<div style='width:400px;text-align:center;height:400px;'>
				<img style='margin-top:50px;height:300px;' id="image">
				<div style='position:absolute;width:300px;height:300px;left:50px;top:50px;border:dotted 1px black' ondragover="allowDrop(event)" ondrop="dropImage(event)">drop here!</div>
			</div>
			<div id="dfNew" style="display:block;">
				<form>
					<span>Category:</span><br>
					<input type="text" id="category" name="category" placeholder="Enter category"><br><br>
					<span>Name:</span><br>
					<input type="text" id="name" name="name" placeholder="Enter name">
				</form>
			</div>
		</div>

		`;
	dParent = toElem(dParent);
	dParent.innerHTML = html;
}

//#endregion