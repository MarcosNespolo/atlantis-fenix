const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const aquarioSchema = new Schema({
  imagens: [{ data: Buffer, contentType: String }],
  nome: { type: String, required: true },
  tipo: { type: String, required: true },
  larguraMinima: { type: Number },
  alturaMinima: { type: Number },
  comprimentoMinimo: { type: Number },
  volumeMinimo: { type: Number },
  volumeRestante: { type: Number },
  colunaDagua: { type: Number },
  temperaturaMinima: { type: Number },
  temperaturaMaxima: { type: Number },
  phMinimo: { type: Number },
  phMaximo: { type: Number },
  gdhMinimo: { type: Number },
  gdhMaximo: { type: Number },
  salinidadeMinima: { type: Number },
  salinidadeMaxima: { type: Number },
  criadoPor: { type: String, required: true },
  especies: [{ type: String, required: true }],
  itens: [{ type: String, required: true }]
}, {
  timestamps: true,
});

const Aquario = mongoose.model('aquario', aquarioSchema);

module.exports = { Aquario, aquarioSchema };