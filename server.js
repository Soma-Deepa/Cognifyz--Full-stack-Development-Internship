const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve the main form page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Cognifyz - Task 4</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f6f9; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 350px; text-align: center; }
                h2 { color: #333; }
                input { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; }
                button { background-color: #007bff; color: white; border: none; padding: 10px; width: 100%; border-radius: 5px; cursor: pointer; font-size: 16px; }
                button:hover { background-color: #0056b3; }
                #error-msg { color: red; font-size: 14px; margin-top: 10px; }
                #success-msg { color: green; font-size: 14px; margin-top: 10px; }
            </style>
        </head>
        <body>
            <div class="card">
                <h2>Cognifyz - Task 4</h2>
                <p>Complex Form Validation</p>
                <form id="valForm" action="/submit" method="POST" onsubmit="return validateForm(event)">
                    <input type="text" id="username" name="username" placeholder="Enter Username (min 3 chars)" required>
                    <input type="password" id="password" name="password" placeholder="Enter Password (min 6 chars, 1 number)" required>
                    <button type="submit">Register</button>
                </form>
                <div id="error-msg"></div>
            </div>

            <script>
                function validateForm(event) {
                    const username = document.getElementById('username').value;
                    const password = document.getElementById('password').value;
                    const errorDiv = document.getElementById('error-msg');

                    // Validation checks
                    if (username.length < 3) {
                        errorDiv.innerText = "Username must be at least 3 characters long.";
                        event.preventDefault();
                        return false;
                    }

                    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;
                    if (!passwordRegex.test(password)) {
                        errorDiv.innerText = "Password must be at least 6 characters and contain a number.";
                        event.preventDefault();
                        return false;
                    }

                    errorDiv.innerText = "";
                    return true;
                }
            </script>
        </body>
        </html>
    `);
});

// Handle form submission POST request
app.post('/submit', (req, res) => {
    const { username, password } = req.body;
    res.send(`
        <body style="font-family: Arial; text-align: center; padding-top: 50px;">
            <h2 style="color: green;">Validation Successful! 🎉</h2>
            <p>Welcome, <strong>${username}</strong>! Your data passed all client and server checks.</p>
            <a href="/" style="color: #007bff; text-decoration: none;">&larr; Back to Task 4</a>
        </body>
    `);
});

app.listen(PORT, () => {
    console.log(`Task 4 Server is running on http://localhost:${PORT}`);
});