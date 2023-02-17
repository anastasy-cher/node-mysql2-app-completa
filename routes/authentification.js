const express = require('express');
const router = express.Router();
const passport = require('passport')

const {isLoggerIn, isNotLogger} = require('../lib/auth')

/* GET users listing. */
router.get('/signup', isNotLogger,function(req, res, next) {
  res.render('auth/signup')
  // res.send('authen lo que sea')
});

router.post('/signup',isNotLogger, passport.authenticate('local.signup', {

  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
})) 


router.get('/profile', isLoggerIn, (req, res) => {
  res.render('profile')
})

router.get('/signin',isNotLogger, (req,res) => {
  res.render('auth/signin')
})

router.post('/signin',isNotLogger, (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next)
})

router.get('/logout',isLoggerIn, (req, res) => {
  // borra la sesion
  req.logOut(function(err){
    if(err) return next(err)
  })
  res.redirect('signin')
})

module.exports = router;
