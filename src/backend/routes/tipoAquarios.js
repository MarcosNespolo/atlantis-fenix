// Importa módulos
const router = require('express').Router();
const passport = require('passport');
const TipoAquario = require('../models/tipoAquario.model');

// Rota que trata requisições HTTP GET find One
router.route('/list').get((req, res) => {
    TipoAquario.find()
        .then(tipos => res.json(tipos))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Rota que trata requisições HTTP POST Adicionar espécie
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.role === 'Especialista') {

        const novoTipoAquario = new TipoAquario({
            nome: req.body.nome,
            descricao: req.body.descricao,
            criadoPor: req.user.nome,
            atualizadoPor: req.user.nome
        });

        novoTipoAquario.save()
            .then(() => res.json('Tipo de Aquarismo Salvo!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else
        res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Rota HTTP GET Find exercicio ByID
router.route('/:id').get((req, res) => {
    TipoAquario.findById(req.params.id)
        .then(tipo => res.json(tipo))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Rota HTTP DELETE findAndDelete exercicio
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.role === 'Especialista') {
        TipoAquario.findByIdAndDelete(req.params.id)
            .then(() => res.json('Tipo de Aquario deletado!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else
        res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Rota HTTP POST FindAndUpdate exercicio ByID
router.post('/update/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.role === 'Especialista') {
        TipoAquario.findById(req.params.id)
            .then(tipo => {
                tipo.nome = req.body.nome;
                tipo.descricao = req.body.descricao;
                tipo.atualizadoPor = req.user.nome;

                tipo.save()
                    .then(() => res.json('Tipo de Aquario Atualizado!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else
        res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Esporta rota de tratamento de exercícios
module.exports = router;