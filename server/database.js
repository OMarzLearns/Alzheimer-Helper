const sqlite3 = require('sqlite3').verbose();

// Creates the database
const initializeDatabase = () => {
    const db = new sqlite3.Database('restrictedData.db', (err) => {
        if (err) {
            console.error('Could not connect to database:', err.message);
        }
    });
    db.run(`CREATE TABLE IF NOT EXISTS restrictedData (id TEXT PRIMARY KEY, name TEXT, pass TEXT, email TEXT, journal TEXT, photo BLOB)`, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        }
    });

    return db;
};


// Function to add names to the database
const addUser = (db, id, name, pass, email) => {
  db.get(`SELECT * FROM restrictedData WHERE id = ?`, [id], (err, row) => {
    checkErr(db, id, err, row);
    const stmt = db.prepare(`INSERT INTO restrictedData (id, name, pass, email) VALUES (?, ?, ?, ?)`);
    stmt.run(id, name, pass, email, function(err) {
      if (err) {
        console.error('Error inserting data:', err.message);
      }
    });

    stmt.finalize();
    });
};


// Function to add photos to db
const addPhoto = (db, id, photo) => {
  db.get(`SELECT photo FROM restrictedData WHERE id = ?`, [id], (err, row) => {
    checkErr(db, id, err, row);
    // Insert the record into the database
    const stmt = db.prepare(`INSERT OR REPLACE INTO restrictedData (id, photo) VALUES (?, ?)`);
    stmt.run(id, photo, function(err) {
        if (err) {
            return res.status(500).send('Error inserting data: ' + err.message);
        }
        res.send('Photo uploaded successfully!');
    });
    stmt.finalize();
    });

}

// Function to add journals to db
const addJournal = (db, id, journal) => {
  db.get(`SELECT journal FROM restrictedData WHERE id = ?`, [id], (err, row) => {
    // checkErr(db, id, err, row);
    // Insert the record into the database
    const stmt = db.prepare(`INSERT OR REPLACE INTO restrictedData (id, journal) VALUES (?, ?)`);
    stmt.run(id, journal, function(err) {
        if (err) {
            console.log('Error inserting data: ' + err.message);
        }
    });
    stmt.finalize();
    });

}

// Reused func
function checkErr(db, id, err, row) {
  if (err) {
    console.error('Error checking ID:', err.message);
    return;
  }

  if (row) {
    console.log(`Data with ID ${id} already exists. Data will not be added.`);
    return; // ID exists, do not add data
  }
}

// Function to get user by ID
const getUserById = (db, id, callback) => {
    const sql = 'SELECT * FROM restrictedData WHERE id = ?';

    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error('Error executing query:', err.message);
            return;
        }

        if (row) {
            callback(row);
        } else {
            console.log('No user found with that ID.');
        }
    });
}

// Function to retrieve all records from the database
const getAllRecords = (db, callback) => {
    db.all(`SELECT * FROM restrictedData`, [], (err, rows) => {
        if (err) {
            console.error('Error retrieving data:', err.message);
            return;
        }
        callback(rows);
    });
};

// Export functions for use in other modules
module.exports = {
    initializeDatabase,
    addUser,
    addPhoto,
    addJournal,
    getAllRecords,
    getUserById
};
