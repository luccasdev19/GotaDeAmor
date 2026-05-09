const jwt = require('jsonwebtoken');

// POST - Login admin
exports.login = async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      return res.status(400).json({
        success: false,
        message: 'Usuário e senha são obrigatórios',
      });
    }

    // Verificar credenciais (simples - em produção usar banco de dados)
    if (usuario !== process.env.ADMIN_USER || senha !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: 'Usuário ou senha incorretos',
      });
    }

    // Gerar JWT
    const token = jwt.sign(
      { usuario, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Erro ao fazer login',
      error: error.message,
    });
  }
};
