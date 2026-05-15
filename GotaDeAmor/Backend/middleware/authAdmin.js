const jwt = require('jsonwebtoken');

const authAdmin = (req, res, next) => {
  try {
    // ====== SEGURANÇA: Ler JWT do httpOnly Cookie ======
    const token = req.cookies?.admin_token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token não fornecido',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar se é admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado. Apenas administradores podem acessar este recurso.',
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido ou expirado',
      error: error.message,
    });
  }
};

module.exports = authAdmin;
