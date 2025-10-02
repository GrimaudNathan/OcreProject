import type { UserMonster, UserMonsterFilters } from '../types/monster';

// Utiliser les Netlify Functions en production, ou l'API directe en développement
const isProduction = import.meta.env.PROD;
const API_BASE_URL = isProduction ? '/.netlify/functions/metamob-proxy' : '/api';
const USER_KEY = import.meta.env.VITE_USER_KEY;
const USER_PSEUDO = import.meta.env.VITE_USER_PSEUDO;
const API_KEY = import.meta.env.VITE_API_KEY;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export class MetaMobApiService {
  private async request<T>(method: HttpMethod, endpoint: string, data?: any): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    // En développement, ajouter les headers API directement
    if (!isProduction) {
      headers['HTTP-X-APIKEY'] = API_KEY;
      headers['User-Agent'] = 'Mozilla/5.0 (compatible; MetaMob-Client)';
      
      if (method === 'PUT') {
        headers['HTTP-X-USERKEY'] = USER_KEY;
      }
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
