const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'Título é obrigatório'],
      trim: true,
      minlength: [5, 'Título deve ter no mínimo 5 caracteres'],
      maxlength: [200, 'Título não pode exceder 200 caracteres'],
    },
    conteudo: {
      type: String,
      required: [true, 'Conteúdo é obrigatório'],
      minlength: [50, 'Conteúdo deve ter no mínimo 50 caracteres'],
    },
    resumo: {
      type: String,
      maxlength: [500, 'Resumo não pode exceder 500 caracteres'],
    },
    autor: {
      type: String,
      required: [true, 'Autor é obrigatório'],
      default: 'Gota de Amor',
    },
    categoria: {
      type: String,
      enum: ['noticia', 'evento', 'dica', 'historia', 'outro'],
      default: 'noticia',
    },
    imagem: {
      type: String, // URL ou caminho da imagem
      default: null,
    },
    tags: [String],
    status: {
      type: String,
      enum: ['rascunho', 'publicado', 'arquivado'],
      default: 'rascunho',
    },
    visualizacoes: {
      type: Number,
      default: 0,
    },
    dataPublicacao: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
