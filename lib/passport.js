const passport = require('passport')
const { Strategy } = require('passport-local')
const localStrategy = require('passport-local').Strategy

passport.use('local.signup', new localStrategy({
    // igual que los name del signup.hbs
    usernameField: 'username',
    passwordField: 'password',
    // pasamos los valores, si salio bien el registro
    passReqToCallback: true

// pasamos funccion cuando todo okey
}, async (req, username, password, done) => {
    console.log(req.body)
}))