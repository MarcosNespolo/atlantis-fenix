const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const Usuario = require('../models/usuario.model');

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}

// Autorização de recursos
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.SECRET_OR_KEY
}, (payload, done) => {
    Usuario.findById({ _id: payload.sub }, (err, usuario) => {
        if (err)
            return done(err, false);
        if (usuario)
            return done(null, usuario);
        else
            return done(null, false);
    });
}));

// Autenticação localStrategy usando email e senha
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha',
}, (username, password, done) => {
    Usuario.findOne({ email:username }, (err, usuario) => {
        // Erro no banco de dados
        if (err)
            return done(err);
        // Usuario não existe
        if (!usuario)
            return done(null, false);
        // Confirma senha
        usuario.compararSenha(password, done);
    });
}));