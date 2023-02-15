const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('auth/signup')
  // res.send('authen lo que sea')
});

router.post('/signup', function(req, res, next) {
  console.log(req.body)
  
  res.send('authen recibido');
});

module.exports = router;
