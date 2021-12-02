const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const opcaoSchema = new Schema({
  campo: { type: String, required: true },
  valor: { type: String, required: true },
  criadoPor: { type: String, required: true },
}, {
  timestamps: true,
});

const Opcao = mongoose.model('opcao', opcaoSchema);

module.exports = Opcao;