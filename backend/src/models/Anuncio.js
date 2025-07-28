const mongoose = require('mongoose');

const AnuncioSchema = new mongoose.Schema({
  marca: String,
  modelo: String,
  ano: Number,
  preco: Number,
  km: Number,
  descricao: String,     
  fotos: [String],
  whatsapp: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Anuncio', AnuncioSchema);