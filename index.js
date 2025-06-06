// index.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3306;

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
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
  db.query('SELECT * FROM MyTestDb.users',(err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post('/api/users', (req, res) => {
  const { id, name, email, mobile } = req.body;
  db.query('INSERT INTO MyTestDb.users (id, name, email, mobile) VALUES (?, ?, ?, ?)', [id, name, email, mobile], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id, name, email ,mobile});
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
