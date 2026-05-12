const express = require('express');
const { getAllConfigs, getConfig, updateConfig, updateConfigs, deleteConfig } = require('../controllers/configController');
const authAdmin = require('../middleware/authAdmin');
const { publicLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Rotas públicas
router.get('/config', publicLimiter, getAllConfigs); // GET /api/config
router.get('/config/:nome', publicLimiter, getConfig); // GET /api/config/:nome

// Rotas admin (protegidas)
router.put('/config', authAdmin, updateConfig); // PUT /api/admin/config
router.put('/configs', authAdmin, updateConfigs); // PUT /api/admin/configs (múltiplas)
router.delete('/config/:nome', authAdmin, deleteConfig); // DELETE /api/admin/config/:nome

module.exports = router;
