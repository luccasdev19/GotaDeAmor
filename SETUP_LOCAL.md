# 🚀 Setup Local - Gota de Amor

## Backend

### 1. Configurar Variáveis de Ambiente

```bash
cd GotaDeAmor/Backend
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
# MongoDB Atlas
MONGO_URI=mongodb+srv://seu_usuario:sua_senha@seu_cluster.mongodb.net/gota-de-amor?retryWrites=true&w=majority

# Admin
ADMIN_USER=admin
ADMIN_PASSWORD=sua_senha_forte_aqui

# Email (Gmail)
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_app_password  # Gere em: https://myaccount.google.com/apppasswords
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Iniciar Servidor

```bash
npm run dev
```

Você verá:
```
🚀 Servidor Backend rodando em http://localhost:5000
```

---

## Frontend

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

```bash
cd "Front End"
# Criar arquivo .env.local
```

Crie arquivo `Front End/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Iniciar Dev Server

```bash
npm run dev
```

Acesse: http://localhost:3000

---

## 🔒 Segurança

⚠️ **NUNCA commite o arquivo `.env` com credenciais reais!**

- O `.env` está no `.gitignore`
- Use `.env.example` como template
- Cada desenvolvedor deve criar seu próprio `.env` localmente
- Em produção, use variáveis de ambiente do host (Vercel, AWS, etc)

---

## 📡 Testar Endpoints

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Login Admin
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usuario":"admin","senha":"sua_senha_aqui"}'
```

### Criar Contato
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "nome":"João",
    "email":"joao@example.com",
    "telefone":"11999999999",
    "assunto":"voluntariado",
    "mensagem":"Quero ser voluntário"
  }'
```

---

## 🛠️ Troubleshooting

### MongoDB não conecta
- Verificar URL no `.env`
- Confirmar credenciais no MongoDB Atlas
- Verificar IP whitelist

### Email não envia
- Ativar "Verificação em 2 Etapas" no Gmail
- Gerar nova "Senha de Aplicativo"
- Usar apenas em SMTP_PASS

### Frontend não conecta com backend
- Verificar se backend está rodando (http://localhost:5000)
- Verificar CORS está habilitado
- Confirmar NEXT_PUBLIC_API_URL no `.env.local`
