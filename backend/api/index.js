const express = require('express');
const {v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('./logic/db');

router.get('/', (req, res) => {
  res.json("Welcome to API 1.0");
});
router.use('/user', require('./user'));

module.exports = router;
