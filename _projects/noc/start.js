onload = start
async function start() { test17(); }
function test17(){
	let c = mDom('dMain', {w: 500, h: 400, bg: '#333', rounding: 12, display: 'inline-block'}, { id: 'canvas', tag: 'canvas', width: 500, height: 300 });
	var canvas = new fabric.Canvas('canvas', {
		fireRightClick: true,  // <-- enable firing of right click events
		fireMiddleClick: true, // <-- enable firing of middle click events
		stopContextMenu: true, // <--  prevent context menu from showing
	});
	// $('.upper-canvas').on('contextmenu', ev=> ev.preventDefault());

	canvas.on('mouse:down', (ev) => {
		console.log('',ev.button)
    if(ev.button === 1) {
        console.log("left click");
    }
    if(ev.button === 2) {
        console.log("middle click");
    }
    if(ev.button === 3) {
        console.log("right click");
    }
});
	console.log(canvas._onContextMenu)
	//contextMenu(canvas)
}
function contextMenu(canvas) {
	var ctxTarget = null;

	var menu = [{
		name: 'Select Object',
		img: '',
		title: 'Select Object',
		fun: function (o, jqEvent) {
			canvas.setActiveObject(ctxTarget);
			console.log(ctxTarget);
		}
	}];

	$('.upper-canvas').on('contextmenu', function (e) {
		e.preventDefault();
		ctxTarget = canvas.findTarget(e.originalEvent);
		console.log('_______________________')
		console.log('ctxTarget',ctxTarget);
		console.log(canvas)
	});

	// $('.upper-canvas').contextMenu(menu, {
	// 	triggerOn: 'contextmenu',
	// 	closeOnClick: true,
	// });
}
function test16() {
	let canvas = cvCanvas('dMain', { w: 400 }, { id: 'canvas1' });

	// Add an event listener to the canvas for the contextmenu event
	canvas.on("contextmenu", function (event) {
		event.preventDefault(); // Prevent the default browser context menu

		// Get the click coordinates
		const x = event.clientX;
		const y = event.clientY;

		// Create your custom menu item here
		const menuItem = document.createElement("div");
		menuItem.textContent = "Custom Menu Item";
		menuItem.style.position = "absolute";
		menuItem.style.left = x + "px";
		menuItem.style.top = y + "px";
		menuItem.style.backgroundColor = "white";
		menuItem.style.border = "1px solid #000000";
		menuItem.style.padding = "5px";

		// Attach the custom menu item to the document
		document.body.appendChild(menuItem);
	});

}
function test15() {
	let canvas = cvCanvas('dMain', { w: 400 }, { id: 'canvas1' });
	canvas.selection = false;

	const rect = new fabric.Rect({ left: 50, top: 50, width: 100, height: 100, fill: "blue" });
	rect.hoverCursor = 'pointer';
	rect.hasControls = false; //jetzt sieht man nicht mehr die resize handles, aber still es kriegt einen border
	rect.selectable = false; // jetzt sieht man immer noch den hoverursor aber nix passiert bei click
	canvas.add(rect); // Add the object to the canvas

}
function test14() {
	let canvas = cvCanvas('dMain', { w: 400 }, { id: 'canvas1' });

	ball = new fabric.Rect({ left: 100, top: 100, fill: 'red', width: 20, height: 20 });
	ball.hoverCursor = 'pointer';
	canvas.add(ball);
	canvas.add(new fabric.Rect({ left: 5, top: 5, fill: 'yellow', width: 5, height: 5 }));
	canvas.on('mouse:over', fillBlue);
	canvas.on("object:modified", ev => { canvas.renderAll(); });
}
function test13() {
	let fab = cvCanvas('dMain', { w: 400 }, { id: 'canvas1' });

	ball = new fabric.Rect({ left: 100, top: 100, fill: 'red', width: 20, height: 20 });
	fab.add(ball);
	fab.add(new fabric.Rect({ left: 5, top: 5, fill: 'yellow', width: 5, height: 5 }))
}

function fillBlue(ev) {
	console.log('ev', ev)
	if (ev.target) {
		ev.target.set('fill', 'blue');
	}
}

