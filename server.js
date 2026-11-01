const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Home route to render the HTML form
app.get('/', (req, res) => {
    res.render('index');
});

// Endpoint to handle form submission and render dynamic HTML
app.post('/submit', (req, res) => {
    const userName = req.body.name;
    const userEmail = req.body.email;
    res.render('result', { name: userName, email: userEmail });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});