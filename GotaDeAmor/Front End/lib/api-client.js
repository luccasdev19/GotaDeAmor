// Utilitário para chamar API backend (Frontend JavaScript)
// Use isso nos seus HTML/JS files

const API_URL = 'http://localhost:5000';

/**
 * Fazer requisição à API
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
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    return { success: false, message: 'Erro na requisição' };
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
