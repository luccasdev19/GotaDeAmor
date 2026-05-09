# 🔗 Guia de Integração Frontend + Backend

## Visão Geral

O Frontend (Next.js) comunica com o Backend (Express) via HTTP requests. Todos os dados são salvos no MongoDB e processados no backend.

---

## 🚀 Quick Start

### 1. Iniciar Backend
```bash
cd Backend
npm start
# Servidor roda em http://localhost:5000
```

### 2. Iniciar Frontend
```bash
cd Front\ End
npm run dev
# Frontend roda em http://localhost:3000
```

### 3. Teste Manual
Abra o browser e teste:
- Frontend: http://localhost:3000
- Backend Health: http://localhost:5000/api/health

---

## 📝 Exemplos de Integração

### Exemplo 1: Enviar Contato (JavaScript Vanilla)

**HTML (Front End/html/contato.html):**
```html
<form id="contatoForm">
  <input type="text" id="nome" placeholder="Nome" required>
  <input type="email" id="email" placeholder="Email" required>
  <input type="tel" id="telefone" placeholder="Telefone" required>
  <select id="assunto" required>
    <option value="voluntariado">Voluntariado</option>
    <option value="estagio">Estágio</option>
    <option value="doacoes">Doações</option>
    <option value="parceria">Parceria</option>
    <option value="imprensa">Imprensa</option>
    <option value="outro">Outro</option>
  </select>
  <textarea id="mensagem" placeholder="Mensagem" required></textarea>
  <button type="submit">Enviar</button>
</form>

<!-- Importar utilitário de API -->
<script src="../lib/api-client.js"></script>
<script>
  document.getElementById('contatoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const resultado = await enviarContato(
      document.getElementById('nome').value,
      document.getElementById('email').value,
      document.getElementById('telefone').value,
      document.getElementById('assunto').value,
      document.getElementById('mensagem').value
    );
    
    if (resultado.success) {
      alert('Mensagem enviada com sucesso!');
      document.getElementById('contatoForm').reset();
    } else {
      alert('Erro: ' + resultado.message);
    }
  });
</script>
```

### Exemplo 2: Fazer Doação

**HTML:**
```html
<form id="doacaoForm">
  <input type="number" id="valor" placeholder="Valor (R$)" min="1" max="1000000" required>
  <input type="text" id="nomeDoador" placeholder="Seu Nome (opcional)">
  <input type="email" id="emailDoador" placeholder="Seu Email (para recibo)">
  <button type="submit">Fazer Doação</button>
</form>

<div id="comprovantePix" style="display:none;">
  <h3>Comprovante Pix</h3>
  <p><strong>Chave:</strong> <span id="chavePix"></span></p>
  <p><strong>Comprovante:</strong> <span id="idComprovante"></span></p>
</div>

<script src="../lib/api-client.js"></script>
<script>
  document.getElementById('doacaoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const resultado = await enviarDoacao(
      parseFloat(document.getElementById('valor').value),
      document.getElementById('nomeDoador').value || 'Doador Anônimo',
      document.getElementById('emailDoador').value,
      ''
    );
    
    if (resultado.success) {
      document.getElementById('chavePix').textContent = '00.000.000/0001-00';
      document.getElementById('idComprovante').textContent = resultado.donation.comprovante;
      document.getElementById('comprovantePix').style.display = 'block';
      alert('Doação registrada! Um comprovante foi enviado para seu email.');
    } else {
      alert('Erro: ' + resultado.message);
    }
  });
</script>
```

### Exemplo 3: Listar Posts (Blog)

**HTML:**
```html
<div id="postsList"></div>

<script src="../lib/api-client.js"></script>
<script>
  async function carregarPosts() {
    const resultado = await obterPosts(null, 1, 5);
    
    if (resultado.success) {
      const html = resultado.posts.map(post => `
        <div class="post">
          <h3>${post.titulo}</h3>
          <p>${post.resumo || post.conteudo.substring(0, 100)}...</p>
          <small>Por ${post.autor} em ${new Date(post.dataPublicacao).toLocaleDateString('pt-BR')}</small>
        </div>
      `).join('');
      
      document.getElementById('postsList').innerHTML = html;
    }
  }
  
  carregarPosts();
</script>
```

### Exemplo 4: Registrar Voluntário

