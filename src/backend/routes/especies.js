// Importa módulos
const router = require('express').Router();
const passport = require('passport');
const modeloEspecie = require('../models/especie.model');
const Especie = modeloEspecie.Especie;

// Rota que trata requisições HTTP GET find One
router.route('/list').get((req, res) => {
  Especie.find()
    .then(especies => res.json(especies))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Rota que trata requisições HTTP POST Adicionar espécie
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.role === 'Especialista') {

    const novaEspecie = new Especie({
      nomeComumPortugues: req.body.nomeComumPortugues,
      nomeComumIngles: req.body.nomeComumIngles,
      nomeCientifico: req.body.nomeCientifico,
      familia: req.body.familia,
      ordem: req.body.ordem,
      bioma: req.body.bioma,
      paisOrigem: req.body.paisOrigem,
      habitat: req.body.habitat,
      temperaturaMaxima: Number(req.body.temperaturaMaxima),
      temperaturaMinima: Number(req.body.temperaturaMinima),
      phMaximo: Number(req.body.phMaximo),
      phMinimo: Number(req.body.phMinimo),
      gdhMaximo: Number(req.body.gdhMaximo),
      gdhMinimo: Number(req.body.gdhMinimo),
      salinidadeMaxima: Number(req.body.salinidadeMaxima),
      salinidadeMinima: Number(req.body.salinidadeMinima),
      tamanhoAdulto: Number(req.body.tamanhoAdulto),
      racao: req.body.racao,
      refeicoesPorDia: Number(req.body.refeicoesPorDia),
      cardumeMaximo: Number(req.body.cardumeMaximo),
      cardumeMinimo: Number(req.body.cardumeMinimo),
      estadoDaAgua: req.body.estadoDaAgua,
      alturaMinimaAquario: Number(req.body.alturaMinimaAquario),
      larguraMinimaAquario: Number(req.body.larguraMinimaAquario),
      volumeMinimoSozinho: Number(req.body.volumeMinimoSozinho),
      volumeMinimoCardume: Number(req.body.volumeMinimoCardume),
      posicao: req.body.posicao,
      substratoIndicado: req.body.substratoIndicado,
      temperamentoMesmaEspecie: req.body.temperamentoMesmaEspecie,
      temperamentoOutraEspecie: req.body.temperamentoOutraEspecie,
      dieta: req.body.dieta,
      dimorfismoSexual: req.body.dimorfismoSexual,
      reproducao: req.body.reproducao,
      observacoes: req.body.observacoes,
      criadoPor: req.user.nome,
      atualizadoPor: req.user.nome
    });

    novaEspecie.save()
      .then(() => res.json({ message: { msgBody: 'Especie Salva!' } }))
      .catch(err => res.status(400).json({ message: { msgBody: 'Error: ' + err, msgError: true } }));
  }
  else
    res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Rota HTTP GET Find exercicio ByID
router.route('/:id').get((req, res) => {
  Especie.findById(req.params.id)
    .then(especie => res.json(especie))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Rota HTTP DELETE findAndDelete exercicio
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.role === 'Especialista') {
    Especie.findByIdAndDelete(req.params.id)
      .then(() => res.json('Especie deletada!'))
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else
    res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Rota HTTP POST FindAndUpdate exercicio ByID
router.post('/update/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.role === 'Especialista') {
    Especie.findById(req.params.id)
      .then(especie => {
        especie.nomeComumPortugues = req.body.nomeComumPortugues;
        especie.nomeComumIngles = req.body.nomeComumIngles;
        especie.nomeCientifico = req.body.nomeCientifico;
        especie.familia = req.body.familia;
        especie.ordem = req.body.ordem;
        especie.bioma = req.body.bioma;
        especie.habitat = req.body.habitat;
        especie.paisOrigem = req.body.paisOrigem;
        especie.temperaturaMaxima = Number(req.body.temperaturaMaxima);
        especie.temperaturaMinima = Number(req.body.temperaturaMinima);
        especie.phMaximo = Number(req.body.phMaximo);
        especie.phMinimo = Number(req.body.phMinimo);
        especie.gdhMaximo = Number(req.body.gdhMaximo);
        especie.gdhMinimo = Number(req.body.gdhMinimo);
        especie.salinidadeMaxima = Number(req.body.salinidadeMaxima);
        especie.salinidadeMinima = Number(req.body.salinidadeMinima);
        especie.tamanhoAdulto = Number(req.body.tamanhoAdulto);
        especie.racao = req.body.racao;
        especie.refeicoesPorDia = Number(req.body.refeicoesPorDia);
        especie.cardumeMaximo = Number(req.body.cardumeMaximo);
        especie.cardumeMinimo = Number(req.body.cardumeMinimo);
        especie.estadoDaAgua = req.body.estadoDaAgua;
        especie.alturaMinimaAquario = Number(req.body.alturaMinimaAquario);
        especie.larguraMinimaAquario = Number(req.body.larguraMinimaAquario);
        especie.volumeMinimoSozinho = Number(req.body.volumeMinimoSozinho);
        especie.volumeMinimoCardume = Number(req.body.volumeMinimoCardume);
        especie.posicao = req.body.posicao;
        especie.substratoIndicado = req.body.substratoIndicado;
        especie.temperamentoMesmaEspecie = req.body.temperamentoMesmaEspecie;
        especie.temperamentoOutraEspecie = req.body.temperamentoOutraEspecie;
        especie.dieta = req.body.dieta;
        especie.dimorfismoSexual = req.body.dimorfismoSexual;
        especie.reproducao = req.body.reproducao;
        especie.observacoes = req.body.observacoes;
        especie.atualizadoPor = req.body.atualizadoPor;

        especie.save()
          .then(() => res.json('Especie Atualizada!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }
  else
    res.status(403).json({ message: { msgBody: 'Permissão negada.', msgError: true } });
});

// Esporta rota de tratamento de exercícios
module.exports = router;