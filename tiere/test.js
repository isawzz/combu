
async function test2_loadFilenames() {
	showNavbar(['home', 'new'])
	let data = await loadFilenames('../base/assets/')
	for (const k in data) console.log(k, data[k]); //.map(x=>x.filename))
}
async function test1_allEmoji() {
	showNavbar(['home', 'new'])
	let data = await loadEmojiNames();
	for (const k in data) console.log(k, data[k]); //.map(x=>x.filename))
}
async function test0_foodEmoji() {
	showNavbar(['home', 'new'])
	let data = await loadEmojiNames('food');
	for (const k in data) console.log(k, data[k]); //.map(x=>x.filename))
}
function test_rUID_fromUID_fromTimestamp() {
	let id = rUID();
	let ts = fromUID(id);
	let dt = fromTimestamp(ts, { year: '2-digit', month: '2-digit', day: '2-digit' })
	console.log('datetime:', dt);
}
