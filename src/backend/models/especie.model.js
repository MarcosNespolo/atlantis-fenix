const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const especieSchema = new Schema({
  imagens: [{ data: Buffer, contentType: String }],
  nomeComumPortugues: { type: String, required: true, unique: true, sparse:true },
  nomeComumIngles: { type: String, required: true },
  nomeCientifico: { type: String, required: true },
  familia: { type: String, required: true },
  ordem: { type: String, required: true },
  bioma: { type: String, required: true },
  paisOrigem: { type: String, required: true },
  habitat: { type: String, required: true },
  temperaturaMaxima: { type: Number, required: true },
  temperaturaMinima: { type: Number, required: true },
  phMaximo: { type: Number, required: true },
  phMinimo: { type: Number, required: true },
  gdhMaximo: { type: Number, required: true },
  gdhMinimo: { type: Number, required: true },
  salinidadeMaxima: { type: Number, required: true },
  salinidadeMinima: { type: Number, required: true },
  tamanhoAdulto: { type: Number, required: true },
  racao: { type: String, required: true },
  refeicoesPorDia: { type: Number, required: true },
  cardumeMaximo: { type: Number, required: true },
  cardumeMinimo: { type: Number, required: true },
  estadoDaAgua: { type: String, required: true },
  alturaMinimaAquario: { type: Number, required: true },
  larguraMinimaAquario: { type: Number, required: true },
  volumeMinimoSozinho: { type: Number, required: true },
  volumeMinimoCardume: { type: Number, required: true },
  posicao: { type: String, required: true },
  substratoIndicado: { type: String, required: true },
  temperamentoMesmaEspecie: { type: String, required: true },
  temperamentoOutraEspecie: { type: String, required: true },
  dieta: { type: String, required: true },
  dimorfismoSexual: { type: String, required: true },
  reproducao: { type: String, required: true },
  observacoes: { type: String, required: true },
  criadoPor: { type: String, required: true },
  atualizadoPor: { type: String, required: true },
}, {
  timestamps: true, // Cria CreatedAt e UpdatedAt no Schema
});

const Especie = mongoose.model('especie', especieSchema);

module.exports = {Especie, especieSchema};