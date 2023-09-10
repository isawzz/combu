

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



