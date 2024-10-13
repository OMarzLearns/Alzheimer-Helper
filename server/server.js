// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const fs = require('fs');
require("dotenv").config();
const database = require('./database');
const emailServ = require('./emailServ');
const { spawn } = require('child_process');
var tag = 0;

const app = express();
const PORT = process.env.PORT || 3000;
const db = database.initializeDatabase();

app.use(cors());
app.use(bodyParser.json());

function getId() {
  tag++;
  return tag;
}

function readJsonFile(filePath) {
  try {
      const data = fs.readFileSync(filePath, 'utf8'); // Read the file synchronously
      const jsonData = JSON.parse(data); // Parse the JSON string into an object
      return jsonData; // Return the JSON object
  } catch (err) {
      console.error('Error reading the JSON file:', err);
      return null; // Return null in case of an error
  }
}

function writeJsonToFile(filePath, data) {
    const jsonData = JSON.stringify(data, null, 2); // Convert JavaScript object to JSON string
    fs.writeFile(filePath, jsonData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to JSON file:', err);
        } else {
            console.log('Data successfully written to JSON file!');
        }
    });
}

function getSummary() {
  // executePython.js
  const pythonProcess = spawn('python3', ['summAi.py']); //Use 'python3' if necessary

  // // Handle standard output
  pythonProcess.stdout.on('data', (data) => {
      console.log(`Output from Python: ${data}`);
  });
}

// Set name to id
app.get('/getId/:id', (req, res) => {
  database.getUserById(db, req.params.id, (restrictedData) => {
    res.send(restrictedData);
  });
});

// Create new user
app.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;

    database.addUser(db, getId(), username, password, email);
    res.send();
  });


// Retrieve and display all records
app.get('/retrieve', (req, res) => {
  database.getAllRecords(db, (restrictedData) => {
    res.send(restrictedData);
  });
});

// Route to store text in the database
app.post('/sendEmail/:id', (req, res) => {
    const {email, subject, score} = req.body; // Expecting { text: "Your text here" }

    emailServ.sendEmail(email, subject, score);
    res.send();
});

app.post('/deleteUsers', (req, res) => {
  database.deleteAllRecords(db);
  res.send();
})

// Route to store text in the database
app.post('/updateSum/:id', (req, res) => {
    const text = req.body; // Expecting { text: "Your text here" }

    if (!text) {
        return res.status(400).send('Text is required.');
    }
    database.addJournal(db, req.params.id, text);
    console.log(text);
    writeJsonToFile('./provided.json', text);
    res.send();

    // Define the command and arguments
    getSummary();
    const data = readJsonFile('./Output.json');
    res.json(data);
});

app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

// Catch-all route for non-existent routes
app.use((req, res) => {
    res.status(404).send('Forbidden.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
