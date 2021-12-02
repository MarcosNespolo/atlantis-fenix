// Importa módulos
const router = require('express').Router();
const passport = require('passport');
const Opcao = require('../models/opcao.model');

// Rota que trata requisições HTTP GET find One
router.route('/list').get((req, res) => {
  Opcao.find()
    .then(opcoes => res.json(opcoes))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Rota que trata requisições HTTP POST Adicionar Item
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.role === 'Especialista') {
    const novaOpcao = new Opcao({
      campo: req.body.campo,
      valor: req.body.valor,
      criadoPor: req.user.nome
    });

    novaOpcao.save()
      .then(() => res.json('Opção Salva!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else
    res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Rota HTTP GET Find exercicio ByID
router.route('/find').get((req, res) => {
  Opcao.find({campo:req.body.campo})
    .then(opcoes => res.json(opcoes))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Rota HTTP DELETE findAndDelete exercicio
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.role === 'Especialista') {
    Opcao.findByIdAndDelete(req.params.id)
      .then(() => res.json('Opcao deletada!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else
    res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Rota HTTP POST FindAndUpdate exercicio ByID
router.post('/update/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.role === 'Especialista') {
    Opcao.findById(req.params.id)
      .then(opcao => {
        opcao.campo = req.body.campo;
        opcao.valor = req.body.valor;

        opcao.save()
          .then(() => res.json('Opcao Atualizada!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else
    res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Esporta rota de tratamento de exercícios
module.exports = router;