# 🎯 Checklist de Configuração Final

## ✅ Pré-Requisitos Instalados
- [x] Node.js (v14+)
- [x] npm (v6+)
- [x] MongoDB Atlas (conta)
- [x] Gmail (para emails)

---

## 📋 Fase 1: Configurar MongoDB Atlas (⏱️ 5-10 min)

### 1.1 Criar Conta
- [ ] Ir para https://www.mongodb.com/cloud/atlas
- [ ] Clicar "Sign Up"
- [ ] Criar conta (email + senha)

### 1.2 Criar Cluster
- [ ] Clicar "Build a Cluster"
- [ ] Selecionar "M0 Sandbox" (gratuito)
- [ ] Escolher região: "São Paulo" (sa-east-1)
- [ ] Clicar "Create Cluster"
- [ ] Aguardar criação (2-3 min)

### 1.3 Configurar Acesso
- [ ] Na esquerda, clicar "Database Access"
- [ ] Clicar "Add New Database User"
- [ ] Username: `gota_admin`
- [ ] Password: gerar automático (copiar)
- [ ] Role: "Atlas admin"
- [ ] Clicar "Add User"

### 1.4 Configurar IP Whitelist
- [ ] Na esquerda, clicar "Network Access"
- [ ] Clicar "Add IP Address"
- [ ] Selecionar "Allow Access from Anywhere" (para dev)
- [ ] Clicar "Confirm"

### 1.5 Obter Connection String
- [ ] Ir para "Databases"
- [ ] Clicar no cluster
- [ ] Clicar "Connect"
- [ ] Selecionar "Drivers"
- [ ] Copiar connection string:
  ```
  mongodb+srv://gota_admin:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```

### 1.6 Atualizar .env Backend
- [ ] Abrir `Backend/.env`
- [ ] Substituir `MONGO_URI=...` pela string obtida
- [ ] Substituir `PASSWORD` pela senha do usuário
- [ ] Substituir `/gota-de-amor` no final da URL:
  ```
  MONGO_URI=mongodb+srv://gota_admin:SUA_SENHA@cluster0.xxxxx.mongodb.net/gota-de-amor?retryWrites=true&w=majority
  ```
- [ ] Salvar arquivo

---

## 📧 Fase 2: Configurar Email (⏱️ 5-10 min)

### 2.1 Ativar 2-Factor no Gmail
- [ ] Ir para https://myaccount.google.com/security
- [ ] Clicar "Verificação em 2 etapas"
- [ ] Seguir instruções (confirmar com celular)

### 2.2 Gerar Senha de Aplicativo
- [ ] Voltar para Security
- [ ] Clicar "App passwords" (só aparece após 2FA)
- [ ] Selecionar "Mail" e "Windows"
- [ ] Clicar "Generate"
- [ ] Copiar senha gerada (16 caracteres)

### 2.3 Atualizar .env Backend
- [ ] Abrir `Backend/.env`
- [ ] Atualizar:
  ```
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_USER=seu_email@gmail.com
  SMTP_PASS=senha_app_de_16_caracteres
  EMAIL_FROM=seu_email@gmail.com
  ```
- [ ] Salvar arquivo

---

## 🔐 Fase 3: Configurar Autenticação (⏱️ 2 min)

### 3.1 Gerar Chaves Secretas
- [ ] Abrir `Backend/.env`
- [ ] Manter ou atualizar (opcional):
  ```
  ADMIN_USER=admin
  ADMIN_PASSWORD=sua_senha_super_segura
  JWT_SECRET=chave_jwt_super_secreta_aqui
  ```

### 3.2 Salvar Arquivo
- [ ] Confirmar `.env` está salvo
- [ ] ⚠️ NÃO commitar `.env` no git

---

## 🚀 Fase 4: Testar Backend (⏱️ 5-10 min)

### 4.1 Iniciar Servidor
```bash
cd Backend
npm start
```

Você verá:
```
🚀 Servidor Backend rodando em http://localhost:5000
📡 Ambiente: development
✓ MongoDB conectado: cluster0.xxxxx.mongodb.net
✅ ENDPOINTS DISPONÍVEIS:
...
```

- [ ] Servidor rodou sem erros ✅

### 4.2 Testar Health Check
- [ ] Abrir browser: http://localhost:5000/api/health
- [ ] Deve retornar: `{ "status": "OK", "timestamp": "..." }` ✅

### 4.3 Testar Login
- [ ] Abrir Postman ou Insomnia
- [ ] POST: `http://localhost:5000/api/auth/login`
- [ ] Body (JSON):
  ```json
  {
    "usuario": "admin",
    "senha": "admin123456"
  }
  ```
- [ ] Deve retornar token JWT ✅

