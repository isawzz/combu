onload = start;

function start() { test2_startCollection(); }
function test2_startCollection(){

}

function showHome(){for(const id of ['New','Browse']) mStyle(`d${id}Collection`,{display:'none'})}
function onclickNew(){showHome();mStyle('dNewCollection',{display:'block'})}
function onclickAdd(){showHome();mShow('dAddCollection')}
function onclickBrowse(){showHome();mShow('dBrowseCollection')}











