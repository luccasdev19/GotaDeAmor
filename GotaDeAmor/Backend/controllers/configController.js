const Config = require('../models/Config');

// GET - Obter todas as configurações (PUBLIC)
exports.getAllConfigs = async (req, res) => {
  try {
    const configs = await Config.find();

    // Converter para objeto simples
    const configObj = {};
    configs.forEach(cfg => {
      configObj[cfg.nome] = cfg.valor;
    });

    res.status(200).json({
      success: true,
      configs: configObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar configurações',
      error: error.message,
    });
  }
};

// GET - Obter uma configuração específica (PUBLIC)
exports.getConfig = async (req, res) => {
  try {
    const config = await Config.findOne({ nome: req.params.nome });

    if (!config) {
      return res.status(404).json({
        success: false,
        message: 'Configuração não encontrada',
      });
    }

    res.status(200).json({
      success: true,
      config,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar configuração',
      error: error.message,
    });
  }
};

// PUT - Atualizar configuração (ADMIN)
exports.updateConfig = async (req, res) => {
  try {
    const { nome, valor, descricao } = req.body;

    if (!nome || valor === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Nome e valor são obrigatórios',
      });
    }

    let config = await Config.findOne({ nome });

    if (!config) {
      config = await Config.create({ nome, valor, descricao });
    } else {
      config.valor = valor;
      if (descricao) config.descricao = descricao;
      await config.save();
    }

    res.status(200).json({
      success: true,
      message: 'Configuração atualizada com sucesso',
      config,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar configuração',
      error: error.message,
    });
  }
};

// PUT - Atualizar múltiplas configurações (ADMIN)
exports.updateConfigs = async (req, res) => {
  try {
    const { configs } = req.body; // Array de { nome, valor }

    if (!Array.isArray(configs)) {
      return res.status(400).json({
        success: false,
        message: 'Configurations deve ser um array',
      });
    }

    const updatedConfigs = [];

    for (const { nome, valor } of configs) {
      let config = await Config.findOne({ nome });

      if (!config) {
        config = await Config.create({ nome, valor });
      } else {
        config.valor = valor;
        await config.save();
      }

      updatedConfigs.push(config);
    }

    res.status(200).json({
      success: true,
      message: 'Configurações atualizadas com sucesso',
      configs: updatedConfigs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar configurações',
      error: error.message,
    });
  }
};

// DELETE - Deletar configuração (ADMIN)
exports.deleteConfig = async (req, res) => {
  try {
    const config = await Config.findOneAndDelete({ nome: req.params.nome });

    if (!config) {
      return res.status(404).json({
        success: false,
        message: 'Configuração não encontrada',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Configuração deletada com sucesso',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar configuração',
      error: error.message,
    });
  }
};
