onload = _start;

var currentIndex, items;
async function _start() {
	let result = await fetch('../wise/sayings.txt').then(x => x.text());
	result = jsyaml.load(result);
	items = result;
	shuffleArray(items)
	currentIndex = 0;
	showNextItems();
}
function shuffleArray(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
	}
	return arr;
}
function showEndProperty(ev) {
	let d = ev.target;
	//if d has a span child, remove it, else add it
	let span = d.getElementsByTagName('span')[0];
	if (span === undefined) {
		d.innerHTML += ' <span style="color:red">' + d.getAttribute('data-end') + '</span>';
	} else span.remove();

}
function showNextItems() {
	let displayItems = document.getElementById("items");
	displayItems.innerHTML = ''; // Clear current items
	let numItemsToShow = parseInt(document.getElementById("numberOfItems").value);

	for (let i = currentIndex; i < currentIndex + numItemsToShow && i < items.length; i++) {
		let itemDiv = document.createElement('div');
		let item = items[i];
		itemDiv.innerText = '(' + item.type + ') ' + item.start;
		itemDiv.setAttribute('data-end', item.end);
		itemDiv.addEventListener('click', showEndProperty);
		itemDiv.style = "cursor:pointer;margin-bottom:12px;user-select:none";
		displayItems.appendChild(itemDiv);
	}

	currentIndex += 5; if (currentIndex >= items.length) { currentIndex = 0; }
}







