onload = start;

async function start() {
	//test6_perftest(); //test5_emolistAll(); //test4_emolist(); //test3_loadFilenamesList(); //test0_foodEmoji(); //	test1_allEmoji();
	let assets = await test7_loader();
	console.log('assets', assets);
	let nature = assets.nature.files;
	let k = rChoose(nature);
	console.log(k); console.log('syms', Syms, SymKeys, ByGroupSubgroup)
	//nenn die daten M
	let all = [];
	M.emoji = { list: all, ext: 'png' };
	for (const k of ['activity', 'food', 'nature', 'objects', 'people', 'travel']) {
		let lst = M.emoji[k] = assets[k].files.map(x => stringBefore(x, '.'));
		lst.map(x => all.push(x))
	}
	all = [];
	M.animals = { list: all, ext: 'png' };
	for (const k of ['bird', 'cat', 'earth', 'insect', 'sea']) {
		let lst = M.animals[k] = assets[k].files.map(x => stringBefore(x, '.'));
		lst.map(x => all.push(x))
	}
	M.users = { list: assets.users.files.map(x => stringBefore(x, '.')), ext: 'jpg' };

	console.log('M',M);

}
async function test7_loader() {
	//pick a random nature emo
	let start = performance.now();
	let assets = {};
	let dirs = [];
	for (const dir of ['activity', 'food', 'nature', 'objects', 'people', 'travel']) {
		dirs.push('../base/assets/img/emoji/' + dir);
	}
	for (const dir of ['bird', 'cat', 'earth', 'insect', 'sea']) {
		dirs.push('../base/assets/img/animals/' + dir);
	}
	for (const s of ['users']) {
		dirs.push('../base/assets/img/' + s);
	}
	assets = await mFetch('get_filenames.php?path=' + dirs.join(','));

	for(const fname of ['c52']){
		dirs.push('../base/assets/' + fname + '.yaml');
	}
	let content = await mFetch('get_content.php?path=' + dirs.join(','));
	console.log('content',content)
	for(const c in content){
		
	}





	let end = performance.now();
	let latency = end - start; //console.log('one call:', latency, aggregate(assets))
	return assets;
}
async function test6_perftest() {
	var start = performance.now();
	let emos1 = {};
	for (const dir of ['activity', 'food', 'nature', 'objects', 'people', 'travel']) {
		let data = emos1[dir] = await mFetch('get_filenames.php?path=' + '../base/assets/img/emoji/' + dir)
		// for (const k in data) console.log(k, data[k]); //.map(x=>x.filename))
	}
	var end = performance.now();
	var latency = end - start; console.log('extra laden:', latency, aggregate(emos1))

	console.log('_______________')
	start = performance.now();
	let emos2 = {};
	let dirs = [];
	for (const dir of ['activity', 'food', 'nature', 'objects', 'people', 'travel']) {
		dirs.push('../base/assets/img/emoji/' + dir);
	}
	emos2 = await mFetch('get_filenames.php?path=' + dirs.join(','));
	end = performance.now();
	latency = end - start; console.log('one call:', latency, aggregate(emos2))

	console.log('_______________')
	start = performance.now();
	let emos3 = {};
	emos3 = await mFetch('get_filenames.php?path=' + '../base/assets/img/emoji');
	end = performance.now();
	latency = end - start; console.log('all emoji:', latency, aggregate(emos3))

	console.log('_______________')
	start = performance.now();
	let assets = {};
	assets = await mFetch('get_filenames.php?path=' + '../base/assets');
	end = performance.now();
	latency = end - start; console.log('all base:', latency, aggregate(assets))
}
async function test5_emolistAll() {
	let data = await loadFilenames('../base/assets/img/emoji');
	let emolist = aggregate(data);
	console.log('list', emolist); //3701 emoji pics!
}
async function test4_emolist() {
	let emos = await test3_loadFilenamesList(); //test0_foodEmoji(); //	test1_allEmoji();
	let emolist = aggregate(emos);
	console.log('list', emolist);

}
async function test3_loadFilenamesList() {
	showNavbar(['home', 'new']);
	let emojiNames = {};
	for (const dir of ['activity', 'food', 'nature', 'objects', 'people', 'travel']) {
		let data = emojiNames[dir] = await loadFilenames('../base/assets/img/emoji/' + dir)
		// for (const k in data) console.log(k, data[k]); //.map(x=>x.filename))
	}
	console.log('emoji names', emojiNames);
	return emojiNames;
}
function onclickHome() { }
function onclickNew() {
	mImageDropperForm('dMain')
}

function mImageDropperForm(dParent) {
	let d = mDiv(dParent, { display: 'flex' });

}
function allowDrop(event) { event.preventDefault(); }

function dropImage(event) {
	event.preventDefault(); // Prevent the default behavior of the drop event

	// Get the data (URL) of the dropped item
	const imageURL = event.dataTransfer.getData("URL");

	// Set the source of the image element to the proxy endpoint
	const imageElement = document.getElementById("image");
	imageElement.src = `proxy.php?url=${encodeURIComponent(imageURL)}`;

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




