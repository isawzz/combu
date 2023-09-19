async function mGetYaml(path='../base/assets/m.txt'){
	let res = await fetch(path);
	let text = await res.text();
	let di = jsyaml.load(text);
	//console.log('di',di);
	return di;

}
