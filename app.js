const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();  // Load environment variables

const app = express();
const PORT = 4000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Set up MySQL connection using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Successfully connected to MySQL database.');
});

// API endpoint to get all users or a specific user by query string id
app.get('/users', (req, res) => {
  const userID = req.query.id ? parseInt(req.query.id, 10) : null;

  if (userID) {
    // Get specific user by id
    db.query('SELECT * FROM users WHERE ID = ?', [userID], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'An error occurred while fetching the user.' });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }

      return res.json(result[0]);
    });
  } else {
    // Get all users
    db.query('SELECT * FROM users', (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'An error occurred while fetching users.' });
      }

      return res.json(result);
    });
  }
});

// Endpoint to add a new user
app.post('/users', (req, res) => {
  const { LastName, FirstName, Age } = req.body;

  if (!LastName) {
    return res.status(400).send({ error: 'LastName is required' });
  }

  const user = { LastName, FirstName, Age };
  db.query('INSERT INTO users SET ?', user, (err, result) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    res.json({ message: 'User added successfully', id: result.insertId });
  });
});

// Endpoint to update a specific user by query string id
app.put('/users', (req, res) => {
  const userID = req.query.id ? parseInt(req.query.id, 10) : null;

  if (!userID || isNaN(userID)) {
    return res.status(400).json({ error: 'Invalid or missing user ID.' });
  }

  const { LastName, FirstName, Age } = req.body;
  const updatedData = {};

  if (LastName) updatedData.LastName = LastName;
  if (FirstName) updatedData.FirstName = FirstName;
  if (Age !== undefined) updatedData.Age = Age;

  if (Object.keys(updatedData).length === 0) {
    return res.status(400).send({ error: 'No user data for update.' });
  }

  db.query('UPDATE users SET ? WHERE ID = ?', [updatedData, userID], (err, result) => {
    if (err) {
      console.error('Database update error:', err);
      return res.status(500).json({ error: 'An error occurred while updating the user.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({ message: 'User data successfully updated!' });
  });
});

// Endpoint to delete a specific user by query string id
app.delete('/users', (req, res) => {
  const userID = req.query.id ? parseInt(req.query.id, 10) : null;

  if (!userID || isNaN(userID)) {
    return res.status(400).json({ error: 'Invalid or missing user ID.' });
  }

  db.query('DELETE FROM users WHERE ID = ?', [userID], (err, result) => {
    if (err) {
      console.error('Database delete error:', err);
      return res.status(500).json({ error: 'An error occurred while deleting the user.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({ message: 'User successfully deleted!' });
  });
});

// Error handling for unsupported methods
app.all('/users', (req, res) => {
  res.set('Allow', 'GET, POST, PUT, DELETE');
  res.status(405).json({ error: 'Method Not Allowed' });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
