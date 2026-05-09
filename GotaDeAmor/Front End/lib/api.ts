// Arquivo: Front End/lib/api.ts
// Utilitário para fazer requisições à API backend

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Fazer requisição GET à API
 */
export const apiGet = async (endpoint: string, token?: string) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/api${endpoint}`, {
    method: 'GET',
    headers,
  });

  return await response.json();
};

/**
 * Fazer requisição POST à API
 */
export const apiPost = async (endpoint: string, data: any, token?: string) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/api${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  return await response.json();
};

/**
 * Fazer requisição PUT à API
 */
export const apiPut = async (endpoint: string, data: any, token?: string) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/api${endpoint}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });

  return await response.json();
};

/**
 * Fazer requisição DELETE à API
 */
export const apiDelete = async (endpoint: string, token?: string) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/api${endpoint}`, {
    method: 'DELETE',
    headers,
  });

  return await response.json();
};

/**
 * Fazer login e obter token
 */
export const login = async (usuario: string, senha: string) => {
  return await apiPost('/auth/login', { usuario, senha });
};

/**
 * ====== CONTATOS ======
 */
export const criarContato = async (dados: {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
}) => {
  return await apiPost('/contact', dados);
};

export const listarContatos = async (token: string) => {
  return await apiGet('/contacts', token);
};

export const deletarContato = async (id: string, token: string) => {
  return await apiDelete(`/contacts/${id}`, token);
};

/**
 * ====== DOAÇÕES ======
 */
export const criarDoacao = async (dados: {
  nomeDoador?: string;
  emailDoador?: string;
  telefoneDoador?: string;
  valor: number;
  metodo?: string;
}) => {
  return await apiPost('/donation', dados);
};

export const obterEstatisticaDoações = async () => {
  return await apiGet('/donations/stats');
};

export const listarDoações = async (token: string) => {
  return await apiGet('/donations', token);
};

export const deletarDoacao = async (id: string, token: string) => {
  return await apiDelete(`/donations/${id}`, token);
};

/**
 * ====== VOLUNTÁRIOS ======
 */
export const registrarVoluntario = async (dados: {
  nome: string;
  email: string;
  telefone: string;
  areaInteresse: string | string[];
  disponibilidade: string;
  experiencia?: string;
}) => {
  return await apiPost('/volunteer', dados);
};

export const listarVoluntarios = async (token: string) => {
  return await apiGet('/volunteers', token);
};

export const atualizarVoluntario = async (
  id: string,
  dados: any,
  token: string
) => {
  return await apiPut(`/volunteers/${id}`, dados, token);
};

export const deletarVoluntario = async (id: string, token: string) => {
  return await apiDelete(`/volunteers/${id}`, token);
};

/**
 * ====== BLOG ======
 */
export const listarPosts = async (categoria?: string, pagina = 1, limite = 10) => {
  const params = new URLSearchParams();
  if (categoria) params.append('categoria', categoria);
  params.append('pagina', String(pagina));
  params.append('limite', String(limite));
  return await apiGet(`/posts?${params.toString()}`);
};

export const obterPost = async (id: string) => {
  return await apiGet(`/posts/${id}`);
};

export const criarPost = async (dados: any, token: string) => {
  return await apiPost('/posts', dados, token);
};

export const atualizarPost = async (id: string, dados: any, token: string) => {
  return await apiPut(`/posts/${id}`, dados, token);
};

export const deletarPost = async (id: string, token: string) => {
  return await apiDelete(`/posts/${id}`, token);
};

/**
 * ====== CONFIGURAÇÕES ======
 */
export const obterConfigurações = async () => {
  return await apiGet('/config');
};

export const obterConfiguracao = async (nome: string) => {
  return await apiGet(`/config/${nome}`);
};

export const atualizarConfiguracao = async (
  nome: string,
  valor: any,
  token: string
) => {
  return await apiPut('/config', { nome, valor }, token);
};
