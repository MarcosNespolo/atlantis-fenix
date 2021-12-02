// Importa módulos
const router = require('express').Router();
const passport = require('passport');
const Item = require('../models/item.model');

// Rota que trata requisições HTTP GET find One
router.route('/list').get((req, res) => {
  Item.find()
    .then(itens => res.json(itens))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Rota que trata requisições HTTP POST Adicionar Item
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.role === 'Especialista') {
    const novoItem = new Item({
      nome: req.body.nome,
      tipo: req.body.tipo,
      subtipo: req.body.subtipo,
      descricao: req.body.descricao,
      criadoPor: req.user.nome,
      atualizadoPor: req.user.nome
    });

    novoItem.save()
      .then(() => res.json('Item de Aquarismo Salvo!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else
    res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Rota HTTP GET Find exercicio ByID
router.route('/:id').get((req, res) => {
  Item.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Rota HTTP DELETE findAndDelete exercicio
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.role === 'Especialista') {
    Item.findByIdAndDelete(req.params.id)
      .then(() => res.json('Item deletado!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else
    res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Rota HTTP POST FindAndUpdate exercicio ByID
router.post('/update/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.role === 'Especialista') {
    Item.findById(req.params.id)
      .then(item => {
        item.nome = req.body.nome;
        item.tipo = req.body.tipo;
        item.subtipo = req.body.subtipo;
        item.descricao = req.body.descricao;
        item.atualizadoPor = req.user.nome;

        item.save()
          .then(() => res.json('Item Atualizado!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else
    res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Esporta rota de tratamento de exercícios
module.exports = router;