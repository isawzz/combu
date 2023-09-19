onload = start;

async function start() {
	M = await mGetYaml('../base/assets/m.txt'); 
	//test10_getPostM(); //test8_saveM(); //test6_perftest(); //test5_emolistAll(); //test4_emolist(); //test3_loadFilenamesList(); //test0_foodEmoji(); //	test1_allEmoji();
	S.type = detectSessionType(); console.log('session',S)
	showNavbar('Collections', ['home', 'new']);
	onclickNew();
}
function onclickHome() { }
function onclickNew() {
	mImageDropperForm('dMain')
}

function mImageDropperForm(dParent) {
	let html = `
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
function allowDrop(event) { event.preventDefault(); }

function dropImage(event) {
	console.log('HALLO JA BIN DA')
	event.preventDefault(); // Prevent the default behavior of the drop event

	// Get the data (URL) of the dropped item
	const imageURL = event.dataTransfer.getData("URL");

	// Set the source of the image element to the proxy endpoint
	const imageElement = document.getElementById("image");
	imageElement.src = `proxy.php?url=${encodeURIComponent(imageURL)}`;

	//return;

	imageElement.onload = ev => uploadNewImage(ev, imageURL);
	// // After displaying the image, upload it to the server
	// uploadImage(imageURL);
}
async function uploadNewImage(ev, url) {
	// Convert image to base64
	let elem = ev.target;
	let filename;
	//https://wallpapers.com/images/high/cat-pictures-puze2vwtzbj5s4tq.webp
	filename = stringAfterLast(url, '/');
	filename = stringBefore(filename, '-');
	filename += `${rUID('_', 10)}.png`;

	console.log('filename', filename)

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
		console.error('Error uploading image.');
	}
}




