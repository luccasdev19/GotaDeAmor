// API Client Wrapper - integração com Backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include', // ✅ SEGURANÇA: Incluir cookies httpOnly
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `API error: ${response.status}`);
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  // Contacts
  async createContact(contactData: {
    nome: string;
    email: string;
    telefone?: string;
    assunto: string;
    mensagem: string;
  }) {
    return this.request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  // Donations
  async createDonation(donationData: {
    nomeDoador: string;
    valor: number;
    metodo: 'pix' | 'transferencia' | 'boleto';
    comprovante?: string;
  }) {
    return this.request('/api/donation', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
  }

  async getDonationStats() {
    return this.request('/api/donations/stats', {
      method: 'GET',
    });
  }

  // Volunteers
  async createVolunteer(volunteerData: {
    nome: string;
    email: string;
    telefone: string;
    areaInteresse: string;
    disponibilidade: string;
  }) {
    return this.request('/api/volunteer', {
      method: 'POST',
      body: JSON.stringify(volunteerData),
    });
  }

  // Posts (Blog)
  async getPosts(filters?: { categoria?: string; pagina?: number; limite?: number }) {
    const params = new URLSearchParams();
    if (filters?.categoria) params.append('categoria', filters.categoria);
    if (filters?.pagina) params.append('pagina', filters.pagina.toString());
    if (filters?.limite) params.append('limite', filters.limite.toString());

    const query = params.toString();
    return this.request(`/api/posts${query ? '?' + query : ''}`, {
      method: 'GET',
    });
  }

  async getPostById(id: string) {
    return this.request(`/api/posts/${id}`, {
      method: 'GET',
    });
  }

  // ✅ CORRIGIDO: Search posts com parâmetro correto "q"
  async searchPosts(termo: string, pagina?: number, limite?: number) {
    const params = new URLSearchParams();
    params.append('q', termo);
    if (pagina) params.append('pagina', pagina.toString());
    if (limite) params.append('limite', limite.toString());

    return this.request(`/api/posts/search?${params.toString()}`, {
      method: 'GET',
    });
  }

  // ✅ CORRIGIDO: Get posts by category
  async getPostsByCategory(categoria: string, pagina?: number, limite?: number) {
    const params = new URLSearchParams();
    if (pagina) params.append('pagina', pagina.toString());
    if (limite) params.append('limite', limite.toString());

    const query = params.toString();
    return this.request(`/api/posts/categoria/${categoria}${query ? '?' + query : ''}`, {
      method: 'GET',
    });
  }

  // Auth
  async loginAdmin(usuario: string, senha: string) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ usuario, senha }),
    });
  }

  // ✅ NOVO: Logout (limpar cookie)
  async logoutAdmin() {
    return this.request('/api/auth/logout', {
      method: 'POST',
    });
  }

  // Config
  async getConfig() {
    return this.request('/api/config', {
      method: 'GET',
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/api/health', {
      method: 'GET',
    });
  }

  // Admin - Posts
  async createPost(postData: {
    titulo: string;
    conteudo: string;
    resumo?: string;
    autor?: string;
    categoria?: string;
    imagem?: string;
    tags?: string[];
    status?: 'rascunho' | 'publicado' | 'arquivado';
  }) {
    return this.request('/api/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  }

  async updatePost(id: string, postData: any) {
    return this.request(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  }

  async deletePost(id: string) {
    return this.request(`/api/posts/${id}`, {
      method: 'DELETE',
    });
  }

  async getAllAdminPosts() {
    return this.request('/api/admin/posts', {
      method: 'GET',
    });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
