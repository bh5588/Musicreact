const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors')
//below two for to upload image in database
const multer = require('multer');
const path = require('path'); 
const fs = require('fs');


const app = express();
const port = 3030;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// below for to show image 
app.use(express.static('public'));

// Session configuration
app.use(session({
 // secret: 'your_secret_key',
 secret: 'Server_Things',
  resave: false,
  saveUninitialized: true
}));
const storage = multer.diskStorage({
  destination: (req, file ,cb ) =>{
     cb(null,'public/userimages')
  },
  filename:(req, file, cd) => {
    cd(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
})
const  updateprofile = multer({
  storage: storage
})

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
  const { name, userid, email, password, randomKey, tokenkey } = req.body;

  // Check if userid already exists
  const checkUseridSql = 'SELECT * FROM signup WHERE userid = ?';
  db.query(checkUseridSql, [userid], (err, userResult) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ error: 'An error occurred while checking userid' });
    }

    // If userid already exists, return error
    if (userResult.length > 0) {
      return res.status(400).json({ error: 'User ID already exists' });
    }

    // If userid doesn't exist, proceed to check email
    const checkEmailSql = 'SELECT * FROM signup WHERE email = ?';
    db.query(checkEmailSql, [email], (err, emailResult) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        return res.status(500).json({ error: 'An error occurred while checking email' });
      }

      // If email already exists, return error
      if (emailResult.length > 0) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // If neither userid nor email exists, proceed with signup
      const sql = 'INSERT INTO signup (name, userid, email, password, randomKey, tokenkey) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(sql, [name, userid, email, password, randomKey, tokenkey], (err, result) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          return res.status(500).json({ error: 'An error occurred while signing up' });
        }
        console.log('User signed up successfully');
        const newUser = {
          name,
          userid,
          email,
          password,
          randomKey,
          tokenkey
        };
        console.log('User signed up successfully:', newUser);
        return res.status(200).json({ message: 'User signed up successfully' });
      });
    });
  });
});

// login End point
app.post('/login', (req, res) => {
  const { login, password } = req.body;
  const sql = 'SELECT * FROM signup WHERE (userid = ? OR email = ?) AND password = ?';
  db.query(sql, [login, login, password], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).json({ error: 'An error occurred while logging in' });
    }

    if (result.length === 0) {
       console.log(err);
       console.log(result);
       console.log(sql);
      // No user found with the provided userid or email
      return res.status(401).json({ error: 'Userid or email wrong' });
    }

    // User found, now check password
    const user = result[0];
    if (user.password !== password) {
      // Incorrect password
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Password correct, set session data
    req.session.isLoggedIn = true;
    req.session.user = user;

    // Login successful
    console.log('Values:', [login, password]);
    console.log('User logged in successfully');
    return res.status(200).json({ message: 'User logged in successfully', isLoggedIn: true, user });
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


app.get('/user-profile', (req, res) => {
  const userEmail = req.session.user && req.session.user.email;
  if (!userEmail) {
    res.status(400).json({ error: 'User email not found in session' });
    return;
  }

  db.query('SELECT * FROM signup WHERE email = ?', [userEmail], (err, result) => {
    if (err) {
      console.error('Error fetching user profile data:', err);
      res.status(500).json({ error: 'An error occurred while fetching user profile data' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'User profile not found' });
      return;
    }

    // Send the user profile data to the frontend
    const user = result[0];
    res.json({ user });
  });
});



// Logout Endpoint
app.post('/logout', (req, res) => {
  // Clear session data
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ error: 'An error occurred during logout' });
    }
    // Session destroyed successfully
    console.log('User logged out successfully');
    return res.status(200).json({Logout:"Successfully", success: true });
  });
});


// Update profile endpoint
app.post('/updateprofile', updateprofile.single('image'), (req, res) => {
  const newImage = req.file;
  const { name, userid, email, phoneno, dob, gender } = req.body;

  // Retrieve the old image file name from the database
  db.query('SELECT image FROM signup WHERE email = ? AND userid = ?', [email, userid], (err, result) => {
    if (err) {
      console.error('Error fetching old image:', err);
      res.status(500).json({ error: 'An error occurred while updating profile' });
      return;
    }

    const oldImage = result[0]?.image;

    // Determine the image to use based on whether a new image is uploaded
    const imageToUpdate = newImage ? newImage.filename : oldImage;

    // SQL query to update profile where email and userid match
    const sql = 'UPDATE signup SET name = ?, phoneno = ?, dob = ?, gender = ?, image = ? WHERE email = ? AND userid = ?';
    const values = [name, phoneno, dob, gender, imageToUpdate, email, userid];

    // Execute the query to update the user profile with the new image or previous image
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ error: 'An error occurred while updating profile' });
        return;
      }

      // Check if there's an existing image associated with the user and a new image is uploaded
      if (oldImage && newImage) {
        const oldImagePath = path.join(__dirname, 'public', 'userimages', oldImage);

        // Delete the older image
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Error deleting old image:', err);
            return;
          }
          console.log(oldImage);
          console.log(newImage);
          console.log('Old image deleted successfully');
        });
      }

      console.log('Profile updated successfully');
      res.status(200).json({ message: 'Profile updated successfully' });
    });
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
 