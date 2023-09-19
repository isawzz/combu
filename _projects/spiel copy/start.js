onload = start;
// Card suits and ranks
const suits = ['S', 'H', 'C', 'D'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

const handSize = {
	"5": 20,
	"6": 17,
	"7": 14,
	"8": 13,
	"9": 11,
	"10": 10,
	"11": 9,
	"12": 8,
	"13": 8,
	"14": 7,
	"15": 6
};

async function start() {

	M = await mGetYaml('../base/assets/m.txt'); console.log('M', M);

	//let d=mDiv(document.body); createCard(d,'QH'); return;
	const sortedHand = sortCards(generateRandomHand()); //['2S', '3H', '4D', '5C', '6S', '7H', '8D', '9C', 'TH', 'JD', 'QC', 'KS', 'AH']);
	let d=mDiv(document.body); displaySplayedHand(d,sortedHand); return;

	// Start the game
	document.getElementById('startGameButton').addEventListener('click', () => {
		const numPlayers = parseInt(document.getElementById('numPlayers').value, 10);

		if (numPlayers >= 2 && numPlayers <= 15) {
			const playerHands = dealCards(numPlayers);
			showPlayerHands(playerHands);

			// // Display each player's hand
			// for (let i = 0; i < numPlayers; i++) {

			// 	const playerHandElement = document.getElementById(`player${i + 1}Hand`);
			// 	playerHandElement.innerHTML = `<h3>Player ${i + 1} Hand:</h3>${playerHands[i].join(', ')}`;
			// }
		} else {
			alert('Number of players must be between 2 and 15.');
		}
	});

	document.getElementById('startGameButton').click();

}

function createCard(dParent,key){
	let card = 'card_'+key;
	return mDom(dParent, { h: 110,w:70 }, { html: M.c52[card] });

}
function displaySplayedHand(dParent, hand) {
	const handContainer = mDom(dParent, { display: 'grid', gap: 5, wmax: 700, 'grid-template-columns': 'repeat(14, 20px) 70px' });
	// handContainer.innerHTML = '';

	for (const card of hand) {
		const cardDiv = createCard(handContainer,card); //card.rank, card.suit);
		//handContainer.appendChild(cardDiv);
	}
}

// Function to shuffle an array
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

// Function to deal cards to players
function dealCards(numPlayers) {
	let hsz = handSize[numPlayers] ?? 13;
	const totalCards = hsz * numPlayers;
	const deck = [];

	// Create a deck of cards
	let n = 0;
	while (n < totalCards) {
		for (const suit of suits) {
			for (const rank of ranks) {
				deck.push(`${rank}${suit}`); n++;
			}
		}
	}

	// Shuffle the deck
	shuffleArray(deck);

	// Divide the deck among players
	const playerHands = [];
	for (let i = 0; i < numPlayers; i++) {
		const hand = [];
		for (let j = 0; j < hsz; j++) {
			hand.push(deck.pop());
		}
		
		playerHands.push(hand);
	}

	return playerHands;
}

// Function to show player hands
function showPlayerHands(playerHands) {
	const playersContainer = document.getElementById('players');
	playersContainer.innerHTML = '';

	let numPlayers = playerHands.length;
	for (let i = 0; i < numPlayers; i++) {
		const playerDiv = document.createElement('div');
		playerDiv.innerHTML = `
                    <h2>Player ${i + 1}</h2>
                    <div id="player${i + 1}Hand"></div>
                `;
		playersContainer.appendChild(playerDiv);
	}
	// Display each player's hand
	for (let i = 0; i < numPlayers; i++) {

		const playerHandElement = document.getElementById(`player${i + 1}Hand`);
		
		displaySplayedHand(playerHandElement, sortCards(playerHands[i]))

		//playerHandElement.innerHTML = `<h3>Player ${i + 1} Hand:</h3>${playerHands[i].join(', ')}`;
	}
}

function sortCards(cards) {
	return cards.sort((a, b) => {
			// Compare suits first
			const suitA = getSuitValue(a.charCodeAt(1));
			const suitB = getSuitValue(b.charCodeAt(1));

			if (suitA !== suitB) {
					return suitA - suitB;
			}

			// If suits are the same, compare ranks
			const rankA = getRankValue(a.charCodeAt(0));
			const rankB = getRankValue(b.charCodeAt(0));

			return rankA - rankB;
	});
}

function sortCards(cards) {
	return cards.sort((a, b) => {
			// Compare suits first
			const suitA = getSuitValue(a.charCodeAt(1));
			const suitB = getSuitValue(b.charCodeAt(1));

					return suitA - suitB;

			// If suits are the same, compare ranks
			const rankA = getRankValue(a.charCodeAt(0));
			const rankB = getRankValue(b.charCodeAt(0));

			return rankA - rankB;
	});
}
function sortCards(cards) {
	return cards.sort((a, b) => {
			const cardA = `${a[1]}${a[0]}`;
			const cardB = `${b[1]}${b[0]}`;

			return cardA.localeCompare(cardB);
	});
}

function sortCards(cards) {
	return cards.sort((a, b) => {
			const cardA = getSuitValue(a)*1000 + getRankValue(a);
			const cardB = getSuitValue(b)*1000 + getRankValue(b);

			return cardA - cardB;
	});
}

function getRankValue(card) {
	// Define a mapping for card ranks
	const rankMapping = {
			'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
			'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
	};

	return rankMapping[card[0]];
}
function getSuitValue(card) {
	// Define a mapping for card ranks
	const suitMapping = {
			'S':0, 'H':1, 'C':2, 'D':3
	};

	return suitMapping[card[1]];
}

function generateRandomHand() {
	const suits = ['S', 'H', 'D', 'C'];
	const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
	const deck = [];

	// Create a deck of 52 cards
	for (const suit of suits) {
			for (const rank of ranks) {
					deck.push(`${rank}${suit}`);
			}
	}

	// Shuffle the deck
	for (let i = deck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[deck[i], deck[j]] = [deck[j], deck[i]];
	}

	// Deal the first 13 cards (random hand)
	const randomHand = deck.slice(0, 13);

	return randomHand;
}
