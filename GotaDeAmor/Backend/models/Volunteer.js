const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
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
    areaInteresse: {
      type: [String], // pode ter múltiplas áreas
      enum: ['eventos', 'atendimento_social', 'educacao', 'saude', 'tecnologia', 'administrativo', 'outro'],
      required: [true, 'Área de interesse é obrigatória'],
    },
    disponibilidade: {
      type: String,
      enum: ['fim_de_semana', 'entre_semana', 'manhã', 'tarde', 'noite', 'flexível'],
      required: [true, 'Disponibilidade é obrigatória'],
    },
    experiencia: {
      type: String,
      maxlength: [1000, 'Descrição não pode exceder 1000 caracteres'],
    },
    status: {
      type: String,
      enum: ['ativo', 'inativo', 'bloqueado'],
      default: 'ativo',
    },
    dataInscricao: {
      type: Date,
      default: Date.now,
    },
    ultimoContato: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);