### 4.4 Testar Contato (Público)
- [ ] POST: `http://localhost:5000/api/contact`
- [ ] Body (JSON):
  ```json
  {
    "nome": "Teste",
    "email": "seu_email@test.com",
    "telefone": "11999999999",
    "assunto": "voluntariado",
    "mensagem": "Teste de mensagem com mais de 10 caracteres"
  }
  ```
- [ ] Deve retornar sucesso ✅
- [ ] Verificar emails recebidos (seu email Gmail) ✅

### 4.5 Testar Contato (Admin)
- [ ] GET: `http://localhost:5000/api/contacts`
- [ ] Header: `Authorization: Bearer TOKEN_AQUI`
- [ ] Deve retornar lista de contatos ✅

---

## 🧪 Fase 5: Testar Endpoints Completos (⏱️ 10-15 min)

Usar o arquivo `INTEGRACAO_FRONTEND_BACKEND.md` como referência.

### Testes Recomendados:
- [ ] POST /api/contact - Enviar contato
- [ ] GET /api/contacts - Listar contatos (admin)
- [ ] POST /api/donation - Fazer doação
- [ ] GET /api/donations/stats - Ver estatísticas
- [ ] POST /api/volunteer - Registrar voluntário
- [ ] GET /api/volunteers - Listar voluntários (admin)
- [ ] GET /api/posts - Listar posts
- [ ] POST /api/posts - Criar post (admin)
- [ ] GET /api/config - Obter configurações

---

## 💻 Fase 6: Integrar Frontend (⏱️ 15-20 min)

### 6.1 Verificar .env Frontend
- [ ] Abrir `Front End/.env.local`
- [ ] Confirmar:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:5000
  ```
- [ ] Salvar ✅

### 6.2 Usar Utilitário de API (JavaScript)
- [ ] Abrir arquivo HTML (ex: `html/contato.html`)
- [ ] Adicionar no final antes de `</body>`:
  ```html
  <script src="../lib/api-client.js"></script>
  ```

### 6.3 Atualizar Formulário
- [ ] Exemplo em `INTEGRACAO_FRONTEND_BACKEND.md`
- [ ] Copiar código JavaScript
- [ ] Adaptar para seus formulários

### 6.4 Testar Integração
- [ ] Abrir frontend: http://localhost:3000 (ou seu servidor)
- [ ] Preencher formulário de contato
- [ ] Enviar
- [ ] Verificar se dados chegam no backend
- [ ] ✅ Sucesso!

---

## 🎯 Fase 7: Validação Final (⏱️ 5 min)

- [ ] Backend rodando em http://localhost:5000
- [ ] MongoDB conectado ✅
- [ ] Emails sendo enviados ✅
- [ ] Token JWT funcionando ✅
- [ ] Frontend consegue enviar dados ✅
- [ ] Dados salvos em MongoDB ✅

---

## 📚 Arquivos de Referência

Consulte quando tiver dúvidas:
- **Backend Setup:** `Backend/README.md`
- **Integração Frontend:** `INTEGRACAO_FRONTEND_BACKEND.md`
- **Resumo Completo:** `RESUMO_IMPLEMENTACAO.md`
- **Exemplos JavaScript:** `Front End/lib/api-client.js`

---

## 🚨 Troubleshooting Rápido

| Problema | Solução |
|---|---|
| "querySrv ESERVFAIL" | Connection string incorreta no MongoDB Atlas |
| "401 Token inválido" | Fazer login novamente e copiar novo token |
| "SMTP Error" | Verificar senha de aplicativo do Gmail e 2FA ativado |
| "Porta 5000 em uso" | `PORT=5001 npm start` ou fechar outro processo |
| "CORS Error" | Backend já tem CORS, verificar se está rodando |

---

## ✨ Próximas Sugestões

Após tudo funcionando:

1. **Criar Painel Admin**
   - Login interface
   - Dashboard com estatísticas
   - CRUD de posts/doações/voluntários

2. **Melhorar Frontend**
   - Integrar com React/Next.js properly
   - Componentes reutilizáveis

3. **Deploy**
   - Heroku, Railway ou DigitalOcean
   - Configurar variáveis de produção
   - Domínio próprio

4. **Recursos Avançados**
   - Upload de imagens
   - Relatórios e PDFs
   - Sistema de notificações
   - Integração com Pix real

---

## 📞 Checklist Rápido

```
□ MongoDB Atlas configurado
□ Email Gmail configurado
□ Backend rodando (npm start)
□ Endpoints testados (Postman)
□ Frontend enviando dados
□ Dados salvos no BD
□ Emails sendo recebidos
□ Documentação lida
```

---

**🎉 Você está pronto para ir para produção!**

Qualquer dúvida, revise os READMEs e exemplos de código. Sucesso! 💪
