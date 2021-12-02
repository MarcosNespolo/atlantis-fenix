const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  imagens: [{ data: Buffer, contentType: String }],
  nome: { type: String, required: true },
  tipo: { type: String, required: true },
  subtipo: { type: String, required: true },
  descricao: { type: String, required: true },
  criadoPor: { type: String, required: true },
  atualizadoPor: { type: String, required: true }
}, {
  timestamps: true,
});

const Item = mongoose.model('iten', itemSchema);

module.exports = Item;