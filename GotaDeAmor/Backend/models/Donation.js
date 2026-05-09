const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    nomeDoador: {
      type: String,
      trim: true,
    },
    emailDoador: {
      type: String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido'],
    },
    telefoneDoador: {
      type: String,
      trim: true,
    },
    valor: {
      type: Number,
      required: [true, 'Valor é obrigatório'],
      min: [1, 'Valor mínimo é R$1,00'],
      max: [1000000, 'Valor máximo é R$1.000.000,00'],
    },
    metodo: {
      type: String,
      enum: ['pix', 'cartao', 'transferencia'],
      default: 'pix',
    },
    comprovante: {
      type: String, // ID da transação Pix simulado
      unique: true,
      sparse: true,
    },
    status: {
      type: String,
      enum: ['pendente', 'confirmado', 'cancelado'],
      default: 'pendente',
    },
    reciboDados: {
      dataRecebimento: Date,
      cnpj: String,
      razaoSocial: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Donation', donationSchema);
