const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  foto: { data: Buffer, contentType: String },
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  role: { type: String, required: true, enum: ['Aquarista', 'Especialista', 'Admin'] },
  status: { type: String },
  cidade: { type: String }
}, {
  timestamps: true,
});

usuarioSchema.pre('save', function (next) {
  if (!this.isModified('senha'))
    return next();
  bcrypt.hash(this.senha, 10, (err, senhaHash) => {
    if (err)
      return next(err);
    this.senha = senhaHash;
    next();
  });
});

usuarioSchema.methods.compararSenha = function (senha, cb) {
  bcrypt.compare(senha, this.senha, (err, isMatch) => {
    if (err)
      return cb(err);
    else {
      if (!isMatch)
        return cb(null, isMatch);
      return cb(null, this);
    }
  });
}

const Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;