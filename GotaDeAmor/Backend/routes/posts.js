const express = require('express');
const { createPost, getPublicPosts, getAllPosts, getPost, updatePost, deletePost, searchPosts, getPostsByCategory } = require('../controllers/postController');
const authAdmin = require('../middleware/authAdmin');
const validateObjectId = require('../middleware/validateObjectId');
const { publicLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

// Rotas públicas
router.get('/posts', publicLimiter, getPublicPosts); // GET /api/posts
router.get('/posts/search', publicLimiter, searchPosts); // GET /api/posts/search?q=termo
router.get('/posts/categoria/:categoria', publicLimiter, getPostsByCategory); // GET /api/posts/categoria/:categoria
router.get('/posts/:id', publicLimiter, validateObjectId, getPost); // GET /api/posts/:id

// Rotas admin (protegidas)
router.post('/posts', authAdmin, createPost); // POST /api/admin/posts
router.get('/admin/posts', authAdmin, getAllPosts); // GET /api/admin/posts
router.put('/posts/:id', authAdmin, validateObjectId, updatePost); // PUT /api/admin/posts/:id
router.delete('/posts/:id', authAdmin, validateObjectId, deletePost); // DELETE /api/admin/posts/:id

module.exports = router;
