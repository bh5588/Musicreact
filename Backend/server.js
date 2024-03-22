const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3030;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session configuration
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'music',
  port: 3306
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database and listening on port', port);
});

// Signup Endpoint
app.post('/Signup', (req, res) => {
  const { name, userid, email, password, randomKey } = req.body;
  const checkEmailSql = 'SELECT * FROM signup WHERE email = ?';
  db.query(checkEmailSql, [email], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An error occurred while signing up' });
      return;
    }

    if (result.length > 0) {
      // Email already exists in the database
      res.status(400).json({ error: 'Email already exists' });
      return;
    }

    // Email doesn't exist, proceed with signup
    const sql = 'INSERT INTO signup (name, userid, email, password, randomKey) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, userid, email, password, randomKey], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'An error occurred while signing up' });
        return;
      }
      console.log('User signed up successfully');
      res.status(200).json({ message: 'User signed up successfully' });
    });
  });
});

// Login Endpoint
app.post('/login', (req, res) => {
  const { login, password } = req.body;
  const sql = 'SELECT * FROM signup WHERE (email = ? OR userid = ?) AND password = ?';
  db.query(sql, [login, login, password], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An error occurred while logging in' });
      return;
    }
    if (result.length > 0) {
      console.log('User logged in successfully');
      

      // Set session data
      req.session.isLoggedIn = true ;
      req.session.user = result[0]; // Storing user details in session

      res.status(200).json({ message: 'User logged in successfully', isLoggedIn: true, user: req.session.user });
    } else {
      res.status(401).json({ error: 'Email or userid or password wrong' });
    }
  });
});

// Navbar Endpoint
app.get('/navbar', (req, res) => {
  // Check if user is logged in
  if (req.session.isLoggedIn) {
    // User is logged in, send relevant data from session
    res.json({ isLoggedIn: true, user: req.session.user });
  } else {
    // User is not logged in
    res.json({ isLoggedIn: false });
  }
});

// Logout Endpoint
app.post('/logout', (req, res) => {
  // Clear session data
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'An error occurred during logout' });
      return;
    }
    // Session destroyed successfully
    console.log('User logged out successfully');
    res.status(200).json({ success: true });
  });
});

// Server Setup
app.get('/', (req, res) => {
  res.send('Server is running on port 3030');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
