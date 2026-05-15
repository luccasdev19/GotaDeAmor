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
    return this.request('/api/donation/stats', {
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
  async getPosts(filters?: { categoria?: string; busca?: string }) {
    const params = new URLSearchParams();
    if (filters?.categoria) params.append('categoria', filters.categoria);
    if (filters?.busca) params.append('busca', filters.busca);

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
}

export const apiClient = new ApiClient();
export default apiClient;
