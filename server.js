const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Specify the views directory

// Route to serve the index page
app.get('/', (req, res) => {
  const color = process.env.COLOR || 'white'; // Default to white if no color is set
  res.render('index', { color }); // Render the index.ejs file
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});