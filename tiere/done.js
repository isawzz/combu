function aggregate(di) {
	let result = [];
	for(const k in di){
		let o=di[k];
		if (isDict(o)) result =result.concat(aggregate(o));
		else if (isList(o)) result = result.concat(o);
		else result.push(o);
	}
	return result;
}
async function mFetch(url){
	const response = await fetch(url); 
	//const data = await response.json();
	const astext = await response.text();
	const data = tryJSONParse(astext);
	return data;
}
async function loadFilenames(path) {
	const response = await fetch('archive_names.php?path='+path);
	//const data = await response.json();
	const astext = await response.text();
	const data = tryJSONParse(astext);
	return data;
}
async function loadEmojiNames(cat) {	return await loadFilenames('../base/assets/img/emoji/'+(isdef(cat)?cat:''));}

function showNavbar(titles, funcNames) {
	if (nundef(funcNames)) {
		//standard is that funcs are named: onclick${title}
		funcNames = titles.map(x => `onclick${capitalize(x)}`);
	}
	let html = `
    <nav class="navbar navbar-expand navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">`;
	for (let i = 0; i < titles.length; i++) {
		html += `
					<li class="nav-item active">
					<a class="nav-link hoverHue" href="#" onclick="${funcNames[i]}()">${titles[i]}</a>
				</li>
			`;
	}
	html += `
			</ul>
			</div>
		</nav>
		`;
	document.body.innerHTML += html;
}
