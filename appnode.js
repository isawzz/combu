const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Handle POST request to save data
app.post('/saveData', (req, res) => {
  // Process the data from the request (you can save it to a file, database, etc.)
  const data = req.body;
  console.log('Received data:', data);

  // Respond with a success message
  res.json({ message: 'Data saved successfully!' });
});

// Start the server
const port = 3000; // You can use any available port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
