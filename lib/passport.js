const passport = require('passport')
const localStrategy = require('passport-local').Strategy

const pool = require('../database')
const helpers = require('../lib/helpers')

passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    const [rows] = await pool.query('SELECT * FROM user WHERE username = ?', [username])
    // console.log(rows)
    if(rows.length > 0 ){
        const user = rows[0]
        const validPassword = await helpers.matchPassword(password, user.password)

        if(validPassword){
            done(null, user, req.flash('success', "Bienvenido " + user.username))
        }else{
            done( null, false, req.flash('message', 'Contraseña incorrecta'))
        }
    } else {
        return done( null, false, req.flash('message', 'Usuario no existe'))
    }
}))

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

    const [ result ] = await pool.query('INSERT INTO user SET ?', [newUser])
    // console.log(result)
    newUser.id = result.insertId
    // console.log(result.insertId)

    return done(null, newUser)
}))

// mantener la sesion abierta al cerrar la pagina
passport.serializeUser((user, done) =>{
    done(null, user.id)
})

passport.deserializeUser(async(id,done) => {
    const [ rows ] = await pool.query('SELECT * FROM user WHERE id = ?', [id])
    done(null, rows[0])
})