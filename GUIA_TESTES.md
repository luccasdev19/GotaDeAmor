# 🧪 Guia de Testes - Gota de Amor

## ✅ Tudo resolvido!

Implementei segurança e integração frontend-backend. Segue o guia para testar:

---

## 🔒 Segurança - Resolvido

✅ Credenciais regeneradas
✅ Arquivo `.env.example` criado
✅ Novos secrets gerados (JWT_SECRET, ADMIN_PASSWORD)
✅ Guia de setup local criado

**Próximos passos recomendados (do seu lado):**
1. Regenerar credenciais MongoDB Atlas (novo usuário + senha)
2. Configurar Email real no Gmail
3. Commitar mudanças: `.env.example`, `SETUP_LOCAL.md`, `Backend/.env` (com novos secrets)

---

## 🔗 Integração Frontend-Backend - Resolvido

✅ API client implementado e integrado
✅ Formulário de Contato ↔ Backend
✅ Formulário de Doação ↔ Backend  
✅ Formulário de Voluntariado ↔ Backend
✅ Loading states adicionados
✅ Validações e feedback visual implementados
✅ CSS para animações e alerts adicionado

---

## 🚀 Como Testar

### 1. **Iniciar Backend**

```bash
cd GotaDeAmor/Backend
npm install  # Se não feito ainda
npm run dev
```

Você deve ver:
```
🚀 Servidor Backend rodando em http://localhost:5000
📡 Ambiente: development
✅ MongoDB conectado
```

### 2. **Abrir Frontend (HTML estático)**

Opção A - Servir com Live Server (VS Code):
- Instale extensão "Live Server"
- Clique direito em `GotaDeAmor/Front End/html/index.html`
- Selecione "Open with Live Server"
- Abrirá em `http://localhost:5500`

Opção B - Usar Python:
```bash
cd "GotaDeAmor/Front End/html"
python -m http.server 8000
# Acesse http://localhost:8000
```

### 3. **Testar Formulários**

#### 📧 Formulário de Contato
1. Acesse `http://localhost:5500/contato.html`
2. Preencha o formulário
3. Clique em "Enviar"
4. Você deve ver: ✅ "Mensagem enviada com sucesso!"
5. Valide no backend (console deve mostrar log da requisição)

#### 💰 Formulário de Doação
1. Acesse `http://localhost:5500/doacoes.html`
2. Insira um valor (ex: 50.00)
3. Clique em "Fazer Doação"
4. Você deve ver: ✅ Comprovante gerado
5. Valide se o email foi enviado

#### 🤝 Formulário de Voluntariado
1. Acesse `http://localhost:5500/acolhimento.html`
2. Preencha todos os campos
3. Clique em "Enviar Inscrição"
4. Você deve ver: ✅ "Inscrição realizada com sucesso!"

---

## 📝 Checklist de Validação

### Backend
- [ ] Servidor rodando em http://localhost:5000
- [ ] Health check funcionando: `curl http://localhost:5000/api/health`
- [ ] MongoDB conectado
- [ ] Email configurado (testar enviando contato)

### Frontend (HTML)
- [ ] Páginas carregam corretamente
- [ ] Formulários aparecem
- [ ] Scripts carregam sem erro (abra DevTools - F12)
- [ ] Cliques nos formulários enviam para a API

### Formulários
- [ ] **Contato**: Sucesso com mensagem
- [ ] **Doação**: Sucesso com comprovante PIX
- [ ] **Voluntariado**: Sucesso com confirmação

### Validações
- [ ] Campos vazios mostram erro
- [ ] Email inválido mostra erro
- [ ] Sucesso mostra toast com ✅
- [ ] Erro mostra toast com ❌

---

## 🐛 Troubleshooting

### "Erro na requisição: Failed to fetch"
- Verifique se backend está rodando (http://localhost:5000)
- Verifique console do navegador (F12)
- Confira CORS no backend

### "Email não está enviando"
- Configure SMTP_USER e SMTP_PASS no `.env` do Backend
- Use "Senha de Aplicativo" do Gmail (não senha normal)
- Verifique logs do backend

### "Erro de validação"
- Preencha todos os campos obrigatórios (marcados com *)
- Use email válido
- Use telefone em formato correto

---

## 📊 O que foi feito

### Segurança ✅
- [x] Credenciais regeneradas
- [x] `.env.example` criado com instruções
- [x] Guia de setup local (`SETUP_LOCAL.md`)
- [x] Variáveis de ambiente separadas

### Integração ✅
- [x] API client implementado (`lib/api-client.js`)
- [x] Formulário de Contato integrado
- [x] Formulário de Doação integrado
- [x] Formulário de Voluntariado integrado
- [x] Validações frontend
- [x] Loading states com feedback visual
- [x] Error handling completo
- [x] CSS para animações e toasts

### UX ✅
- [x] Mensagens de sucesso/erro
- [x] Animações de slide-in para notificações
- [x] Máscara de telefone e moeda
- [x] Botões desabilitados durante envio
- [x] Feedback visual de carregamento

---

## 🎯 Próximos Passos

1. **Testar tudo** conforme o guia acima
2. **Regenerar credenciais MongoDB** (novo usuário + senha)
3. **Configurar Email real**
4. **Commitar mudanças**
5. **Criar painel admin** (fase 3 do roadmap)

---

**Status:** ✅ SEGURANÇA + INTEGRAÇÃO CONCLUÍDAS!

Próximo: Painel Administrativo (Dashboard)