**HTML:**
```html
<form id="voluntarioForm">
  <input type="text" id="nomeVol" placeholder="Nome" required>
  <input type="email" id="emailVol" placeholder="Email" required>
  <input type="tel" id="telefoneVol" placeholder="Telefone" required>
  
  <label>Áreas de Interesse:</label>
  <div>
    <label><input type="checkbox" name="area" value="eventos"> Eventos</label>
    <label><input type="checkbox" name="area" value="atendimento_social"> Atendimento Social</label>
    <label><input type="checkbox" name="area" value="educacao"> Educação</label>
    <label><input type="checkbox" name="area" value="saude"> Saúde</label>
  </div>
  
  <select id="disponibilidadeVol" required>
    <option value="fim_de_semana">Fim de Semana</option>
    <option value="entre_semana">Entre Semana</option>
    <option value="flexível">Flexível</option>
  </select>
  
  <textarea id="experienciaVol" placeholder="Experiência (opcional)"></textarea>
  <button type="submit">Registrar como Voluntário</button>
</form>

<script src="../lib/api-client.js"></script>
<script>
  document.getElementById('voluntarioForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const areas = Array.from(document.querySelectorAll('input[name="area"]:checked'))
      .map(x => x.value);
    
    const resultado = await registrarVoluntario(
      document.getElementById('nomeVol').value,
      document.getElementById('emailVol').value,
      document.getElementById('telefoneVol').value,
      areas,
      document.getElementById('disponibilidadeVol').value,
      document.getElementById('experienciaVol').value
    );
    
    if (resultado.success) {
      alert('Obrigado! Você foi registrado como voluntário!');
      document.getElementById('voluntarioForm').reset();
    } else {
      alert('Erro: ' + resultado.message);
    }
  });
</script>
```

---

## 🔐 Exemplo 5: Login e Admin Panel

**HTML (admin.html):**
```html
<form id="loginForm">
  <input type="text" id="usuario" placeholder="Usuário" required>
  <input type="password" id="senha" placeholder="Senha" required>
  <button type="submit">Login</button>
</form>

<div id="adminPanel" style="display:none;">
  <h2>Painel Admin</h2>
  <button onclick="carregarContatos()">Ver Contatos</button>
  <button onclick="carregarDoações()">Ver Doações</button>
  <button onclick="carregarVoluntarios()">Ver Voluntários</button>
  <div id="listaAdmin"></div>
</div>

<script src="../lib/api-client.js"></script>
<script>
  let token = null;
  
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const resultado = await fetch_api('/auth/login', 'POST', {
      usuario: document.getElementById('usuario').value,
      senha: document.getElementById('senha').value
    });
    
    if (resultado.success) {
      token = resultado.token;
      localStorage.setItem('adminToken', token);
      document.getElementById('loginForm').style.display = 'none';
      document.getElementById('adminPanel').style.display = 'block';
      alert('Login realizado!');
    } else {
      alert('Erro: ' + resultado.message);
    }
  });
  
  async function carregarContatos() {
    const resultado = await fetch_api('/contacts', 'GET', null, token);
    if (resultado.success) {
      const html = resultado.contacts.map(c => `
        <div class="contato">
          <p><strong>${c.nome}</strong> - ${c.email}</p>
          <p>${c.mensagem.substring(0, 50)}...</p>
          <button onclick="deletarContato('${c._id}')">Deletar</button>
        </div>
      `).join('');
      document.getElementById('listaAdmin').innerHTML = html;
    }
  }
  
  async function deletarContato(id) {
    const resultado = await fetch_api(`/contacts/${id}`, 'DELETE', null, token);
    if (resultado.success) {
      alert('Contato deletado!');
      carregarContatos();
    }
  }
</script>
```

---

## 📡 Usando TypeScript (Next.js)

**Exemplo com lib/api.ts:**
```typescript
// pages/contato.tsx
import { criarContato } from '@/lib/api';
import { useState } from 'react';

export default function Contato() {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const resultado = await criarContato({
      nome: formData.get('nome') as string,
      email: formData.get('email') as string,
      telefone: formData.get('telefone') as string,
      assunto: formData.get('assunto') as string,
      mensagem: formData.get('mensagem') as string,
    });
    
    setLoading(false);
    
    if (resultado.success) {
      alert('Mensagem enviada com sucesso!');
    } else {
      alert('Erro: ' + resultado.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="nome" placeholder="Nome" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="tel" name="telefone" placeholder="Telefone" required />
      <select name="assunto" required>
        <option value="voluntariado">Voluntariado</option>
        <option value="estagio">Estágio</option>
        <option value="doacoes">Doações</option>
      </select>
      <textarea name="mensagem" placeholder="Mensagem" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
```

---

## ⚙️ Variáveis de Ambiente

**Backend (.env):**
```env
MONGO_URI=mongodb+srv://...
ADMIN_USER=admin
ADMIN_PASSWORD=sua_senha
JWT_SECRET=sua_chave_secreta
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_app_password
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🧪 Testando com Postman

1. **Fazer Login:**
   ```
   POST http://localhost:5000/api/auth/login
   Body: { "usuario": "admin", "senha": "admin123456" }
   ```

2. **Copiar token do response**

3. **Fazer request admin:**
   ```
   GET http://localhost:5000/api/contacts
   Header: Authorization: Bearer TOKEN_AQUI
   ```

---

## 🐛 Troubleshooting

### CORS Error
**Erro:** "Access to XMLHttpRequest at 'http://localhost:5000' has been blocked by CORS policy"  
**Solução:** O backend já tem CORS ativado, mas se houver problema:
```javascript
// Backend server.js já tem:
app.use(cors());
```

### Token Inválido
**Erro:** "401 Token inválido ou expirado"  
**Solução:** Fazer login novamente e copiar novo token

### API Retorna 404
**Erro:** "Rota não encontrada"  
**Solução:** Verificar URL do endpoint e se o backend está rodando

---

**Pronto para integrar! 🎉**
