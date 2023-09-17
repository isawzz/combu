
async function test10_getPostM(){
	M = await mGetYaml('../base/assets/m.txt'); 
	console.log('M',M);
	console.log('...saving',await mPostYaml(M))
}
async function test9_getM(){
	let res = await fetch('../base/assets/m.txt');
	let text = await res.text();
	let di = jsyaml.load(text);
	console.log('di',di);
	return di;
}
async function test8_saveM(){
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

	let msg = await mPostYaml(M); console.log(msg)


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
	for(const fname of ['c52']){
		M[fname] = jsyaml.load(content[fname]);
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
	showNavbar('HELLO',['home', 'new']);
	let emojiNames = {};
	for (const dir of ['activity', 'food', 'nature', 'objects', 'people', 'travel']) {
		let data = emojiNames[dir] = await loadFilenames('../base/assets/img/emoji/' + dir)
		// for (const k in data) console.log(k, data[k]); //.map(x=>x.filename))
	}
	console.log('emoji names', emojiNames);
	return emojiNames;
}
async function test2_loadFilenames() {
	showNavbar('HELLO',['home', 'new'])
	let data = await loadFilenames('../base/assets/')
	for (const k in data) console.log(k, data[k]); //.map(x=>x.filename))
}
async function test1_allEmoji() {
	showNavbar('HELLO',['home', 'new'])
	let data = await loadEmojiNames();
	for (const k in data) console.log(k, data[k]); //.map(x=>x.filename))
}
async function test0_foodEmoji() {
	showNavbar('HELLO',['home', 'new'])
	let data = await loadEmojiNames('food');
	for (const k in data) console.log(k, data[k]); //.map(x=>x.filename))
}
function test_rUID_fromUID_fromTimestamp() {
	let id = rUID();
	let ts = fromUID(id);
	let dt = fromTimestamp(ts, { year: '2-digit', month: '2-digit', day: '2-digit' })
	console.log('datetime:', dt);
}
