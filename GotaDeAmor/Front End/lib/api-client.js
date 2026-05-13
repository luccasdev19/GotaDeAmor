// Utilitário para chamar API backend (Frontend JavaScript)
// Use isso nos seus HTML/JS files

const API_URL = typeof window !== 'undefined' && window.__API_URL__ 
  ? window.__API_URL__ 
  : 'http://localhost:5000';

/**
 * Fazer requisição à API com tratamento de erros
 */
async function fetch_api(endpoint, method = 'GET', data = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_URL}/api${endpoint}`, config);
    
    // Verificar se resposta é JSON
    const contentType = response.headers.get('content-type');
    let result;
    
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      result = { success: false, message: 'Resposta inválida do servidor' };
    }

    // Se não for sucesso, adicionar status code
    if (!response.ok) {
      result.status = response.status;
    }

    return result;
  } catch (error) {
    console.error('Erro na requisição:', error);
    return { 
      success: false, 
      message: 'Erro na requisição: ' + error.message 
    };
  }
}

/**
 * ====== CONTATOS ======
 */
async function enviarContato(nome, email, telefone, assunto, mensagem) {
  return await fetch_api('/contact', 'POST', {
    nome,
    email,
    telefone,
    assunto,
    mensagem,
  });
}

/**
 * ====== DOAÇÕES ======
 */
async function enviarDoacao(valor, nomeDoador = null, emailDoador = null, telefoneDoador = null) {
  return await fetch_api('/donation', 'POST', {
    valor,
    nomeDoador,
    emailDoador,
    telefoneDoador,
    metodo: 'pix',
  });
}

async function obterEstatisticasDoacao() {
  return await fetch_api('/donations/stats', 'GET');
}

/**
 * ====== VOLUNTÁRIOS ======
 */
async function registrarVoluntario(nome, email, telefone, areaInteresse, disponibilidade, experiencia = null) {
  return await fetch_api('/volunteer', 'POST', {
    nome,
    email,
    telefone,
    areaInteresse,
    disponibilidade,
    experiencia,
  });
}

/**
 * ====== POSTS ======
 */
async function obterPosts(pagina = 1, limite = 10) {
  return await fetch_api(`/posts?pagina=${pagina}&limite=${limite}`, 'GET');
}

async function obterPostsPorCategoria(categoria, pagina = 1, limite = 10) {
  return await fetch_api(`/posts/categoria/${categoria}?pagina=${pagina}&limite=${limite}`, 'GET');
}

async function buscarPosts(termo, pagina = 1, limite = 10) {
  return await fetch_api(`/posts/search?q=${encodeURIComponent(termo)}&pagina=${pagina}&limite=${limite}`, 'GET');
}

async function obterPost(id) {
  return await fetch_api(`/posts/${id}`, 'GET');
}

/**
 * ====== ADMIN (Requer token JWT) ======
 */
async function loginAdmin(usuario, senha) {
  return await fetch_api('/auth/login', 'POST', { usuario, senha });
}

/**
 * Armazenar token JWT no localStorage
 */
function salvarToken(token) {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('admin_token', token);
  }
}

/**
 * Obter token JWT do localStorage
 */
function obterToken() {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('admin_token');
  }
  return null;
}

/**
 * Remover token JWT
 */
function limparToken() {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('admin_token');
  }
}
}

async function obterEstatisticaDoações() {
  return await fetch_api('/donations/stats', 'GET');
}

/**
 * ====== VOLUNTÁRIOS ======
 */
async function registrarVoluntario(nome, email, telefone, areaInteresse, disponibilidade, experiencia = '') {
  return await fetch_api('/volunteer', 'POST', {
    nome,
    email,
    telefone,
    areaInteresse,
    disponibilidade,
    experiencia,
  });
}

/**
 * ====== BLOG ======
 */
async function obterPosts(categoria = null, pagina = 1, limite = 10) {
  let endpoint = `/posts?pagina=${pagina}&limite=${limite}`;
  if (categoria) {
    endpoint += `&categoria=${categoria}`;
  }
  return await fetch_api(endpoint, 'GET');
}

async function obterPost(id) {
  return await fetch_api(`/posts/${id}`, 'GET');
}

/**
 * ====== CONFIGURAÇÕES ======
 */
async function obterConfiguracoes() {
  return await fetch_api('/config', 'GET');
}

/**
 * ====== EXEMPLO DE USO ======
 *
 * // Enviar contato
 * const resultado = await enviarContato(
 *   'João Silva',
 *   'joao@email.com',
 *   '(11) 99999-9999',
 *   'voluntariado',
 *   'Gostaria de participar...'
 * );
 *
 * if (resultado.success) {
 *   alert('Mensagem enviada com sucesso!');
 * } else {
 *   alert('Erro: ' + resultado.message);
 * }
 */
