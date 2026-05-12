const express = require('express');
const { createVolunteer, getAllVolunteers, getVolunteer, updateVolunteer, deleteVolunteer } = require('../controllers/volunteerController');
const authAdmin = require('../middleware/authAdmin');
const validateObjectId = require('../middleware/validateObjectId');
const { createLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Rotas públicas
router.post('/volunteer', createLimiter, createVolunteer); // POST /api/volunteer

// Rotas admin (protegidas)
router.get('/volunteers', authAdmin, getAllVolunteers); // GET /api/admin/volunteers
router.get('/volunteers/:id', authAdmin, validateObjectId, getVolunteer); // GET /api/admin/volunteers/:id
router.put('/volunteers/:id', authAdmin, validateObjectId, updateVolunteer); // PUT /api/admin/volunteers/:id
router.delete('/volunteers/:id', authAdmin, validateObjectId, deleteVolunteer); // DELETE /api/admin/volunteers/:id

module.exports = router;
