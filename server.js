const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the Task 2 Form
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Task 2 - Form Validation</title>
            <script>
                function validateForm() {
                    let username = document.forms["myForm"]["username"].value;
                    if (username.trim() == "") {
                        alert("Username must be filled out!");
                        return false;
                    }
                }
            </script>
        </head>
        <body>
            <h2>Cognifyz Internship - Task 2: Form Validation</h2>
            <form name="myForm" action="/validate" method="POST" onsubmit="return validateForm()">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" placeholder="Enter username">
                <button type="submit">Submit</button>
            </form>
        </body>
        </html>
    `);
});

// Handle POST request at /validate endpoint
app.post('/validate', (req, res) => {
    const username = req.body.username;

    // Server-side check
    if (!username || username.trim() === "") {
        return res.send("<h3>Error: Username cannot be empty on server-side!</h3><a href='/'>Go Back</a>");
    }

    res.send(`<h3>Task 2 Validation Successful!</h3><p>Welcome, <strong>${username}</strong>!</p><br><a href='/'>Go Back</a>`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Task 2 Server is running on http://localhost:${PORT}`);
});