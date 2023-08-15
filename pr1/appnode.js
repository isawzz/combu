
console.log('hallo')

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

console.log('__dirname__',__dirname);
const staticPath = path.join('..'); // path from __dirname to root!
app.use(express.static(staticPath));
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/submit', (req, res) => {
  console.log('data received',req.body)
  res.send({msg:'Data received successfully!',name:req.body.name});
});




// app.post('/post', function (req, res) {
// 	console.log('body',req.body);
// 	res.send('wieso');
// });


app.listen(4001, () => { console.log(`Server is running on http://localhost:4001`); });
