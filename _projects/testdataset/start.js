onload=start

function start(){
	var d=document.getElementById('dMain');
	d.dataset.hallo = JSON.stringify({k:'key',v:'value'});
	for(const k in d.dataset){
		let s=d.dataset[k];
		console.log('d.dataset.'+k,safeJSONParse(s))
	}
	console.log('d',d)

}






