export interface UserMonster {
  id: number;
  nom: string;
  slug: string;
  type: string;
  image_url: string;
  etape: number;
  zone: string;
  souszone: string;
  quantite: number;
  recherche: number;
  propose: number;
  nom_normal?: string;
}

export interface UserMonsterFilters {
  nom?: string;
  etape?: number;
  type?: 'monstre' | 'archimonstre' | 'boss';
  quantite?: string;
  recherche?: number;
  propose?: number;
}
