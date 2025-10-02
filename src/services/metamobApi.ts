import type { UserMonster, UserMonsterFilters } from '../types/monster';

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

  async updateUserMonsterQuantity(monsterId: number, quantityChange: string, currentQuantity: number): Promise<any> {
    let newQuantity: number;
    if (quantityChange.startsWith('+')) {
      newQuantity = currentQuantity + parseInt(quantityChange.substring(1));
    } else if (quantityChange.startsWith('-')) {
      newQuantity = Math.max(0, currentQuantity - parseInt(quantityChange.substring(1)));
    } else {
      newQuantity = parseInt(quantityChange);
    }

    let etat: string;
    if (newQuantity < 1) {
      etat = 'recherche';
    } else if (newQuantity === 1) {
      etat = 'aucun';
    } else {
      etat = 'propose';
    }

    const updateData = [{
      id: monsterId,
      etat: etat,
      quantite: newQuantity
    }];

    return this.request<any>('PUT', `/utilisateurs/${USER_PSEUDO}/monstres`, updateData);
  }
}

export const metamobApiService = new MetaMobApiService();
