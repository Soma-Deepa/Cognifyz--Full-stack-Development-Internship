const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to prevent browser caching issues
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));

// Serve the Task 3 Interactive App
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Task 3 - Interactive Task Manager</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f7f6;
                    margin: 0;
                    padding: 50px;
                    display: flex;
                    justify-content: center;
                }
                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                    width: 400px;
                }
                h2 { color: #333; text-align: center; }
                p { text-align: center; color: #666; }
                .input-group {
                    display: flex;
                    gap: 10px;
                }
                input[type="text"] {
                    flex: 1;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                button {
                    padding: 10px 15px;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                button:hover { background-color: #218838; }
                ul { list-style-type: none; padding: 0; margin-top: 20px; }
                li {
                    background: #e9ecef;
                    padding: 10px;
                    margin-top: 8px;
                    border-radius: 4px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .delete-btn {
                    background-color: #dc3545;
                    padding: 5px 8px;
                    font-size: 12px;
                }
                .delete-btn:hover { background-color: #c82333; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Cognifyz - Task 3</h2>
                <p>Interactive DOM Manipulation</p>
                <div class="input-group">
                    <input type="text" id="taskInput" placeholder="Enter a new task...">
                    <button onclick="addTask()">Add</button>
                </div>
                <ul id="taskList"></ul>
            </div>

            <script>
                function addTask() {
                    const input = document.getElementById('taskInput');
                    const taskText = input.value.trim();
                    if (taskText === "") {
                        alert("Please enter a task!");
                        return;
                    }

                    const ul = document.getElementById('taskList');
                    const li = document.createElement('li');
                    
                    li.innerHTML = \`<span>\${taskText}</span> <button class="delete-btn" onclick="this.parentElement.remove()">Delete</button>\`;
                    ul.appendChild(li);
                    
                    input.value = "";
                }
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Task 3 Server is running on http://localhost:${PORT}`);
});