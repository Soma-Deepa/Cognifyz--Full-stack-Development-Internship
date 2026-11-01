const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 3000;

// Middleware for parsing URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Session setup to track logged-in status
app.use(session({
    secret: 'cognifyz-task-6-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Mock Database with pre-configured credentials
const USERS = {
    'Soma': 'password123',
    'admin': 'admin123'
};

// Route: Home / Login Page
app.get('/', (req, res) => {
    if (req.session.isLoggedIn) {
        return res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Cognifyz - Task 6 (Dashboard)</title>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f4f6f9; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                    .card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 380px; text-align: center; }
                    h2 { color: #28a745; margin-bottom: 10px; }
                    p { color: #555; font-size: 16px; }
                    a { display: inline-block; margin-top: 20px; color: #dc3545; text-decoration: none; font-weight: bold; border: 1px solid #dc3545; padding: 8px 16px; border-radius: 5px; }
                    a:hover { background-color: #dc3545; color: white; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h2>Welcome, ${req.session.username}! 👋</h2>
                    <p>You have successfully logged into Task 6 Dashboard.</p>
                    <a href="/logout">Logout</a>
                </div>
            </body>
            </html>
        `);
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Cognifyz - Task 6 (Authentication)</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f6f9; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 360px; }
                h2 { margin-top: 0; color: #333; text-align: center; }
                .form-group { margin-bottom: 15px; }
                label { display: block; margin-bottom: 5px; color: #666; font-size: 14px; }
                input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; }
                button { width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; margin-top: 10px; }
                button:hover { background-color: #0056b3; }
                .hint { background: #e9ecef; padding: 10px; border-radius: 5px; font-size: 12px; color: #555; margin-bottom: 15px; }
            </style>
        </head>
        <body>
            <div class="card">
                <h2>Cognifyz - Task 6</h2>
                <div class="hint">
                    <strong>Demo Credentials:</strong><br>
                    Username: <code>Soma</code> | Password: <code>password123</code>
                </div>
                <form action="/login" method="POST">
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" name="username" required placeholder="Enter username">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" required placeholder="Enter password">
                    </div>
                    <button type="submit">Log In</button>
                </form>
            </div>
        </body>
        </html>
    `);
});

// Route: Handle Login Post
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (USERS[username] && USERS[username] === password) {
        req.session.isLoggedIn = true;
        req.session.username = username;
        return res.redirect('/');
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Login Failed</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f6f9; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 360px; text-align: center; }
                h3 { color: #dc3545; }
                a { color: #007bff; text-decoration: none; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="card">
                <h3>Invalid Credentials!</h3>
                <p>Please check your username or password.</p>
                <a href="/">Try Again</a>
            </div>
        </body>
        </html>
    `);
});

// Route: Logout
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Task 6 Authentication Server running at http://localhost:${PORT}`);
});
