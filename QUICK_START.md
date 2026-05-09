# 🚀 Quick Reference - Gota de Amor Backend

## 📍 Localização
```
c:\GotaDeAmor\GotaDeAmor\Backend\
```

## ⚡ Comando Rápido
```bash
cd Backend
npm install  # já foi feito
npm start    # Inicia servidor em http://localhost:5000
```

## 🔐 Credenciais Padrão
```
Usuário: admin
Senha:   admin123456
```

## 📝 Arquivo de Testes
```
http://localhost:5000/test.html
```

## 📋 Arquivo de Configuração
```
Backend/.env          # Copiar valores aqui
Backend/.env.example  # Template
```

---

## ⚙️ Variáveis de Ambiente

### MongoDB
```env
MONGO_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/gota-de-amor?retryWrites=true&w=majority
```

### Email
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=senha_app_de_16_digitos
EMAIL_FROM=seu_email@gmail.com
```

### Admin
```env
ADMIN_USER=admin
ADMIN_PASSWORD=sua_senha_aqui
JWT_SECRET=chave_secreta_aqui
JWT_EXPIRE=7d
```

---

## 📡 Endpoints Principais

### Login
```
POST /api/auth/login
{ "usuario": "admin", "senha": "admin123456" }
```

### Contato (Público)
```
POST /api/contact
{
  "nome": "João",
  "email": "joao@email.com",
  "telefone": "11987654321",
  "assunto": "voluntariado",
  "mensagem": "Mensagem aqui"
}
```

### Doação (Público)
```
POST /api/donation
{
  "valor": 50,
  "nomeDoador": "Maria",
  "emailDoador": "maria@email.com"
}
```

### Voluntário (Público)
```
POST /api/volunteer
{
  "nome": "Carlos",
  "email": "carlos@email.com",
  "telefone": "11988888888",
  "areaInteresse": "eventos",
  "disponibilidade": "fim_de_semana"
}
```

### Posts (Público)
```
GET /api/posts?pagina=1&limite=10
```

### Contatos (Admin)
```
GET /api/contacts
Header: Authorization: Bearer TOKEN
```

---

## 🧪 Testar com JavaScript

```javascript
// Função para chamar API
async function api(endpoint, method = 'GET', data = null) {
  const headers = { 'Content-Type': 'application/json' };
  const config = { method, headers };
  if (data) config.body = JSON.stringify(data);
  const r = await fetch(`http://localhost:5000/api${endpoint}`, config);
  return r.json();
}

// Exemplo: Enviar contato
const resultado = await api('/contact', 'POST', {
  nome: 'Test',
  email: 'test@test.com',
  telefone: '11987654321',
  assunto: 'voluntariado',
  mensagem: 'Teste de mensagem'
});
console.log(resultado);
```

---

## 🌐 Frontend Integration

```javascript
// Importar no HTML
<script src="../lib/api-client.js"></script>

// Usar funções
await enviarContato(nome, email, tel, assunto, msg);
await enviarDoacao(valor, nome, email);
await registrarVoluntario(nome, email, tel, area, disp);
```

---

## 🛠️ Troubleshooting

| Erro | Solução |
|---|---|
| Port 5000 in use | `PORT=5001 npm start` |
| MongoDB error | Verificar MONGO_URI no .env |
| Email error | Verificar 2FA Gmail ativado |
| 401 Token error | Fazer login novamente |
| CORS error | Backend já tem CORS habilitado |

---

## 📚 Documentação

| Arquivo | Descrição |
|---|---|
| Backend/README.md | Setup e troubleshooting |
| SETUP_FINAL.md | Guia passo-a-passo |
| INTEGRACAO_FRONTEND_BACKEND.md | Exemplos de uso |
| ARQUITETURA.md | Diagramas técnicos |
| INDEX.md | Visão geral |

---

## 🔄 Status

✅ Backend: **100% Pronto**
✅ Documentação: **Completa**
✅ Testes: **Interface HTML pronta**
⏳ Frontend: Aguardando integração do usuário

---

## 💾 Arquivos Importantes

```
Backend/
├── server.js           ← Iniciar daqui
├── .env                ← Configurar aqui
├── test.html           ← Testar aqui
├── README.md           ← Ler aqui
└── models/             ← Schemas
└── controllers/        ← Lógica
└── routes/             ← Endpoints
```

---

## 📊 APIs Estrutura

```
📧 Contatos      → 4 endpoints
💳 Doações       → 4 endpoints
🤝 Voluntários   → 5 endpoints
📝 Blog          → 6 endpoints
⚙️  Configurações → 5 endpoints
🔐 Autenticação  → 1 endpoint

Total: 25 endpoints
```

---

## ⏱️ Setup Time

- MongoDB: 5 min
- Email: 5 min
- Backend: 1 min (npm start)
- Testes: 5 min (test.html)
- Frontend: 15 min (integração)

**Total: ~30 minutos**

---

## 🎯 Checklist

```
□ npm start sem erros
□ test.html abrindo
□ Login funcionando
□ Contato enviado
□ Email recebido
□ Dados em MongoDB
□ Admin consegue ver dados
```

---

**Tá tudo pronto! Bora lá! 🚀**
