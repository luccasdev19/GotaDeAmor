const mongoose = require('mongoose');

// Middleware para validar se o ID é um ObjectId válido do MongoDB
const validateObjectId = (req, res, next) => {
  const id = req.params.id;

  // Verificar se o ID é um ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'ID inválido. O ID deve ser um identificador válido do MongoDB.',
      providedId: id,
    });
  }

  next();
};

module.exports = validateObjectId;
