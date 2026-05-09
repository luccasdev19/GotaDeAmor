# 🏗️ Arquitetura Gota de Amor - Diagrama Técnico

## 1. Fluxo de Requisição (Exemplo: Enviar Contato)

```
Frontend (Browser)
    ↓
GET/POST http://localhost:3000/contato.html
    ↓
User preenche formulário
    ↓
JavaScript chama: enviarContato()
    ↓
fetch POST http://localhost:5000/api/contact
    ↓
┌─────────────────────────────────────────────────┐
│         Backend (Express - localhost:5000)       │
├─────────────────────────────────────────────────┤
│ middleware/CORS → validação → contactController │
│       ↓                                           │
│   Validar dados                                   │
│   Salvar em MongoDB                              │
│   Enviar email (NodeMailer)                      │
│       ↓                                           │
│   Response 201 + dados salvo                     │
└─────────────────────────────────────────────────┘
    ↓
MongoDB Atlas (Cloud)
    ├── collections
    │   ├── contacts
    │   ├── donations
    │   ├── volunteers
    │   ├── posts
    │   └── configs
    ↓
Email Service (Gmail SMTP)
    ├── Email de confirmação → User
    └── Email notificação → ONG
    ↓
Response volta ao Frontend
    ↓
JavaScript exibe resultado ao usuário
```

---

## 2. Stack Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                      🌐 FRONTEND LAYER                          │
│  (Next.js + HTML/CSS/JavaScript - localhost:3000)              │
├─────────────────────────────────────────────────────────────────┤
│  - UI Components (shadcn/ui)                                    │
│  - Forms & Validation                                            │
│  - Client-side API calls (lib/api.ts, lib/api-client.js)       │
└─────────────────────────────────────────────────────────────────┘
              ↕ HTTP / JSON
┌─────────────────────────────────────────────────────────────────┐
│                 🔧 BACKEND LAYER                                 │
│       (Express.js - localhost:5000)                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Route Layer (/routes)                                   │   │
│  │  - /contact, /donations, /volunteers, /posts, /config   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Middleware Layer (/middleware)                          │   │
│  │  - auth.js (verify JWT)                                  │   │
│  │  - authAdmin.js (verify JWT + admin role)               │   │
│  │  - CORS, Body Parser, etc                               │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Controller Layer (/controllers)                         │   │
│  │  - contactController.js (CRUD logic)                     │   │
│  │  - donationController.js                                 │   │
│  │  - volunteerController.js                                │   │
│  │  - postController.js                                     │   │
│  │  - configController.js                                   │   │
│  │  - authController.js                                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Model Layer (/models - Mongoose)                        │   │
│  │  - Contact.js (schema)                                   │   │
│  │  - Donation.js (schema)                                  │   │
│  │  - Volunteer.js (schema)                                 │   │
│  │  - Post.js (schema)                                      │   │
│  │  - Config.js (schema)                                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Utilities (/config, /utils)                             │   │
│  │  - database.js (MongoDB connection)                      │   │
│  │  - email.js (NodeMailer config)                          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
              ↕ Database Queries
┌─────────────────────────────────────────────────────────────────┐
│           💾 DATA PERSISTENCE LAYER                              │
│  MongoDB Atlas (Cloud - sa-east-1)                              │
├─────────────────────────────────────────────────────────────────┤
│  - contacts (collection)                                         │
│  - donations (collection)                                        │
│  - volunteers (collection)                                       │
│  - posts (collection)                                            │
│  - configs (collection)                                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│          📧 EXTERNAL SERVICES                                    │
├─────────────────────────────────────────────────────────────────┤
│  - Gmail SMTP (NodeMailer)                                       │
│  - Pix (Simulado - futuro integração real)                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Fluxo de Autenticação (Admin)

```
User acessa painel admin
    ↓
Frontend envia: POST /api/auth/login
    { "usuario": "admin", "senha": "123456" }
    ↓
Backend (authController.js):
    - Valida usuário/senha contra .env
    - Se OK → Gera JWT Token
    - Response: { token: "eyJhbGc..." }
    ↓
Frontend armazena token (localStorage)
    ↓
Para requisições admin:
    fetch POST /api/contacts
    Headers: { Authorization: "Bearer eyJhbGc..." }
    ↓
Backend (middleware/auth.js):
    - Verifica se token existe
    - Decodifica JWT
    - Se válido → passa requisição adiante
    - Se inválido → retorna 401
    ↓
Controller processa requisição
    ↓
Response retorna ao frontend
```

---

## 4. Data Models (Collections)

