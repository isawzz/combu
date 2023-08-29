
function cvCanvas(dParent, styles = {}, opts = {}) {
	addKeys({ w: 640, h: 480, bg: '#333', rounding: 12, display: 'inline-block' }, styles); //default styles
	addKeys({ id: 'c' }, opts); //default id
	let c = mDom(dParent, {}, { id: opts.id, tag: 'canvas', width: styles.w, height: styles.h });
	let cv = DA.cv = new fabric.Canvas(opts.id);
	mStyle(cv.wrapperEl, styles);
	return cv;
}

function moveRandom(o) {
	//console.log('o',o)
	o.set({ left: o.left + (coin() ? -1 : 1) });
	fab.renderAll();
}


function iDom(dParent, styles, opts) {
	//instead of just a html element, creates an item and stores it in Items
	let ui = mDom(dParent, styles, opts);
	addKeys(styles, opts);
	if (isdef(opts.tag)) {
		let els = document.getElementsByTagName(opts.tag);
		let cnt = els.length;
		console.log('count', cnt, 'tag', opts.tag);
		opts.id = opts.tag + cnt;
	} else {
		opts.id = getUID();
	}
	let item = iAdd({}, { div: ui }, opts);
	return item;
}
function iSerialize(item) {
	//remove live property, instead, just save div =>returns a json object
	let result = {};
	let el = iDiv(item);
	if (isdef(el)) { result.div = elemToJson(el); }
	copyKeys(item, result, { live: true });
	console.log('result', result)
}
function jsonToElem(serialized) {
	const element = document.createElement(serialized.tag);

	// Set attributes
	for (const [attrName, attrValue] of Object.entries(serialized.attributes)) {
		element.setAttribute(attrName, attrValue);
	}

	// Attach event listeners (assuming event listeners are named functions)
	for (const eventInfo of serialized.events) {
		const functionName = eventInfo.functionName;
		const eventType = eventInfo.event;

		if (window[functionName] && typeof window[functionName] === "function") {
			element.addEventListener(eventType, window[functionName]);
		}
	}

	// Append children
	for (const child of serialized.children) {
		if (child.type === "text") {
			const textNode = document.createTextNode(child.content);
			element.appendChild(textNode);
		} else {
			const childElement = jsonToElem(child);
			element.appendChild(childElement);
		}
	}

	if (serialized.tag === "CANVAS") {		element.innerHTML = serialized.content;}

	return element;
}
function elemToJson(element) {
	const serialized = {
		tag: element.tagName,
		attributes: {},
		content: element.tagName === "CANVAS" ? element.innerHTML : null,
		events: [],
		children: []
	};

	// Serialize attributes
	for (const attr of element.attributes) {
		serialized.attributes[attr.name] = attr.value;
	}

	// Serialize event listeners (assuming event listeners are named functions)
	for (const eventAttr of Object.keys(element)) {
		if (eventAttr.startsWith("on")) {
			const eventType = eventAttr.slice(2); // Remove "on" prefix
			const listenerFunction = element[eventAttr];
			if (typeof listenerFunction === "function") {
				serialized.events.push({
					event: eventType,
					functionName: listenerFunction.name
				});
			}
		}
	}

	// Serialize children
	for (const childNode of element.childNodes) {
		if (childNode.nodeType === Node.ELEMENT_NODE) {
			serialized.children.push(elemToJson(childNode));
		} else if (childNode.nodeType === Node.TEXT_NODE) {
			serialized.children.push({
				type: "text",
				content: childNode.textContent.trim()
			});
		}
	}

	return serialized;
}
