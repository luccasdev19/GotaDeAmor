const express = require('express');
const { createDonation, getAllDonations, getDonationStats, deleteDonation } = require('../controllers/donationController');
const authAdmin = require('../middleware/authAdmin');
const validateObjectId = require('../middleware/validateObjectId');
const { createLimiter, publicLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Rotas públicas
router.post('/donation', createLimiter, createDonation); // POST /api/donation
router.get('/donations/stats', publicLimiter, getDonationStats); // GET /api/donations/stats

// Rotas admin (protegidas)
router.get('/donations', authAdmin, getAllDonations); // GET /api/admin/donations
router.delete('/donations/:id', authAdmin, validateObjectId, deleteDonation); // DELETE /api/admin/donations/:id

module.exports = router;