### Contact Schema
```
{
  _id: ObjectId,
  nome: String,
  email: String,
  telefone: String,
  assunto: Enum[voluntariado, estagio, ...],
  mensagem: String,
  lido: Boolean = false,
  respondido: Boolean = false,
  respostaData: Date = null,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Donation Schema
```
{
  _id: ObjectId,
  nomeDoador: String,
  emailDoador: String,
  telefoneDoador: String,
  valor: Number,
  metodo: Enum[pix, cartao, transferencia],
  comprovante: String (unique),
  status: Enum[pendente, confirmado, cancelado],
  reciboDados: {
    dataRecebimento: Date,
    cnpj: String,
    razaoSocial: String
  },
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Volunteer Schema
```
{
  _id: ObjectId,
  nome: String,
  email: String,
  telefone: String,
  areaInteresse: Array[String],
  disponibilidade: String,
  experiencia: String,
  status: Enum[ativo, inativo, bloqueado],
  dataInscricao: Date,
  ultimoContato: Date,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Post Schema
```
{
  _id: ObjectId,
  titulo: String,
  conteudo: String,
  resumo: String,
  autor: String,
  categoria: Enum[noticia, evento, dica, historia, outro],
  imagem: String (URL),
  tags: Array[String],
  status: Enum[rascunho, publicado, arquivado],
  visualizacoes: Number,
  dataPublicacao: Date,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Config Schema
```
{
  _id: ObjectId,
  nome: String (unique),
  valor: Mixed (string, number, object, array),
  descricao: String,
  tipo: Enum[string, number, object, array],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 5. Endpoints Summary

```
┌─────────────────────────────────────────────────────────┐
│               CONTATOS                                  │
├─────────────────────────────────────────────────────────┤
│ POST   /api/contact              [PUBLIC]              │
│ GET    /api/contacts             [ADMIN]               │
│ GET    /api/contacts/:id         [ADMIN]               │
│ DELETE /api/contacts/:id         [ADMIN]               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│               DOAÇÕES                                   │
├─────────────────────────────────────────────────────────┤
│ POST   /api/donation             [PUBLIC]              │
│ GET    /api/donations/stats      [PUBLIC]              │
│ GET    /api/donations            [ADMIN]               │
│ DELETE /api/donations/:id        [ADMIN]               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│               VOLUNTÁRIOS                               │
├─────────────────────────────────────────────────────────┤
│ POST   /api/volunteer            [PUBLIC]              │
│ GET    /api/volunteers           [ADMIN]               │
│ GET    /api/volunteers/:id       [ADMIN]               │
│ PUT    /api/volunteers/:id       [ADMIN]               │
│ DELETE /api/volunteers/:id       [ADMIN]               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│               BLOG                                      │
├─────────────────────────────────────────────────────────┤
│ GET    /api/posts                [PUBLIC]              │
│ GET    /api/posts/:id            [PUBLIC]              │
│ POST   /api/posts                [ADMIN]               │
│ GET    /api/admin/posts          [ADMIN]               │
│ PUT    /api/posts/:id            [ADMIN]               │
│ DELETE /api/posts/:id            [ADMIN]               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│               CONFIGURAÇÕES                             │
├─────────────────────────────────────────────────────────┤
│ GET    /api/config               [PUBLIC]              │
│ GET    /api/config/:nome         [PUBLIC]              │
│ PUT    /api/config               [ADMIN]               │
│ PUT    /api/configs              [ADMIN]               │
│ DELETE /api/config/:nome         [ADMIN]               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│               AUTENTICAÇÃO                              │
├─────────────────────────────────────────────────────────┤
│ POST   /api/auth/login           [PUBLIC]              │
└─────────────────────────────────────────────────────────┘
```

---

## 6. Deployment Architecture (Futuro)

```
┌─────────────────────────────────────────────────────────┐
│           🌐 CDN / DNS (CloudFlare, etc)               │
└─────────────────────────────────────────────────────────┘
                      ↓
        gotadeamor.com.br / www.gotadeamor.com.br
                      ↓
        ┌───────────────────────────────┐
        │   Frontend (Vercel / Netlify)  │
        │    - Static + SSR Next.js     │
        │    - Auto-deploy from GitHub  │
        └───────────────────────────────┘
                      ↓
        ┌───────────────────────────────┐
        │   Backend API (Heroku/Railway) │
        │    - Express.js Docker        │
        │    - Auto-deploy from GitHub  │
        └───────────────────────────────┘
                      ↓
        ┌───────────────────────────────┐
        │   MongoDB Atlas (Cloud)        │
        │    - Production Cluster M2/M5 │
        │    - Backups automáticos      │
        └───────────────────────────────┘
```

---

## 7. Security Layers

```
┌─────────────────────────────────────────────┐
│  Frontend (Client-side Validation)          │
│  - Email format check                       │
│  - Required fields validation               │
│  - Input sanitization                       │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│  Network Layer (HTTPS/TLS)                  │
│  - Encrypted communication                  │
│  - CORS protection                          │
│  - Rate limiting (future)                   │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│  API Layer (Server-side Validation)         │
│  - Mongoose schema validation               │
│  - Input type checking                      │
│  - Business logic validation                │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│  Authentication Layer (JWT)                 │
│  - Token verification                       │
│  - Role-based access control (RBAC)         │
│  - Token expiration                         │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│  Database Layer (MongoDB)                   │
│  - Encrypted connections (TLS)              │
│  - Access control (IP whitelist)            │
│  - Data validation in schema                │
└─────────────────────────────────────────────┘
```

---

## 8. Error Handling Flow

```
Request chega no Backend
    ↓
❌ CORS Error? → Response 403
❌ Validação falha? → Response 400
❌ Token inválido? → Response 401
❌ Acesso negado? → Response 403
❌ Recurso não encontrado? → Response 404
❌ Erro interno? → Response 500

Todos retornam JSON padrão:
{
  "success": false,
  "message": "Descrição do erro",
  "error": "Detalhes técnicos (apenas dev)"
}
```

---

## 9. Performance Considerations

```
Otimizações Implementadas:
✅ Índices no MongoDB (email unique, etc)
✅ Paginação no blog (não carregar tudo)
✅ Compressão com middleware (gzip)
✅ Validação no schema (evita queries ruins)
✅ Cache headers possível (CDN)
✅ Lazy loading no frontend

Futuras Melhorias:
⏳ Redis cache para dados frequentes
⏳ Image optimization (compressão)
⏳ Database query optimization
⏳ CDN para assets
⏳ Load balancing (múltiplos servers)
```

---

**Essa arquitetura escala facilmente e segue best practices da indústria! 🚀**
