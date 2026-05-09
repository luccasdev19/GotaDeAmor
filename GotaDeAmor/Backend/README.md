# 🚀 Backend Gota de Amor - Documentação

## Visão Geral

Servidor Express + MongoDB fornecendo APIs para o frontend da ONG Gota de Amor.

## ⚙️ Setup Inicial

### 1. Instalar Dependências (Já Feito)
```bash
cd Backend
npm install
```

### 2. Configurar MongoDB Atlas

1. Acessar [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Criar conta (gratuita)
3. Criar um novo cluster (M0 - gratuito)
4. Obter connection string: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/gota-de-amor?retryWrites=true&w=majority`
5. Atualizar `.env` com a URI obtida:
   ```
   MONGO_URI=mongodb+srv://seu_usuario:sua_senha@seu_cluster.mongodb.net/gota-de-amor?retryWrites=true&w=majority
   ```

### 3. Configurar Email (NodeMailer)

#### Gmail (Recomendado)

1. Acessar [Gmail Configurações](https://myaccount.google.com/security)
2. Ativar "Verificação em 2 etapas"
3. Gerar "Senha de Aplicativo":
   - Ir em "Senhas de Aplicativo"
   - Selecionar "Email" e "Windows"
   - Copiar a senha gerada
4. Atualizar `.env`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=seu_email@gmail.com
   SMTP_PASS=sua_app_password_aqui
   EMAIL_FROM=seu_email@gmail.com
   ```

#### Outro Servidor SMTP

Atualize os dados do seu servidor:
```
SMTP_HOST=seu_host_aqui
SMTP_PORT=587
SMTP_USER=seu_usuario
SMTP_PASS=sua_senha
EMAIL_FROM=seu_email
```

### 4. Configurar Autenticação Admin

Atualize `.env` com credenciais:
```
ADMIN_USER=admin
ADMIN_PASSWORD=sua_senha_super_segura_aqui
JWT_SECRET=sua_chave_jwt_secreta_aqui
JWT_EXPIRE=7d
```

### 5. Iniciar Servidor
```bash
npm start
# Ou com auto-reload:
npm run dev
```

Você verá:
```
🚀 Servidor Backend rodando em http://localhost:5000
📡 Ambiente: development

✅ ENDPOINTS DISPONÍVEIS:
...
```

## 📡 Endpoints da API

### 🔐 Autenticação

#### Login (POST)
```
POST /api/auth/login
Body: {
  "usuario": "admin",
  "senha": "sua_senha_aqui"
}
Response: {
  "success": true,
  "token": "eyJhbGc..."
}
```

**Use o token em requisições admin:**
```
Authorization: Bearer eyJhbGc...
```

### 📧 Contato

#### Enviar Contato (POST) - Público
```
POST /api/contact
Body: {
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(11) 99999-9999",
  "assunto": "voluntariado",
  "mensagem": "Gostaria de fazer parte do projeto..."
}
```

#### Listar Contatos (GET) - Admin
```
GET /api/contacts
Headers: { Authorization: Bearer TOKEN }
```

#### Deletar Contato (DELETE) - Admin
```
DELETE /api/contacts/:id
Headers: { Authorization: Bearer TOKEN }
```

### 💳 Doações

#### Fazer Doação (POST) - Público
```
POST /api/donation
Body: {
  "nomeDoador": "Maria Santos",
  "emailDoador": "maria@email.com",
  "telefoneDoador": "(11) 98888-8888",
  "valor": 50,
  "metodo": "pix"
}
Response: {
  "success": true,
  "donation": {
    "comprovante": "PIX...",
    "status": "confirmado",
    ...
  }
}
```

#### Estatísticas de Doações (GET) - Público
```
GET /api/donations/stats
```

#### Listar Doações (GET) - Admin
```
GET /api/donations
Headers: { Authorization: Bearer TOKEN }
```

### 🤝 Voluntários

#### Registrar Voluntário (POST) - Público
```
POST /api/volunteer
Body: {
  "nome": "Carlos Oliveira",
  "email": "carlos@email.com",
  "telefone": "(11) 97777-7777",
  "areaInteresse": ["eventos", "educacao"],
  "disponibilidade": "fim_de_semana",
  "experiencia": "10 anos em projetos sociais"
}
```

#### Listar Voluntários (GET) - Admin
```
GET /api/volunteers
Headers: { Authorization: Bearer TOKEN }
```

#### Atualizar Voluntário (PUT) - Admin
```
PUT /api/volunteers/:id
Body: {
  "status": "ativo",
  "ultimoContato": "2024-05-08T10:00:00Z"
}
```

### 📝 Blog

#### Listar Posts (GET) - Público
```
GET /api/posts?categoria=noticia&pagina=1&limite=10
```

#### Obter Post Específico (GET) - Público
```
GET /api/posts/:id
```

#### Criar Post (POST) - Admin
```
POST /api/posts
Headers: { Authorization: Bearer TOKEN }
Body: {
  "titulo": "Novo Projeto de Educação",
  "conteudo": "Conteúdo do post aqui...",
  "resumo": "Resumo breve",
  "autor": "Gota de Amor",
  "categoria": "noticia",
  "imagem": "url_da_imagem",
  "tags": ["educacao", "crianças"],
  "status": "publicado"
}
```

#### Atualizar Post (PUT) - Admin
```
PUT /api/posts/:id
Headers: { Authorization: Bearer TOKEN }
Body: { ...campos_a_atualizar }
```

### ⚙️ Configurações

#### Obter Todas as Configs (GET) - Público
```
GET /api/config
```

#### Atualizar Config (PUT) - Admin
```
PUT /api/config
Headers: { Authorization: Bearer TOKEN }
Body: {
  "nome": "anos_funcionamento",
  "valor": 23,
  "descricao": "Anos que a ONG funciona"
}
```

## 🧪 Testando com Postman/Insomnia

### 1. Fazer Login
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "usuario": "admin",
  "senha": "admin123456"
}
```

Copiar o `token` retornado.

### 2. Testar Endpoint Admin
```
GET http://localhost:5000/api/contacts
Header: Authorization: Bearer TOKEN_AQUI
```

### 3. Testar Endpoint Público
```
POST http://localhost:5000/api/contact
Body (JSON):
{
  "nome": "Test User",
  "email": "test@test.com",
  "telefone": "11987654321",
  "assunto": "voluntariado",
  "mensagem": "Teste de mensagem"
}
```

## 📚 Estrutura de Pastas

```
Backend/
├── config/           # Configurações (DB, Email)
├── controllers/      # Lógica dos endpoints
├── middleware/       # Middlewares (autenticação)
├── models/          # Schemas Mongoose
├── routes/          # Definição de rotas
├── server.js        # Entrada do servidor
├── package.json     # Dependências
├── .env             # Variáveis de ambiente (NÃO COMMITAR)
└── .env.example     # Template .env
```

## 🛠️ Troubleshooting

### Erro: "querySrv ESERVFAIL"
**Causa:** MongoDB URI está incorreta  
**Solução:** Verificar connection string no MongoDB Atlas

### Erro: "401 - Token inválido"
**Causa:** Token expirou ou está com formato errado  
**Solução:** Fazer login novamente e copiar novo token

### Erro ao enviar email
**Causa:** SMTP não configurado corretamente  
**Solução:** 
- Verificar credenciais do Gmail
- Ativar "Acesso de apps menos seguros" (Gmail)
- Gerar nova "Senha de Aplicativo"

### Porta 5000 já está em uso
**Causa:** Outro processo usando a porta  
**Solução:** 
```bash
# Encontrar processo
lsof -i :5000  # Linux/Mac
netstat -ano | findstr :5000  # Windows

# Matar processo ou usar outra porta
PORT=5001 npm start
```

## 🚀 Deployment (Futuro)

Quando pronto para produção:

1. **Heroku**
   ```bash
   heroku create sua-app
   heroku config:set MONGO_URI=... ADMIN_PASSWORD=...
   git push heroku main
   ```

2. **Railway.app**
   - Conectar GitHub
   - Adicionar variáveis de ambiente
   - Deploy automático

3. **DigitalOcean / AWS**
   - Setup manual de servidor Node.js
   - Usar PM2 para gerenciar processo
   - Configurar Nginx como proxy reverso

## 📞 Suporte

Dúvidas? Verifique:
- Logs do servidor (`npm start`)
- Documentação MongoDB: https://docs.mongodb.com
- Documentação Express: https://expressjs.com

---

**Desenvolvido com ❤️ para Gota de Amor ONG**
