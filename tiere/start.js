onload = start;

function start() {
	test_rUID_fromUID_fromTimestamp()
	showNavbar(['home','new'])
}
function test_rUID_fromUID_fromTimestamp(){
	let id=rUID();
	let ts=fromUID(id);
	let dt=fromTimestamp(ts,{ year: '2-digit', month: '2-digit', day: '2-digit'})
	console.log('datetime:',dt);
}
function onclickHome(){}
function onclickNew(){
	mImageDropperForm('dMain')
}

function mImageDropperForm(dParent){
	let d=mDiv(dParent,{display:'flex'});

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
async function uploadNewImage(ev,url) {
	// Convert image to base64
	let elem = ev.target;
	let filename;
	//https://wallpapers.com/images/high/cat-pictures-puze2vwtzbj5s4tq.webp
	filename = stringAfterLast(url,'/');
	filename = stringBefore(filename,'-');
	filename += `${rUID('_',10)}.png`;

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




