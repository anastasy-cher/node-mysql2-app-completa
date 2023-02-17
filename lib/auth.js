const { render } = require("../app")

// si esto logeado y si la sesion esta activa
module.exports = {
    isLoggerIn(req, res, next) {
        if(req.isAuthenticated()){
            return next()
        }

        return res.redirect('/signin')
    },

    // quitamos sign up estando registrados
    isNotLogger(req, res, next){
        if(!req.isAuthenticated()){
            return next()
        }
        return res.redirect('/profile')
    }
}
