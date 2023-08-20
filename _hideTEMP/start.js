onload = _start;

var currentIndex,items;
async function _start() {

	let result = await fetch('../wise/sayings.txt').then(x => x.text());
  result = jsyaml.load(result);
  //console.log('result', result)

	items = [
		"Item 1", "Item 2", "Item 3", "Item 4", "Item 5",
		"Item 6", "Item 7", "Item 8", "Item 9", "Item 10",
		"Item 11", "Item 12", "Item 13", "Item 14", "Item 15"
		//... add as many items as you want
	];
	items = result;
	shuffleArray(items)	
	currentIndex = 0;

	//console.log('item0',items[0])

	// Initial load
	showNextItems();

}

function disableDoubleClick(event) {
	event.preventDefault();
}
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]]; // Swap elements
	}
	return array;
}
function showEndProperty(ev) {
	let d=ev.target;
	//if d has a span child, remove it, else add it
	let span = d.getElementsByTagName('span')[0];
	if (span === undefined) {
		d.innerHTML += ' <span style="color:red">'+d.getAttribute('data-end')+'</span>';
	} else span.remove();

}
function showNextItems() {
	let displayItems = document.getElementById("items");
	displayItems.innerHTML = ''; // Clear current items
	let numItemsToShow = parseInt(document.getElementById("numberOfItems").value);

	for (let i = currentIndex; i < currentIndex + numItemsToShow && i < items.length; i++) {
		let itemDiv = document.createElement('div');
		let item = items[i];
		itemDiv.innerText = '('+item.type+') '+item.start;
		itemDiv.setAttribute('data-end', item.end);
		itemDiv.addEventListener('click', showEndProperty);
		//itemDiv.ondblclick = disableDoubleClick;  // Disable double-click
		itemDiv.style= "cursor:pointer;margin-bottom:12px;user-select:none";
		displayItems.appendChild(itemDiv);

		//displayItems.innerHTML += items[i].start + '...<br>';
	}

	currentIndex += 5;
	if (currentIndex >= items.length) {
		currentIndex = 0;  // Reset to start if you've reached the end
	}
}








async function oldstart() {

	//await wise_cards_bearbeiten(); return;

	//await wise_cards_zip(); return;

	let list = await route_path_yaml_dict('../base/assets/games/wise/sayings.yaml');
	DA.sayings = shuffle(list);
	DA.index = 0;
	DA.n = 5;
	dTable = mBy('dTable'); //mCenterCenterFlex(dTable);
	mStyle(dTable, { bg: 'white', fg: 'black' });
	onclick_start();

}

function onclick_start() {
	mClear(dTable);
	let b = mButtonX(dTable, ev => mClear(dTable), 'tr', 20, 'silver'); //mButton('X',()=>mClear(dTable),dTable,{w:20,h:20});
	mPlace(b, 'tr');
	DA.selectedItem = null;

	DA.items = [];
	let dParent = mDiv(dTable, { margin: 20 }); //, 'justify-self':'start' });
	for (let i = 0; i < DA.n; i++) {
		let item = jsCopy(DA.sayings[i + DA.index]);
		// let d = mDiv(dParent, { w: '100%', cursor: 'pointer' }, null, '' + (i + 1) + ') ' + item.start + '...', 'hop1');
		let d = mDiv(dParent, { w: '100%', cursor: 'pointer' }, null, `(${item.type}) ${item.start}...`, 'hop1');
		d.setAttribute('index', i)
		mLinebreak(d);
		d.onclick = onclick_start_item;
		iReg(item, { div: d }, { i: i });
		DA.items.push(item);
	}
	DA.index += DA.n;

}
function onclick_end() {
	if (isEmpty(dTable.children)) { mFleeting('please, click start!', 'dMessage'); return; }
	if (nundef(DA.selectedItem)) { mFleeting('please, select a saying!', 'dMessage'); return; }
	let item = DA.selectedItem;
	if (nundef(item)) return;
	mLinebreak(dTable, 12)
	mDiv(dTable, { margin: 20 }, null, '... ' + item.end);
}
function unselect_item(item) {
	console.log('unselect', item.i)
	let d = iDiv(item);
	mStyle(d, { fg: 'black' });
	DA.selectedItem = null;
}
function select_item(item) {
	console.log('select', item.i)
	let d = iDiv(item);
	mStyle(d, { fg: RED });
	DA.selectedItem = item;
}
function onclick_start_item(ev) {
	let i = ev.target.getAttribute('index');
	let selected = DA.selectedItem;
	if (selected) unselect_item(selected);
	let item = DA.items[i];
	select_item(item);
}

async function wise_cards_zip() {
	let wise_ends = await route_path_yaml_dict('../base/assets/games/wise/ends.yaml');
	let wise_starts = await route_path_yaml_dict('../base/assets/games/wise/starts.yaml');

	let list = [];
	for (const k in wise_ends) {
		let ends = wise_ends[k]
		let starts = wise_starts[k]
		console.log('________k', k, 'starts', starts, 'ends', ends)
		if (nundef(starts) || nundef(ends)) continue;
		//continue;
		for (let i = 0; i < ends.length; i++) {
			console.log('starts[i]', i, starts[i]);
			let o = jsCopy(starts[i]);
			o.start = o.text;
			delete o.text;
			o.end = ends[i];
			list.push(o);
		}
		//break;
	}

	console.log('list', list);
	//return;
	downloadAsYaml(list, 'hallo');

}

async function wise_cards_bearbeiten() {

	let wise_ends = await route_path_yaml_dict('../base/assets/games/wise/ends.yaml');
	let starts = await route_path_text('../base/assets/games/wise/starts_orig.yaml');

	//console.log('wise:', starts, wise_ends);

	let lines = starts.split('\r\n');
	console.log('lines', lines);

	let wise_starts = {};

	let n = 0;
	let list = [], o = null;
	for (const line of lines) {
		if (line[0] == '#') {
			if (!isEmpty(list)) {
				console.log('list', n, list);
				console.log('line', line)
				assertion(list.length == 5, 'NOT 5 in list ' + n);
				wise_starts[n] = list;
				//if (n == 1) console.log('list');
			}
			n = Number(stringAfter(line, '#').trim()); //allNumbers(line)[0];
			// console.log('n', n)
			list = [];
		} else if (isEmptyOrWhiteSpace(line.trim())) {
			continue;
		} else if (line.includes('type:')) {
			let l = stringAfter(line, 'type:').trim();
			o = { type: l };
		} else if (line.includes('text:')) {
			o.text = stringAfter(line, 'text:').trim();
			list.push(o);
		}
	}

	downloadAsYaml(wise_starts, 'starts')
	console.log('starts', wise_starts);
}













