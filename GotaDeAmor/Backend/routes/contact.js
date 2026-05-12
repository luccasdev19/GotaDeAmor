const express = require('express');
const { createContact, getAllContacts, getContact, deleteContact, updateContact } = require('../controllers/contactController');
const authAdmin = require('../middleware/authAdmin');
const validateObjectId = require('../middleware/validateObjectId');
const { createLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Rotas públicas
router.post('/contact', createLimiter, createContact); // POST /api/contact

// Rotas admin (protegidas)
router.get('/contacts', authAdmin, getAllContacts); // GET /api/admin/contacts
router.get('/contacts/:id', authAdmin, validateObjectId, getContact); // GET /api/admin/contacts/:id
router.put('/contacts/:id', authAdmin, validateObjectId, updateContact); // PUT /api/admin/contacts/:id
router.delete('/contacts/:id', authAdmin, validateObjectId, deleteContact); // DELETE /api/admin/contacts/:id

module.exports = router;
