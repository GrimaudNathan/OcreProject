import type { UserMonster, UserMonsterFilters } from '../types/monster';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.metamob.fr';
const USER_KEY = import.meta.env.VITE_USER_KEY;
const USER_PSEUDO = import.meta.env.VITE_USER_PSEUDO;
const API_KEY = import.meta.env.VITE_API_KEY;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export class MetaMobApiService {
  private async request<T>(method: HttpMethod, endpoint: string, data?: any): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'HTTP-X-APIKEY': API_KEY,
      'User-Agent': 'Mozilla/5.0 (compatible; MetaMob-Client)',
    };

    if (method === 'PUT') {
      headers['HTTP-X-USERKEY'] = USER_KEY;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getUserMonsters(filters?: UserMonsterFilters): Promise<UserMonster[]> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    
    return this.request<UserMonster[]>('GET', `/utilisateurs/${USER_PSEUDO}/monstres${queryString ? `?${queryString}` : ''}`);
  }

  async updateUserMonsterQuantity(monsterId: number, quantityChange: string): Promise<any> {
    return this.request<any>('PUT', `/utilisateurs/${USER_PSEUDO}/monstres`, [{
      id: monsterId,
      quantite: quantityChange
    }]);
  }
}

export const metamobApiService = new MetaMobApiService();
