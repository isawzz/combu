
onload = start

function start() {
	// Usage example:
	const imgElement = document.querySelector('img');
	uploadImage(imgElement, 'myImage.png');

}

async function uploadImage(imgElement, filename) {
	// Convert image to base64
	const canvas = document.createElement('canvas');
	canvas.width = imgElement.naturalWidth;
	canvas.height = imgElement.naturalHeight;
	const ctx = canvas.getContext('2d');
	ctx.drawImage(imgElement, 0, 0);
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

