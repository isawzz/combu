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
async function mGetYaml(path='../base/assets/m.txt'){
	let res = await fetch(path);
	let text = await res.text();
	let di = jsyaml.load(text);
	//console.log('di',di);
	return di;

}
async function mPostYaml(o,path='../base/assets/m.txt') {
	const start = performance.now();
	const response = await fetch('post_yaml.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({content:jsyaml.dump(o),filename:path})
		// body: JSON.stringify({content:'hallo',filename:'m.yaml'})
		// body: JSON.stringify({content:jsyaml.dump(o),filename:fname})
	});
	const end = performance.now();

	const latency = end - start;
	//showLatency(latency);

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

function showNavbar(pageTitle, titles, funcNames) {
	if (nundef(funcNames)) {
		//standard is that funcs are named: onclick${title}
		funcNames = titles.map(x => `onclick${capitalize(x)}`);
	}
	let html = `
    <nav class="navbar navbar-expand navbar-light bg-light">
      <a class="navbar-brand" href="#">${pageTitle}</a>
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
	//let inner = document.body.innerHTML;
	mInsertFirst(document.body,mCreateFrom(html));
	//document.body.insertAdjacentElement(0,mCreateFrom(html)); //innerHTML += html + inner;

}
