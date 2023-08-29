function test12() {
	let fab = cvCanvas('dMain', { w: 400 }, { id: 'canvas1' });
	ball = new fabric.Rect({ left: 100, top: 100, fill: 'red', width: 20, height: 20 });
	fab.add(ball);

	//TO.interval = setInterval(() => moveRandom(ball), 100)
	onclick = () => clearInterval(TO.interval)
}
function test11() {
	let c = mDom('dMain', {}, { id: 'c', tag: 'canvas', width: 500, height: 300 });
	fab = new fabric.Canvas('c');
	ball = new fabric.Rect({ left: 100, top: 100, fill: 'red', width: 20, height: 20 });
	fab.add(ball);
	mStyle(fab.wrapperEl, { bg: 'blue', display: 'inline-block' });
	TO.interval = setInterval(() => moveRandom(ball), 100)
	onclick = () => clearInterval(TO.interval)
}
function test10() {
	let c = mDom('dMain', { margin: 0, rounding: 20 }, { id: 'c', tag: 'canvas', width: 500, height: 300 });
	var canvas = new fabric.Canvas('c');
	var rect = new fabric.Rect({ left: 100, top: 100, fill: 'red', width: 20, height: 20 });
	canvas.add(rect);
	mStyle(canvas.wrapperEl, { bg: 'blue', display: 'inline-block' })
	console.log('canvas', canvas, canvas.wrapperEl, canvas.wrapperEl.firstChild)
}
function _test9() {
	let d = mBy('dMain');
	let c = mDom(d, { rounding: 20 }, { id: 'c', tag: 'canvas', width: 500, height: 300 });
	//let c=mDom(d,{},{tag:'canvas',id:'c'}); //mCreate('canvas');
	d.appendChild(c);
	c.id = 'c';
	var canvas = new fabric.Canvas('c');
	var rect = new fabric.Rect({ left: 100, top: 100, fill: 'red', width: 20, height: 20 });
	canvas.add(rect);
}
function _test8() {
	let d = mBy('dTest');
	let c = mDom(d, {}, { tag: 'canvas', id: 'c' }); //mCreate('canvas');
	d.appendChild(c);
	c.id = 'c';
	var canvas = new fabric.Canvas('c');
	var rect = new fabric.Rect({ left: 100, top: 100, fill: 'red', width: 20, height: 20 });
	canvas.add(rect);
}
function _test7() {
	let d = mBy('dTest');
	let c = mCreate('canvas');
	d.appendChild(c);
	c.id = 'c';
	var canvas = new fabric.Canvas('c');
	var rect = new fabric.Rect({ left: 100, top: 100, fill: 'red', width: 20, height: 20 });
	canvas.add(rect);
}
function _test6() {
	// create a wrapper around native canvas element (with id="c")
	let d = mBy('dTest');
	let c = mCreate('canvas');
	d.appendChild(c);
	c.id = 'c';
	var canvas = new fabric.Canvas('c');

	// create a rectangle object
	var rect = new fabric.Rect({
		left: 100,
		top: 100,
		fill: 'red',
		width: 20,
		height: 20
	});

	// "add" rectangle onto canvas
	canvas.add(rect);
}
function test5() {
	var canvasEl = document.getElementById('c');

	// get 2d context to draw on (the "bitmap" mentioned earlier)
	var ctx = canvasEl.getContext('2d');

	// set fill color of context
	ctx.fillStyle = 'red';

	// create rectangle at a 100,100 point, with 20x20 dimensions
	ctx.fillRect(100, 100, 20, 20);
}
function test4() {
	let d = mBy('dMain');
	let cv = mDom(d, { rounding: 20, bg: '#222' }, { id: 'c', tag: 'canvas', width: 500, height: 300 });
	var canvas = new fabric.Canvas('c');

	// create a rectangle with angle=45
	var rect = new fabric.Rect({
		left: 100,
		top: 100,
		fill: 'red',
		width: 20,
		height: 20,
		angle: 45
	});

	canvas.add(rect)

}
function test3() {
	let d = mBy('dMain');
	let cv = mDom(d, { rounding: 20, bg: '#222' }, { tag: 'canvas', width: 500, height: 300 });
	cvCenterOrigin(cv);
	cvEllipse(cv, 0, 0, 10, 10, 'black', 'yellow', 3);



	let x = elemToJson(cv);
	console.log('cv',cv)
	console.log('x',x)
	// d1.remove();
	let y=jsonToElem(x);
	
	let dnew = mBy('dTest');
	mAppend(dnew,y);


}
function test2() {
	//serialize and deserialize element
	// Example usage
	const serialized = {
		tag: "div",
		attributes: {
			id: "newDiv",
			class: "new-class"
		},
		events: [
			{
				event: "click",
				functionName: "handleClick"
			}
		],
		children: [
			{
				tag: "p",
				attributes: {},
				events: [],
				children: [
					{
						type: "text",
						content: "Hello, world!"
					}
				]
			}
		]
	};

	const newElement = jsonToElem(serialized);
	document.body.appendChild(newElement);

}
function test1(){
	let d = mBy('dMain');
	let item = iDom(d, { rounding: 20, bg: '#222' }, { tag: 'canvas', width: 500, height: 300 });
	console.log('item', item, Items)
	iSerialize(item)


}

//#region test0: prelim tests
function test0() {
	let d = mBy('dMain');
	let cv = mDom(d, { rounding: 20, bg: '#222' }, { tag: 'canvas', width: 500, height: 300 });
	cvClear(cv);
	cvCenterOrigin(cv);
	cvEllipse(cv, 0, 0, 10, 10, 'black', 'yellow', 3)
}
function cvCenterOrigin(canvas) {
	const ctx = canvas.getContext("2d");
	ctx.translate(canvas.width / 2, canvas.height / 2);
}
function cvClear(canvas) {
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function cvEllipse(canvas, styles={}, opts={}) { //} x, y, w, h, bg, fg, thickness) {
	const ctx = canvas.getContext("2d");
	const angle = 0;

	let [bg,fg,thickness]=[valf(styles.bg,'white'),styles.fg,styles.thickness]
	if (isdef(fg)) ctx.strokeStyle = fg;
	if (isdef(thickness)) ctx.lineWidth = thickness;
	if (isdef(bg)) ctx.fillStyle = bg;

	let [x,y,w,h]=[0,0,100,100];
	if (isdef(styles.x)) x = styles.x;
	if (isdef(styles.y)) x = styles.y;
	if (isdef(styles.w)) x = styles.w;
	if (isdef(styles.h)) x = styles.h;

	ctx.beginPath();
	ctx.ellipse(x, y, w / 2, h / 2, -angle, 0, 2 * Math.PI);
	// ctx.arc(centerX,centerY,50, 0, 2 * Math.PI);
	if (isdef(fg)) ctx.stroke();
	ctx.fill();
}
function cvStyle(canvas, styles) {
	const ctx = canvas.getContext("2d");
	const di = { bg: 'fillStyle', fill: 'fillStyle', stroke: 'strokeStyle', fg: 'strokeStyle', thickness: 'lineWidth', thick: 'lineWidth', cap: 'lineCap', ending: 'lineCap' };
	if (isdef(styles)) {
		for (const k in styles) { ctx[isdef(di[k]) ? di[k] : k] = styles[k]; }
	}
}

//#endregion

