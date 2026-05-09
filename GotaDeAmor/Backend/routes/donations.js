const express = require('express');
const { createDonation, getAllDonations, getDonationStats, deleteDonation } = require('../controllers/donationController');
const authAdmin = require('../middleware/authAdmin');

const router = express.Router();

// Rotas públicas
router.post('/donation', createDonation); // POST /api/donation
router.get('/donations/stats', getDonationStats); // GET /api/donations/stats

// Rotas admin (protegidas)
router.get('/donations', authAdmin, getAllDonations); // GET /api/admin/donations
router.delete('/donations/:id', authAdmin, deleteDonation); // DELETE /api/admin/donations/:id

module.exports = router;
