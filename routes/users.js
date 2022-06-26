const express= require('express');
const fs = require('fs').promises;
const router = express.Router();

router.get('/', async (req, res, next) => {
  try{
    const data = fs.readFile('../public/login.html');
    res.end(data);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;