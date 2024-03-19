const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3030;

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'backend',
//   port:3306
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle signup
app.post('/Signup', (req, res) => {
  const { name, userid, email, password } = req.body;
  const sql = 'INSERT INTO signup (name, userid, email, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, userid, email, password], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An error occurred while signing up' });
      return;
    }
    console.log('User signed up successfully');
    res.status(200).json({ message: 'User signed up successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
