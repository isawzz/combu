function favBird(bird='owl'){
	let di={
		turkey: '1F983',
    chicken: '1F414',
    rooster: '1F413',
    bird: '1F426',
    penguin: '1F427',
    dove: '1F54A FE0F',
    dove: '1F54A',
    eagle: '1F985',
    duck: '1F986',
    swan: '1F9A2',
    owl: '1F989',
    dodo: '1F9A4',
    feather: '1FAB6',
    flamingo: '1F9A9',
    peacock: '1F99A',
    parrot: '1F99C',
    goose: '1FABF',
		unicorn: '1F984',

	}
	//<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>">
	let unicode = bird in di?di[bird]:'1F438';
	let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
	link.rel = 'icon';
	link.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 120 100%22><text y=%22.9em%22 font-size=%2290%22>🎯</text></svg>"//`<text>&#x${unicode};</text>`
	let targetString = String.fromCodePoint(parseInt(unicode, 16)); //"\u{1F9A9}";
	link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${targetString}</text></svg>`//`<text>&#x${unicode};</text>`
	console.log(targetString); // 
	document.getElementsByTagName('head')[0].appendChild(link);
	console.log('link',link)
}
