const express= require('express');
const fs = require('fs').promises;
const router = express.Router();

router.get('/', async (req, res, next) => {
  try{

    res.render('login');
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;