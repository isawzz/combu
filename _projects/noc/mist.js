

function ___test1() {
	// Example usage
	const elementToSerialize = document.getElementById("myElement"); // Replace with your element reference
	const serializedJSON = JSON.stringify(serializeElementToJson(elementToSerialize), null, 2);

	console.log(serializedJSON);
}







function __elemToJson(element) {
	const serialized = {
		tag: element.tagName,
		attributes: {},
		children: [],
		events: []
	};

	// Serialize attributes
	for (const attr of element.attributes) {
		serialized.attributes[attr.name] = attr.value;
	}

	// Serialize event listeners
	for (const eventName of Object.keys(element)) {
		if (eventName.startsWith("on")) {
			const listenerFunction = element[eventName];
			if (typeof listenerFunction === "function") {
				serialized.events.push({
					event: eventName,
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

function mParse(elemser) {
	let el = mCreate(elemser.tag)
	for (const attr in elemser.attributes) {
		el.setAttribute(attr, elemser.attributes[attr]);
	}
	for (const attr of elemser.children) {
		el.setAttribute(attr, elemser.attributes[attr]);
	}

}

function __iParse(iser) {
	//creates item from iSerialize result
	let item = {};
	if (isdef(iser.div)) {
		let el = mParse(iser.div);

	}




}
function __cvEllipse(canvas, w, h) {
	const ctx = canvas.getContext("2d");
	const centerX = w / 2;
	const centerY = h / 2;

	// Calculate the radius of the circle
	const radius = Math.min(centerX, centerY) - 10; // Subtracting 10 for some padding

	// Draw the circle
	ctx.beginPath();
	ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
	ctx.stroke();
}
function ___elemToJson(element) {
	const serialized = {
		tag: element.tagName,
		attributes: {},
		children: []
	};

	// Serialize attributes
	for (const attr of element.attributes) {
		serialized.attributes[attr.name] = attr.value;
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
