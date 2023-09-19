const img = document.createElement('img')
var DA = {};
var dParent;
var M = {};
var S = {};
function allowDrop(event) { event.preventDefault(); }
function arrLast(arr) { return arr.length > 0 ? arr[arr.length - 1] : null; }
function arrRange(from = 1, to = 10, step = 1) { let res = []; for (let i = from; i <= to; i += step)res.push(i); return res; }
function arrRemovip(arr, el) {
  let i = arr.indexOf(el);
  if (i > -1) arr.splice(i, 1);
  return i;
}
function arrShufflip(arr) { if (isEmpty(arr)) return []; else return fisherYates(arr); }
function capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function coin(percent = 50) { return Math.random() * 100 < percent; }
function detectSessionType() {
  let loc = window.location.href;
  DA.sessionType =
    loc.includes('telecave') ? 'telecave' : loc.includes('8080') ? 'php'
      : loc.includes(':40') ? 'nodejs'
        : loc.includes(':60') ? 'flask' : 'live';
  return DA.sessionType;
}
function dropImage(event) {
  console.log('HALLO JA BIN DA')
  event.preventDefault(); 
  const imageURL = event.dataTransfer.getData("URL");
  const imageElement = document.getElementById("image");
  imageElement.src = `proxy.php?url=${encodeURIComponent(imageURL)}`;
  imageElement.onload = ev => uploadNewImage(ev, imageURL);
}
function error(msg) {
  let fname = getFunctionsNameThatCalledThisFunction();
  console.log(fname, 'ERROR!!!!! ', msg);
}
function fisherYates(arr) {
  if (arr.length == 2 && coin()) { return arr; }
  var rnd, temp;
  let last = arr[0];
  for (var i = arr.length - 1; i; i--) {
    rnd = Math.random() * i | 0;
    temp = arr[i];
    arr[i] = arr[rnd];
    arr[rnd] = temp;
  }
  return arr;
}
function getFunctionsNameThatCalledThisFunction() {
  let c1 = getFunctionsNameThatCalledThisFunction.caller;
  if (nundef(c1)) return 'no caller!';
  let c2 = c1.caller;
  if (nundef(c2)) return 'no caller!';
  return c2.name;
}
function isdef(x) { return x !== null && x !== undefined; }
function isEmpty(arr) {
  return arr === undefined || !arr
    || (isString(arr) && (arr == 'undefined' || arr == ''))
    || (Array.isArray(arr) && arr.length == 0)
    || Object.entries(arr).length === 0;
}
function isString(param) { return typeof param == 'string'; }
function last(arr) {
  return arr.length > 0 ? arr[arr.length - 1] : null;
}
function mBy(id) { return document.getElementById(id); }
function mCreateFrom(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}
async function mGetYaml(path = '../base/assets/m.txt') {
  let res = await fetch(path);
  let text = await res.text();
  let di = jsyaml.load(text);
  return di;
}
function mImageDropperForm(dParent) {
  let html = `
    <div id="dNewCollection" style="display:flex;align-items:center;position:relative">
      <div style='width:400px;text-align:center;height:400px;'>
        <img style='margin-top:50px;height:300px;' id="image">
        <div style='position:absolute;width:300px;height:300px;left:50px;top:50px;border:dotted 1px black'  ondragover="allowDrop(event)" ondrop="dropImage(event)">drop here!</div>
      </div>
      <div id="dfNew" style="display:block">
        <form>
          <label for="category">Category:</label><br>
          <input type="text" id="category" name="category" placeholder="Enter category"><br><br>
          <label for="name">Name:</label><br>
          <input type="text" id="name" name="name" placeholder="Enter name">
        </form>
      </div>
    </div>
    `;
  html = `
    <div id="dNewCollection" style="display:flex;align-items:center;position:relative">
      <div style='width:400px;text-align:center;height:400px;'>
        <img style='margin-top:50px;height:300px;' id="image">
        <div style='position:absolute;width:300px;height:300px;left:50px;top:50px;border:dotted 1px black'  ondragover="allowDrop(event)" ondrop="dropImage(event)">drop here!</div>
      </div>
      <div id="dfNew" style="display:block;text-align:right">
        <form>
          <span>Category:</span>
          <input type="text" id="category" name="category" placeholder="Enter category"><br>
          <span>Name:</span>
          <input type="text" id="name" name="name" placeholder="Enter name">
        </form>
      </div>
    </div>
    `;
  html = `
    <div id="dNewCollection" style="display:flex;align-items:center;position:relative">
      <div style='width:400px;text-align:center;height:400px;'>
        <img style='margin-top:50px;height:300px;' id="image">
        <div style='position:absolute;width:300px;height:300px;left:50px;top:50px;border:dotted 1px black' ondragover="allowDrop(event)" ondrop="dropImage(event)">drop here!</div>
      </div>
      <div id="dfNew" style="display:block;">
        <form>
          <span>Category:</span><br>
          <input type="text" id="category" name="category" placeholder="Enter category"><br><br>
          <span>Name:</span><br>
          <input type="text" id="name" name="name" placeholder="Enter name">
        </form>
      </div>
    </div>
    `;
  dParent = toElem(dParent);
  dParent.innerHTML = html;
}
function mInsert(dParent, el, index = 0) { dParent.insertBefore(el, dParent.childNodes[index]); return el; }
function mInsertFirst(dParent, el) { mInsert(dParent, el, 0); }
function nundef(x) { return x === null || x === undefined; }
function onclickNew() {
  mImageDropperForm('dMain')
}
function rChoose(arr, n = 1, func = null, exceptIndices = null) {
  let indices = arrRange(0, arr.length - 1);
  if (isdef(exceptIndices)) {
    for (const i of exceptIndices) removeInPlace(indices, i);
  }
  if (isdef(func)) indices = indices.filter(x => func(arr[x]));
  if (n == 1) {
    let idx = Math.floor(Math.random() * indices.length);
    return arr[indices[idx]];
  }
  arrShufflip(indices);
  return indices.slice(0, n).map(x => arr[x]);
}
function removeInPlace(arr, el) {
  arrRemovip(arr, el);
}
function rLetter(except) { return rLetters(1, except)[0]; }
function rLetters(n, except = []) {
  let all = 'abcdefghijklmnopqrstuvwxyz';
  for (const l of except) all = all.replace(l, '');
  return rChoose(toLetters(all), n);
}
function rUID(prefix = null, n = null) {
  return (prefix ?? rLetter()) + '_' + new Date().getTime() + '_' + Math.random().toString(36).substr(3, n ?? 4);
  const timestamp = new Date().getTime(); 
  const random = Math.random().toString(36).substr(2, 9); 
  let res = `${prefix}${timestamp}${random}`;
  if (n > 0) res = res.substr(0, n);
  return res;
}
function showNavbar(pageTitle, titles, funcNames) {
  if (nundef(funcNames)) {
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
  mInsertFirst(document.body, mCreateFrom(html));
}
async function start() {
  M = await mGetYaml('../base/assets/m.txt'); 
  S.type = detectSessionType(); console.log('session',S)
  showNavbar('Collections', ['home', 'new']);
  onclickNew();
}
function stringAfterLast(sFull, sSub) {
  let parts = sFull.split(sSub);
  return arrLast(parts);
}
function stringBefore(sFull, sSub) {
  let idx = sFull.indexOf(sSub);
  if (idx < 0) return sFull;
  return sFull.substring(0, idx);
}
function toElem(d) { return isString(d) ? mBy(d) : d; }
function toLetters(s) { return [...s]; }
function trim(str) {
  return str.replace(/^\s+|\s+$/gm, '');
}
async function uploadNewImage(ev, url) {
  let elem = ev.target;
  let filename;
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
