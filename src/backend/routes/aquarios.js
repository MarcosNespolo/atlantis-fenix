// Importa módulos
const router = require('express').Router();
const passport = require('passport');
const Aquario = require('../models/aquario.model').Aquario;

// Rota que lista os aquários de um usuário
router.get('/list', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.isAuthenticated) {
    Aquario.find({ criadoPor: req.user.email })
      .then(aquarios => res.json(aquarios))
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else
    res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Rota que lista as informações de um aquário de um usuário
router.get('/:nome', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.isAuthenticated) {
    Aquario.findOne({ nome: req.params.nome, criadoPor: req.user.email })
      .then(aquario => res.json(aquario))
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else
    res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Rota de cadastro de aquário no próprio perfil de usuário
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.isAuthenticated) {
    const { nome, tipo, larguraMinima, alturaMinima, comprimentoMinimo, volumeMinimo, volumeRestante, colunaDagua,
      temperaturaMinima, temperaturaMaxima, phMinimo, phMaximo, gdhMinimo, gdhMaximo, salinidadeMinima, 
      salinidadeMaxima, especies, itens } = req.body;

    const novoAquario = new Aquario({
      nome, tipo, larguraMinima, alturaMinima, comprimentoMinimo, volumeMinimo, volumeRestante, colunaDagua,
      temperaturaMinima, temperaturaMaxima, phMinimo, phMaximo, gdhMinimo, gdhMaximo, salinidadeMinima, 
      salinidadeMaxima, criadoPor: req.user.email, especies, itens
    });

    novoAquario.save()
      .then(() => res.json('Aquario Cadastrado no Perfil!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else
    res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Rota para deletar um aquário de um usuário
router.delete('/:nome', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.isAuthenticated) {
    Aquario.findOneAndDelete({nome:req.params.nome, criadoPor:req.user.email})
      .then(() => res.json('Aquario deletado do perfil!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else
    res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Rota HTTP POST FindAndUpdate usuario ByID
router.post('/update/:nome', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.isAuthenticated) {
      Aquario.findOne({nome:req.params.nome,criadoPor:req.user.email})
          .then(aquario => {
              aquario.nome = req.body.nome;
              aquario.tipo = req.body.tipo;
              aquario.larguraMinima = req.body.larguraMinima;
              aquario.alturaMinima = req.body.alturaMinima;
              aquario.comprimentoMinimo = req.body.comprimentoMinimo;
              aquario.volumeMinimo = req.body.volumeMinimo;
              aquario.volumeRestante = req.body.volumeRestante;
              aquario.colunaDagua = req.body.colunaDagua;
              aquario.temperaturaMaxima = req.body.temperaturaMaxima;
              aquario.temperaturaMinima = req.body.temperaturaMinima;
              aquario.phMaximo = req.body.phMaximo;
              aquario.phMinimo = req.body.phMinimo;
              aquario.gdhMaximo = req.body.gdhMaximo;
              aquario.gdhMinimo = req.body.gdhMinimo;
              aquario.salinidadeMaxima = req.body.salinidadeMaxima;
              aquario.salinidadeMinima = req.body.salinidadeMinima;
              aquario.especies = req.body.especies;
              aquario.itens = req.body.itens;

              aquario.save()
                  .then(() => res.json('Aquário Atualizado!'))
                  .catch(err => res.status(400).json('Error: ' + err));
          })
          .catch(err => res.status(400).json('Error: ' + err));
  }
  else
      res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Esporta rota de tratamento de exercícios
module.exports = router;