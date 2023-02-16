const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const pool = require('../database')
const helpers = require('../lib/helpers')

passport.use('local.signup', new localStrategy({
    // igual que los name del signup.hbs
    usernameField: 'username',
    passwordField: 'password',
    // pasamos los valores, si salio bien el registro/ pasar req.body abajo
    passReqToCallback: true

// pasamos funccion cuando todo okey
}, async (req, username, password, done) => {
    const { email, fullname } = req.body
    const newUser = {
        username,
        password,
        email,
        fullname
    }

    newUser.password = await helpers.encryptPassword(password)

    const result = await pool.query('INSERT INTO user SET ?', [newUser])

    return done(null, newUser)
}))