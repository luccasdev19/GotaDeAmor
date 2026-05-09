require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas de Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Rotas de teste
app.get('/api/config', (req, res) => {
  res.json({
    message: 'Backend Gota de Amor funcionando!',
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
  });
});

// ====== IMPORTAR ROTAS ======
const contactRoutes = require('./routes/contact');
const donationRoutes = require('./routes/donations');
const volunteerRoutes = require('./routes/volunteers');
const postRoutes = require('./routes/posts');
const configRoutes = require('./routes/config');
const authRoutes = require('./routes/auth');

// Registrar rotas
app.use('/api', contactRoutes);
app.use('/api', donationRoutes);
app.use('/api', volunteerRoutes);
app.use('/api', postRoutes);
app.use('/api', configRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor Backend rodando em http://localhost:${PORT}`);
  console.log(`📡 Ambiente: ${process.env.NODE_ENV}`);
  console.log(`\n✅ ENDPOINTS DISPONÍVEIS:\n`);
  
  console.log('📧 CONTATO (Público):');
  console.log(`  POST   /api/contact`);
  console.log(`  GET    /api/contacts (ADMIN)`);
  console.log(`  GET    /api/contacts/:id (ADMIN)`);
  console.log(`  DELETE /api/contacts/:id (ADMIN)\n`);
  
  console.log('💳 DOAÇÕES (Público):');
  console.log(`  POST   /api/donation`);
  console.log(`  GET    /api/donations/stats`);
  console.log(`  GET    /api/donations (ADMIN)`);
  console.log(`  DELETE /api/donations/:id (ADMIN)\n`);
  
  console.log('🤝 VOLUNTÁRIOS (Público):');
  console.log(`  POST   /api/volunteer`);
  console.log(`  GET    /api/volunteers (ADMIN)`);
  console.log(`  GET    /api/volunteers/:id (ADMIN)`);
  console.log(`  PUT    /api/volunteers/:id (ADMIN)`);
  console.log(`  DELETE /api/volunteers/:id (ADMIN)\n`);
  
  console.log('📝 BLOG (Público):');
  console.log(`  GET    /api/posts`);
  console.log(`  GET    /api/posts/:id`);
  console.log(`  POST   /api/posts (ADMIN)`);
  console.log(`  GET    /api/admin/posts (ADMIN)`);
  console.log(`  PUT    /api/posts/:id (ADMIN)`);
  console.log(`  DELETE /api/posts/:id (ADMIN)\n`);
  
  console.log('⚙️  CONFIGURAÇÕES (Público):');
  console.log(`  GET    /api/config`);
  console.log(`  GET    /api/config/:nome`);
  console.log(`  PUT    /api/config (ADMIN)`);
  console.log(`  PUT    /api/configs (ADMIN)`);
  console.log(`  DELETE /api/config/:nome (ADMIN)\n`);
  
  console.log('🔐 AUTENTICAÇÃO:');
  console.log(`  POST   /api/auth/login\n`);
  
  console.log('⏰ HEALTH CHECK:');
  console.log(`  GET    /api/health`);
  console.log(`  GET    /api/config\n`);
});

module.exports = app;
