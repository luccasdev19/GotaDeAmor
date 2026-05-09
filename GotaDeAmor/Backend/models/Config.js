const mongoose = require('mongoose');

const configSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      unique: true,
    },
    valor: mongoose.Schema.Types.Mixed, // Pode ser string, number, object, array
    descricao: String,
    tipo: {
      type: String,
      enum: ['string', 'number', 'object', 'array'],
      default: 'string',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Config', configSchema);
