const img = document.createElement('img')
var DA = {};
var dParent;
var draggedElement;
var dragStartOffset;
var dropPosition = 'none';
var M = {};
var S = {};
function capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function detectSessionType() {
  let loc = window.location.href;
  DA.sessionType =
    loc.includes('telecave') ? 'telecave' : loc.includes('8080') ? 'php'
      : loc.includes(':40') ? 'nodejs'
        : loc.includes(':60') ? 'flask' : 'live';
  return DA.sessionType;
}
function drop(ev) {
  ev.preventDefault();
  let targetElem = findDragTarget(ev);
  targetElem.appendChild(draggedElement);
  setDropPosition(ev, draggedElement, targetElem, isdef(draggedElement.dropPosition) ? draggedElement.dropPosition : dropPosition);
}
function findDragTarget(ev) {
  let targetElem = ev.target;
  while (!targetElem.ondragover) targetElem = targetElem.parentNode;
  return targetElem;
}
function isdef(x) { return x !== null && x !== undefined; }
function isNumber(x) { return x !== ' ' && x !== true && x !== false && isdef(x) && (x == 0 || !isNaN(+x)); }
function isString(param) { return typeof param == 'string'; }
function makeUnitString(nOrString, unit = 'px', defaultVal = '100%') {
  if (nundef(nOrString)) return defaultVal;
  if (isNumber(nOrString)) nOrString = '' + nOrString + unit;
  return nOrString;
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
        <div style='position:absolute;width:300px;height:300px;left:50px;top:50px;border:dotted 1px black'  ondragover="allowDrop(event)" ondrop="dropImage(event)">drop here!</div>
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
function posXY(d1, dParent, x, y, unit = 'px', position = 'absolute') {
  if (nundef(position)) position = 'absolute';
  if (dParent && !dParent.style.position) dParent.style.setProperty('position', 'relative');
  d1.style.setProperty('position', position);
  if (isdef(x)) d1.style.setProperty('left', makeUnitString(x, unit));
  if (isdef(y)) d1.style.setProperty('top', makeUnitString(y, unit));
}
function setDropPosition(ev, elem, targetElem, dropPos) {
  if (dropPos == 'mouse') {
    var elm = $(targetElem);
    x = ev.pageX - elm.offset().left - dragStartOffset.x;
    y = ev.pageY - elm.offset().top - dragStartOffset.y;
    posXY(elem, targetElem, x, y);
  } else if (dropPos == 'none') {
    return;
  } else if (dropPos == 'center') {
    elem.style.position = elem.style.left = elem.style.top = '';
    elem.classList.add('centeredTL');
  } else if (dropPos == 'centerCentered') {
    elem.style.position = elem.style.left = elem.style.top = '';
    elem.classList.add('centerCentered');
  } else {
    dropPos(ev, elem, targetElem);
  }
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
function toElem(d) { return isString(d) ? mBy(d) : d; }
function trim(str) {
  return str.replace(/^\s+|\s+$/gm, '');
}
