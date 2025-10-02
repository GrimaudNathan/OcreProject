import type { UserMonster, UserMonsterFilters } from '../types/monster';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const USER_KEY = import.meta.env.VITE_USER_KEY;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export class MetaMobApiService {
  private async request<T>(method: HttpMethod, endpoint: string, data?: any): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (method === 'PUT') {
      headers['HTTP-X-USERKEY'] = USER_KEY;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

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
    
    return this.request<UserMonster[]>('GET', `/utilisateurs/Grim-G/monstres${queryString ? `?${queryString}` : ''}`);
  }

  async updateUserMonsterQuantity(monsterId: number, quantityChange: string): Promise<any> {
    return this.request<any>('PUT', '/utilisateurs/Grim-G/monstres', [{
      id: monsterId,
      quantite: quantityChange
    }]);
  }
}

export const metamobApiService = new MetaMobApiService();
