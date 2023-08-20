onload = _start;

async function _start() {
	let text = await fetch('../prepper/emoji.txt').then(x => x.text());
	let lines = getQualifiedLines(text);

	let newtext = '';
	for (const line of lines) {
		let result = extractStrings(line);
		newtext += '\n' + result.key + ':' + result.value;

	}
	downloadAsText(newtext, 'aaa')

	// Test
	let sampleInput = lines[0]; //"Hello; World! #42E56.789 more text";
	let result = extractStrings(sampleInput);
	console.log(result); // Expected output: ['Hello', '789']
}
async function _start() {
	return;
	let text = await fetch('../prepper/emoji.txt').then(x => x.text());
	let di = getQualifiedLines(text);
	let newdi = {};
	for (const group in di) {
		for (const subgroup in di[group]) {
			let lines = di[group][subgroup];
			for (const line of lines) {
				let result = extractStrings(line);
				//newtext += '\n' + result.key + ':' + result.value;
				let o = {}; o[result.key] = result.value;
				lookupAddToList(newdi, [group, subgroup], o); //`${result.key}: ${result.value}`)
			}
		}
	}
	//console.log('newdi', newdi); //downloadAsYaml(newdi, 'aaa')
	// Usage
	//changeFavicon('path_to_new_favicon.ico');
	// Usage
	// setUnicodeFavicon('❤');
	// let link = mCreateFrom(`<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>&#x1F989;</text></svg>">`);
	// document.getElementsByTagName('head')[0].appendChild(link);

	//	setFavicon('1F61A')
	// Test
	// let sampleInput = lines[0]; //"Hello; World! #42E56.789 more text";
	// let result = extractStrings(sampleInput);
	// console.log(result); // Expected output: ['Hello', '789']
}
function setUnicodeFavicon(character) {
	// Create a canvas element and set dimensions
	let canvas = document.createElement('canvas');
	canvas.width = 32; // Favicon size
	canvas.height = 32;

	let ctx = canvas.getContext('2d');

	// Set background color, font, and draw the character
	ctx.fillStyle = '#ffffff'; // Background color
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = '#000000'; // Text color
	ctx.font = '24px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(character, canvas.width / 2, canvas.height / 2);

	// Set the generated image as favicon
	let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
	link.type = 'image/x-icon';
	link.rel = 'shortcut icon';
	link.href = canvas.toDataURL("image/png");

	document.getElementsByTagName('head')[0].appendChild(link);
}


function changeFavicon(newFaviconUrl) {
	let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
	link.type = 'image/x-icon';
	link.rel = 'shortcut icon';
	link.href = newFaviconUrl;

	// Append or replace the favicon in the document head
	document.getElementsByTagName('head')[0].appendChild(link);
}
function setFavicon(unicode) {
	// let link = `<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>&#x${unicode};</text></svg>">`
	let link = mCreateFrom(`<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>&#x1F989;</text></svg>">`);
	document.getElementsByTagName('head')[0].appendChild(link);
}

function extractStrings(inputStr) {
	// Extract the string before the first ';'
	let firstPart = inputStr.split(';')[0].trim();

	// Find the last occurrence of '#' and then look for 'E' followed by a number with a decimal
	let lastHashIndex = inputStr.lastIndexOf('#');
	let ePattern = /E([\d]+\.[\d]+)/g;
	let matches = [...inputStr.slice(lastHashIndex).matchAll(ePattern)];
	let secondPart = '';

	if (matches.length) {
		let x = matches[matches.length - 1];
		console.log('x', x, '\n', x[2], '\n', x.input)
		// Extract the string after the decimal
		secondPart = x.input.split(x[1])[1].trim();
	}

	return { key: secondPart, value: firstPart };
	return [firstPart, secondPart];
}
function getQualifiedLines(text) {
	// Split the text by newline to get an array of lines
	let lines = text.split('\n');

	// Filter the lines that contain the string 'qualified'
	let qualifiedLines = lines.filter(line => line.includes('qualified'));
	return qualifiedLines;
}

function getQualifiedLines(text) {
	// Split the text by newline to get an array of lines
	let lines = text.split('\n');
	let group, subgroup;
	let di = {};
	for (const line of lines) {
		if (line.startsWith('# group:')) group = stringAfter(line, '# group:').trim();
		if (line.startsWith('# subgroup:')) subgroup = stringAfter(line, '# subgroup:').trim();
		if (line.includes('qualified')) lookupAddToList(di, [group, subgroup], line);
	}
	return di;
}







