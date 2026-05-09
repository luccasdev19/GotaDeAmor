const express = require('express');
const { createContact, getAllContacts, getContact, deleteContact } = require('../controllers/contactController');
const authAdmin = require('../middleware/authAdmin');

const router = express.Router();

// Rotas públicas
router.post('/contact', createContact); // POST /api/contact

// Rotas admin (protegidas)
router.get('/contacts', authAdmin, getAllContacts); // GET /api/admin/contacts
router.get('/contacts/:id', authAdmin, getContact); // GET /api/admin/contacts/:id
router.delete('/contacts/:id', authAdmin, deleteContact); // DELETE /api/admin/contacts/:id

module.exports = router;
