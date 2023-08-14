
console.log('hallo')

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

console.log('__dirname__',__dirname);
const staticPath = path.join('..'); // path from __dirname to root!
app.use(express.static(staticPath));

// // app.set('view engine', 'ejs');
// // app.set('views', path.join(__dirname, 'node0'));
// // app.get('/', (req, res) => { res.render('index', { message: 'Hello, World!' }); });

console.log(typeof false)

function print(x){
  for(const k in x){
    let val = x[k]
    if (typeof val == 'object') print(val);
    else if (typeof val == 'string') console.log(k,val); 
    else console.log('obj:',k)

  }
}

app.get('/', (req, res) => {
  //console.log('req',Object.keys(req))
  for(const k in req){
    if (typeof req[k] == 'string') console.log(k,req[k]); else console.log('obj:',k)

  }
  //console.log('req',Object.keys(req))
  for(const k in res){
    if (typeof res[k] == 'string') console.log(k,res[k]); else console.log('obj:',k)
  }
  // console.log('url',req.url,req.originalUrl)
  // console.log('res',Object.keys(res))
  const filePath = path.join(__dirname, 'index.html'); // Replace with the actual path to your file
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('GET error:', err);
    } else {
      console.log('GET successfull!');
    }
  });
});
app.post('/post', function (req, res) {
	let o = {};
	console.log('body',req.body);
	//save object received as yaml file
	//dazu brauch ich einen filename!!!
	//if this thing has a 'filename' 'data' props, save as yaml
	// if (o.filename && o.data) { toYamlFile(o.data, './y/' + o.filename + '.yaml'); }
	// else if (o.move && o.player) { update_player_move(o.player,o.move);}

	//send a reponse, no need to reload or redirect anything!
	o.checked = "wie bitte? YES!";
	res.send(req.body);

});


app.listen(4001, () => { console.log(`Server is running on http://localhost:4001`); });
