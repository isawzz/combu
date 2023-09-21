onload = start;

function start() { test1_loadAllAnimals(); }
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
		console.error('Error uploading image!');
	}
}

function addImageWithLabel(imagePath, dParent, imgStyles, labelStyles, imgSrc, labelText) {
	let mp0Style = { margin: 0, padding: 0, display: 'block' };
	let d = mDiv(dParent, mp0Style);
	let imgStyle = addKeys(mp0Style, { h: 250 });
	let img = mDom(d, imgStyle, { tag: 'img', src: imagePath });
	img.onload = () => {
		let labelStyle = addKeys(mp0Style, { w: img.offsetWidth, box: true });
		let label = mDom(d, {}, { tag: 'input', type: 'text', value: rName() });
		mStyle(label, labelStyle);
		label.onclick = ev => ev.target.select();
		label.onkeydown = ev => { if (ev.keyCode === 13) { uploadSmallImage(ev) } }
	}
}
async function loadImages() {
	const imageContainer = document.getElementById('image-container');
	mFlexWrap(imageContainer);
	mStyle(imageContainer, { gap: 10, margin: 0, padding: 0 })

	let data = await sendPhpCommand('load_images',{path:'../base/assets/img/animals/sea'});
	//console.log('loadImages data',data)
	data.forEach(image => addImageWithLabel(image.path, imageContainer));

	// fetch('load_images.php')
	// 	.then(response => response.json())
	// 	.then(data => {
	// 		data.forEach(image => addImageWithLabel(image, imageContainer));
	// 	})
	// 	.catch(error => console.error(error));
}
async function sendPhpCommand(command, getParams = {}) {
	let type = detectSessionType();
	let url = 'api.php?action=';
	if (type == 'live') url = 'http://localhost:8080/ma/basecommon/' + url;
	else url = '../basecommon/' + url;
	url += command;
	for (const k in getParams) { url += `&${k}=${getParams[k]}` }
	console.log('url',url);
	const response = await fetch(url);
	//const data = await response.json();
	const astext = await response.text();
	const data = tryJSONParse(astext);
	return data;
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















