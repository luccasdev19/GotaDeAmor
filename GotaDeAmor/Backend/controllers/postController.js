const Post = require('../models/Post');

// POST - Criar novo post (ADMIN)
exports.createPost = async (req, res) => {
  try {
    const { titulo, conteudo, resumo, autor, categoria, imagem, tags, status } = req.body;

    if (!titulo || !conteudo) {
      return res.status(400).json({
        success: false,
        message: 'Título e conteúdo são obrigatórios',
      });
    }

    const post = await Post.create({
      titulo,
      conteudo,
      resumo,
      autor: autor || 'Gota de Amor',
      categoria,
      imagem,
      tags,
      status: status || 'rascunho',
      dataPublicacao: status === 'publicado' ? new Date() : null,
    });

    res.status(201).json({
      success: true,
      message: 'Post criado com sucesso!',
      post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar post',
      error: error.message,
    });
  }
};

// GET - Listar posts públicos
exports.getPublicPosts = async (req, res) => {
  try {
    const { categoria, pagina = 1, limite = 10 } = req.query;

    let filtro = { status: 'publicado' };
    if (categoria) {
      filtro.categoria = categoria;
    }

    const skip = (pagina - 1) * limite;

    const posts = await Post.find(filtro)
      .sort({ dataPublicacao: -1 })
      .skip(skip)
      .limit(parseInt(limite));

    const total = await Post.countDocuments(filtro);

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      pagina: parseInt(pagina),
      totalPaginas: Math.ceil(total / limite),
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar posts',
      error: error.message,
    });
  }
};

// GET - Listar todos os posts (ADMIN)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar posts',
      error: error.message,
    });
  }
};

// GET - Obter um post específico
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado',
      });
    }

    // Incrementar visualizações
    post.visualizacoes += 1;
    await post.save();

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar post',
      error: error.message,
    });
  }
};

// PUT - Atualizar post (ADMIN)
exports.updatePost = async (req, res) => {
  try {
    const { titulo, conteudo, resumo, autor, categoria, imagem, tags, status } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado',
      });
    }

    // Atualizar campos
    if (titulo) post.titulo = titulo;
    if (conteudo) post.conteudo = conteudo;
    if (resumo) post.resumo = resumo;
    if (autor) post.autor = autor;
    if (categoria) post.categoria = categoria;
    if (imagem) post.imagem = imagem;
    if (tags) post.tags = tags;
    if (status) {
      post.status = status;
      if (status === 'publicado' && !post.dataPublicacao) {
        post.dataPublicacao = new Date();
      }
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: 'Post atualizado com sucesso',
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar post',
      error: error.message,
    });
  }
};

// DELETE - Deletar post (ADMIN)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post deletado com sucesso',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar post',
      error: error.message,
    });
  }
};
