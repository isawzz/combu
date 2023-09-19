
async function start() {
	S.type = detectSessionType();
	initCodingUI();

	//#region tests

	// let text=await intersectAnimeAndAllfuncs();
	// let [g, text, old] = await codebaseExtendFromProject('hltest');
	let [text, css] = await closureFromProject('tiere', ['expand', 'drop'], ['allowDrop','dropImage']);

	// let csstext = await cssbaseExtend('coding');
	// let csstext = await cssSelectFrom('../base/alibs/transition.css',['keyframes']);
	// let csstext = await cssSelectFrom('../base/alibs/bs4/bootstrap.css',['class']);
	// let csstext = await cssSelectFrom('../base/alibs/w3.css',['root','class','keyframes']);
	//downloadAsText(text, 'closure', 'js');
	//downloadAsText(css, 'final', 'css');
	//#endregion
	AU.ta.value = text; //css; //'hallo, na ENDLICH!!!!!!!!!!';

}

function downloadAsText(s, filename, ext = 'txt') {
  saveFileAtClient(
    filename + "." + ext,
    "data:application/text",
    new Blob([s], { type: "" }));
}
function saveFileAtClient(name, type, data) {
  if (data != null && navigator.msSaveBlob) return navigator.msSaveBlob(new Blob([data], { type: type }), name);
  let a = document.createElement('a');
  a.style.display = 'none';
  let url = window.URL.createObjectURL(new Blob([data], { type: type }));
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  simulateClick(a);
  setTimeout(function () {
    window.URL.revokeObjectURL(url);
    a.remove();
  }, 500);
}
function simulateClick(elem) {
  var evt = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
  var canceled = !elem.dispatchEvent(evt);
}

async function extractKeywords(path,trimmedlines=false) {
	let text = await route_path_text(path);
	let lines = text.split('\n');
	// console.log('lines',lines);
	let kws = [];
	for (const line of lines) {
		let l=trimmedlines?line.trim():line;
		if (l.startsWith('function')) kws.push(ithWord(l, 1, true));
		if (l.startsWith('async')) kws.push(ithWord(l, 2, true));
		if (l.startsWith('const')) kws.push(ithWord(l, 1, true));
		if (l.startsWith('var')) kws.push(ithWord(l, 1, true));
		if (l.startsWith('class')) kws.push(ithWord(l, 1, true));
	}
	return kws;
}
async function intersectAnimeAndAllfuncs(){
	let kws = await extractKeywords('../animex/anime.js',true);
	console.log('kws',kws); //return;
	let kws1 = await extractKeywords('../basecommon/allf.js');
	let inter = intersection(kws, kws1);
	console.log('keywords', inter);
	text=inter.join()
	return text
}



















