import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { metamobApiService } from '../services/metamobApi';
import type { UserMonster, UserMonsterFilters } from '../types/monster';
import './MonsterList.css';

const MonsterList: React.FC = () => {
  const [userMonsters, setUserMonsters] = useState<UserMonster[]>([]);
  const [filters, setFilters] = useState<UserMonsterFilters>({});
  const [hideOwned, setHideOwned] = useState(false);
  const [showDuplicates, setShowDuplicates] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUserMonsters = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const activeFilters = Object.keys(filters).length > 0 ? filters : undefined;
      const monsters = await metamobApiService.getUserMonsters(activeFilters);
      setUserMonsters(monsters);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateMonsterQuantity = useCallback(async (monsterId: number, change: string, currentQuantity: number) => {
    try {
      await metamobApiService.updateUserMonsterQuantity(monsterId, change, currentQuantity);
      await loadUserMonsters();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la modification de la quantité');
    }
  }, [loadUserMonsters]);

  const filteredMonsters = useMemo(() => {
    let filtered = userMonsters;
    
    if (hideOwned) {
      filtered = filtered.filter(monster => monster.quantite <= 0);
    }
    
    if (showDuplicates) {
      filtered = filtered.filter(monster => monster.quantite >= 2);
    }
    
    return filtered;
  }, [userMonsters, hideOwned, showDuplicates]);

  const handleFilterChange = useCallback((key: keyof UserMonsterFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadUserMonsters();
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, loadUserMonsters]);

  useEffect(() => {
    loadUserMonsters();
  }, []);

  return (
    <div>
      <div className="filters">
        <input 
          value={filters.nom || ''}
          onChange={(e) => handleFilterChange('nom', e.target.value)}
          type="text" 
          placeholder="Rechercher par nom..."
        />
        <select 
          value={filters.type || ''}
          onChange={(e) => handleFilterChange('type', e.target.value || undefined)}
        >
          <option value="">Tous les types</option>
          <option value="monstre">Monstre</option>
          <option value="archimonstre">Archimonstre</option>
          <option value="boss">Boss</option>
        </select>
        <input 
          value={filters.etape || ''}
          onChange={(e) => handleFilterChange('etape', e.target.value ? Number(e.target.value) : undefined)}
          type="number" 
          placeholder="Étape..."
        />
        <label className="checkbox-label">
          <input 
            type="checkbox"
            checked={hideOwned}
            onChange={(e) => setHideOwned(e.target.checked)}
          />
          Masquer les monstres possédés
        </label>
        <label className="checkbox-label">
          <input 
            type="checkbox"
            checked={showDuplicates}
            onChange={(e) => setShowDuplicates(e.target.checked)}
          />
          Afficher les doublons
        </label>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Sous-zone</th>
            <th>Étape</th>
            <th>Quantité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMonsters.map(monster => (
            <tr 
              key={monster.id} 
              className={monster.quantite >= 1 ? 'owned-monster' : ''}
            >
              <td>{monster.nom}</td>
              <td>
                <span className={`type-badge type-${monster.type}`}>
                  {monster.type}
                </span>
              </td>
              <td>{monster.souszone}</td>
              <td>{monster.etape}</td>
              <td>{monster.quantite}</td>
              <td>
                <button 
                  onClick={() => updateMonsterQuantity(monster.id, '+1', monster.quantite)}
                  className="quantity-btn plus-btn"
                  title="Augmenter la quantité"
                >
                  +
                </button>
                <button 
                  onClick={() => updateMonsterQuantity(monster.id, '-1', monster.quantite)}
                  className="quantity-btn minus-btn"
                  title="Diminuer la quantité"
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      )}
    </div>
  );
};

export default MonsterList;
