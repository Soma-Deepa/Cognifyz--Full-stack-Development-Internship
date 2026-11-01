const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Cognifyz - Task 5 (User API)</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f6f9; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                .card { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 420px; text-align: center; }
                h2 { color: #333; }
                button { background-color: #28a745; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; font-size: 16px; margin-top: 15px; }
                button:hover { background-color: #218838; }
                #data-box { margin-top: 20px; text-align: left; background: #f8f9fa; padding: 15px; border-radius: 5px; font-size: 14px; color: #333; }
            </style>
        </head>
        <body>
            <div class="card">
                <h2>Cognifyz - Task 5</h2>
                <p>JSONPlaceholder API Integration</p>
                <button onclick="fetchUserData()">Fetch User Data</button>
                <div id="data-box">Click the button to load user data...</div>
            </div>

            <script>
                async function fetchUserData() {
                    const dataBox = document.getElementById('data-box');
                    dataBox.innerHTML = "Loading...";
                    try {
                        const randomId = Math.floor(Math.random() * 10) + 1;
                        const response = await fetch('https://jsonplaceholder.typicode.com/users/' + randomId);
                        const user = await response.json();
                        
                        dataBox.innerHTML = \`
                            <strong>Name:</strong> \${user.name}<br>
                            <strong>Username:</strong> \${user.username}<br>
                            <strong>Email:</strong> \${user.email}<br>
                            <strong>City:</strong> \${user.address.city}
                        \`;
                    } catch (error) {
                        dataBox.innerText = "Failed to fetch data.";
                    }
                }
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Task 5 Server is running on http://localhost:${PORT}`);
});