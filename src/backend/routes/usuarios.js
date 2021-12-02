// Importa módulos
const express = require('express');
const router = require('express').Router();
const passport = require('passport');
const passportConfig = require('../utils/passport');
const JWT = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

const signToken = usuarioId => {
    return JWT.sign({
        iss: process.env.ISS_TOKEN,
        sub: usuarioId
    }, process.env.SECRET_OR_KEY, { expiresIn: "1h" });
}

// Rota de cadastro próprio dos usuários
router.route('/register').post((req, res) => {
    const { nome, email, senha, role, status, cidade } = req.body;

    Usuario.findOne({ email }, (err, user) => {
        if (err)
            res.status(500).json({ message: { msgBody: err, msgError: true } });
        if (user)
            res.status(400).json({ message: { msgBody: "Email já cadastrado", msgError: true } });
        else {
            const novoUsuario = new Usuario({
                nome, email, senha, role, status, cidade, aquarios: []
            });
            novoUsuario.save()
                .then(() => res.json({ msgBody: "Perfil Cadastrado!", msgError: false }))
                .catch(err => res.status(400).json({ msgBody: err, msgError: true }));
        }
    });
});

// Rota que trata o Login de Usuario
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, nome, email, role } = req.user;
        const token = signToken(_id);
        res.cookie("access_token", token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, usuario: { _id, nome, email, role } });
    }
});

// Rota que trata o Logout de Usuario
router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({ usuario: { _id: "", nome: "", email: "", role: "" }, sucess: true });
});

// Rota que trata a sincronização das sessões de usuário com o cliente
router.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { _id, nome, email, role } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { _id, nome, email, role } });
});

// Rota que trata requisições HTTP POST Adicionar usuario
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.role === 'Admin') {
        const { nome, email, senha, role, status, cidade } = req.body;

        const novoUsuario = new Usuario({
            nome, email, senha, role, status, cidade
        });

        novoUsuario.save()
            .then(() => res.json('Perfil de Usuario Salvo!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else
        res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Rota HTTP GET Find exercicio ByID
router.get('/find/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        Usuario.findById(req.params.id)
            .then(usuario => res.json(usuario))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else
        res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Rota que trata requisições HTTP GET find One
router.get('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.role === 'Admin') {
        Usuario.find()
            .then(usuarios => res.json(usuarios))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else
        res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Rota HTTP DELETE findAndDelete usuario
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.role === 'Admin') {
        Usuario.findByIdAndDelete(req.params.id)
            .then(() => res.json('Perfil de Usuario deletado!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else
        res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Rota HTTP POST FindAndUpdate usuario ByID
router.post('/update/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.role === 'Admin') {
        Usuario.findById(req.params.id)
            .then(usuario => {
                usuario.nome = req.body.nome;
                usuario.email = req.body.email;
                usuario.role = req.body.role;
                usuario.status = req.body.status;
                usuario.cidade = req.body.cidade;

                if(req.body.senha !== '')
                    usuario.senha = req.body.senha;

                usuario.save()
                    .then(() => res.json('Perfil de Usuário Atualizado!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else
        res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});


// Exporta rota de tratamento de exercícios
module.exports = router;