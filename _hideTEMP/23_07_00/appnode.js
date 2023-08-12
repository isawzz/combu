
console.log('hallo')

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const staticPath = __dirname; //relative to appnode.js!!!
app.use(express.static(staticPath));

// // app.set('view engine', 'ejs');
// // app.set('views', path.join(__dirname, 'node0'));
// // app.get('/', (req, res) => { res.render('index', { message: 'Hello, World!' }); });

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'node0/index.html'); // Replace with the actual path to your file
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
    } else {
      console.log('File sent successfully!');
    }
  });
});


app.listen(4001, () => { console.log(`Server is running on http://localhost:4001`); });
