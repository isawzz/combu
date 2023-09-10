document.addEventListener('DOMContentLoaded', function () {
	const imageContainer = document.getElementById('image-container');
	const fileInput = document.getElementById('file-input');

	// Function to load images from a directory and display them
	function loadImages() {
			fetch('load_images.php')
					.then(response => response.json())
					.then(data => {
							data.forEach(image => {
									const imgElement = document.createElement('img');
									imgElement.src = image.path;
									imgElement.style.height = '300px';

									const label = document.createElement('input');
									label.type = 'text';
									label.value = image.filename;
									label.addEventListener('keypress', (e) => {
											if (e.key === 'Enter') {
													updateFilename(image.filename, label.value);
											}
									});

									imageContainer.appendChild(imgElement);
									imageContainer.appendChild(label);
							});
					})
					.catch(error => console.error(error));
	}

	// Function to update the filename on the server
	function updateFilename(filename, newFilename) {
			fetch('update_filename.php', {
					method: 'POST',
					headers: {
							'Content-Type': 'application/json',
					},
					body: JSON.stringify({ filename, newFilename }),
			})
			.then(response => response.json())
			.then(data => {
					if (data.success) {
							console.log('Filename updated successfully.');
					} else {
							console.error('Failed to update filename.');
					}
			})
			.catch(error => console.error(error));
	}

	// Function to trigger file input
	function uploadImage() {
			fileInput.click();
	}

	// Event listener for file input change
	fileInput.addEventListener('change', function () {
			const files = fileInput.files;
			if (files.length > 0) {
					const file = files[0];
					const formData = new FormData();
					formData.append('image', file);

					fetch('upload_image.php', {
							method: 'POST',
							body: formData,
					})
					.then(response => response.json())
					.then(data => {
							if (data.success) {
									console.log('Image uploaded successfully.');
									loadImages();
							} else {
									console.error('Failed to upload image.');
							}
					})
					.catch(error => console.error(error));
			}
	});

	// Load images when the page loads
	loadImages();
});
