// index.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: '34.131.54.73',
  user: 'root',
  password: 'SSaamm#2357',
  database: 'MyTestDb'
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Routes
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users',(err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});