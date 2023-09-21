onload = start;

function start() { test1_loadAllAnimals(); }

async function onenterImageLabel(ev) {
	let [elem, filename] = getElemAndFilename(ev);
	console.log('uploading!!!!', filename);
	let data = await uploadSmallImage(elem, filename);
	console.log('data', data);
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
		// label.onkeydown = ev => { if (ev.keyCode === 13) { uploadSmallImage(ev) } }
		label.onkeydown = ev => { if (ev.keyCode === 13) { onenterImageLabel(ev) } }
	}
}
async function loadImages() {
	const imageContainer = document.getElementById('image-container');
	mFlexWrap(imageContainer);
	mStyle(imageContainer, { gap: 10, margin: 0, padding: 0 })

	let data = await phpGetCommand('load_images', { path: '../base/assets/img/animals/sea' });
	//console.log('loadImages data',data)
	data.forEach(image => addImageWithLabel(image.path, imageContainer));

	// fetch('load_images.php')
	// 	.then(response => response.json())
	// 	.then(data => {
	// 		data.forEach(image => addImageWithLabel(image, imageContainer));
	// 	})
	// 	.catch(error => console.error(error));
}
//#region php helpers
async function phpGetCommand(command, getParams = {}) {

	let url = phpUrl(command);

	url += `?action=${command}`;
	
	for (const k in getParams) { url += `&${k}=${getParams[k]}` }
	console.log('url', url);
	
	const response = await fetch(url);
	//const data = await response.json();
	const astext = await response.text();
	const data = tryJSONParse(astext);
	return data;
}
async function phpPostCommand(command, params = {}, contentType) {
	let url = phpUrl(command);

	let body = `action=${command}`;
	for (const k in params) { body += `&${k}=${params[k]}` }

	if (nundef(contentType)) contentType = 'application/json';
	// Send the image data to the server
	const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': contentType, }, body: body });
	const astext = await response.text();
	const data = tryJSONParse(astext);
	return data;
}
function phpUrl(command){
	let type = detectSessionType();
	let url = 'api.php';
	if (type == 'live') url = 'http://localhost:8080/ma/basecommon/' + url;
	else url = '../basecommon/' + url;
	return url;
}
//#endregion

function tryJSONParse(astext) {
	try {
		const data = JSON.parse(astext);
		return data;
	} catch {
		console.log('text', astext)
		return { message: 'ERROR', text: astext }
	}
}
function getElemAndFilename(ev) {
	let elem = mBy('img1');
	let filename = 'hallo3.png';

	if (isdef(ev)) {
		let label = ev.target;
		elem = label.parentNode.firstChild;
		filename = label.value + '.png';
		console.log('YES!!!!')
	}

	return [elem, filename];

}
function imageEncode(elem) {
	const canvas = document.createElement('canvas');
	let [w, h] = [elem.offsetWidth, elem.offsetHeight];
	console.log('w', w, 'h', h);
	canvas.width = elem.width;
	canvas.height = elem.height;
	const ctx = canvas.getContext('2d');
	ctx.drawImage(elem, 0, 0, w, h);
	const imageData = canvas.toDataURL('image/png');
	return imageData;
}
function imageToString(elem) { return encodeURIComponent(imageEncode(elem)); }
async function uploadSmallImage(elem, filename) {

	let o = { imageData: imageToString(elem), filename: encodeURIComponent(filename) };
	let contentType = 'application/x-www-form-urlencoded';

	return await phpPostCommand('upload_image', o, contentType);
}















