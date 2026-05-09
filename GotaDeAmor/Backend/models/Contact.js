const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'Nome é obrigatório'],
      trim: true,
      minlength: [3, 'Nome deve ter no mínimo 3 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'Email é obrigatório'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido'],
    },
    telefone: {
      type: String,
      required: [true, 'Telefone é obrigatório'],
      trim: true,
    },
    assunto: {
      type: String,
      enum: ['voluntariado', 'estagio', 'doacoes', 'parceria', 'imprensa', 'outro'],
      required: [true, 'Assunto é obrigatório'],
    },
    mensagem: {
      type: String,
      required: [true, 'Mensagem é obrigatória'],
      minlength: [10, 'Mensagem deve ter no mínimo 10 caracteres'],
      maxlength: [5000, 'Mensagem não pode exceder 5000 caracteres'],
    },
    lido: {
      type: Boolean,
      default: false,
    },
    respondido: {
      type: Boolean,
      default: false,
    },
    respostaData: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
