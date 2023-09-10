onload = start;

function start() { test2_startCollection(); }
function test2_startCollection(){

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

function _allowDrop(event) {
	event.preventDefault(); // Prevent the default behavior of the drop event
}
function _dropImage(event) {
	event.preventDefault(); // Prevent the default behavior of the drop event

	// Get the data (URL) of the dropped item
	const imageURL = event.dataTransfer.getData("URL");

	// Set the source of the image element to the dropped URL
	const imageElement = document.getElementById("image");
	imageElement.src = imageURL;
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














