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

    // ====== SEGURANÇA: Enviar JWT em httpOnly Cookie ======
    const isProduction = process.env.NODE_ENV === 'production';
    res.setHeader('Set-Cookie', 
      `admin_token=${token}; HttpOnly; Path=/; Max-Age=604800${
        isProduction ? '; Secure; SameSite=Strict' : '; SameSite=Lax'
      }`
    );

    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      // NÃO retornar token no JSON (está no cookie)
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

// POST - Logout (limpar cookie)
exports.logout = (req, res) => {
  res.setHeader('Set-Cookie', 'admin_token=; HttpOnly; Path=/; Max-Age=0');
  res.status(200).json({
    success: true,
    message: 'Logout realizado com sucesso',
  });
};
