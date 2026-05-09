const express = require('express');
const { createPost, getPublicPosts, getAllPosts, getPost, updatePost, deletePost } = require('../controllers/postController');
const authAdmin = require('../middleware/authAdmin');

const router = express.Router();

// Rotas públicas
router.get('/posts', getPublicPosts); // GET /api/posts
router.get('/posts/:id', getPost); // GET /api/posts/:id

// Rotas admin (protegidas)
router.post('/posts', authAdmin, createPost); // POST /api/admin/posts
router.get('/admin/posts', authAdmin, getAllPosts); // GET /api/admin/posts
router.put('/posts/:id', authAdmin, updatePost); // PUT /api/admin/posts/:id
router.delete('/posts/:id', authAdmin, deletePost); // DELETE /api/admin/posts/:id

module.exports = router;
