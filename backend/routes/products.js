const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all products
router.get('/', (req, res) => {
  db.query('select * from MyTestDb.products', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// POST a new product
router.post('/', (req, res) => {
  const { name, price } = req.body;
  db.query('INSERT INTO MyTestDb.products (name, price) VALUES (?, ?)', [name, price], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, name, price });
  });
});

module.exports = router;