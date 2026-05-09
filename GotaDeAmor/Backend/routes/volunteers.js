const express = require('express');
const { createVolunteer, getAllVolunteers, getVolunteer, updateVolunteer, deleteVolunteer } = require('../controllers/volunteerController');
const authAdmin = require('../middleware/authAdmin');

const router = express.Router();

// Rotas públicas
router.post('/volunteer', createVolunteer); // POST /api/volunteer

// Rotas admin (protegidas)
router.get('/volunteers', authAdmin, getAllVolunteers); // GET /api/admin/volunteers
router.get('/volunteers/:id', authAdmin, getVolunteer); // GET /api/admin/volunteers/:id
router.put('/volunteers/:id', authAdmin, updateVolunteer); // PUT /api/admin/volunteers/:id
router.delete('/volunteers/:id', authAdmin, deleteVolunteer); // DELETE /api/admin/volunteers/:id

module.exports = router;
