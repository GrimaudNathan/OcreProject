import React, { useState, useEffect, useRef } from 'react';
import { metamobApiService } from '../services/metamobApi';
import './ArchimonsterCounter.css';

interface ArchimonsterCounterProps {}

const ArchimonsterCounter: React.FC<ArchimonsterCounterProps> = () => {
  const [archimonsterStats, setArchimonsterStats] = useState<{
    owned: number;
    total: number;
    loading: boolean;
  }>({ owned: 0, total: 0, loading: false });

  const hasLoaded = useRef(false);

  const loadArchimonsterStats = async () => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    
    setArchimonsterStats(prev => ({ ...prev, loading: true }));
    
    try {
      const archimonsters = await metamobApiService.getUserMonsters({ type: 'archimonstre' });
      const owned = archimonsters.filter(monster => monster.quantite > 0).length;
      const total = archimonsters.length;
      
      setArchimonsterStats({ owned, total, loading: false });
    } catch (err) {
      console.error('Erreur lors du chargement des archimonstres:', err);
      setArchimonsterStats(prev => ({ ...prev, loading: false }));
      hasLoaded.current = false;
    }
  };

  useEffect(() => {
    loadArchimonsterStats();
  }, []);

  const handleRefresh = () => {
    hasLoaded.current = false;
    loadArchimonsterStats();
  };

  return (
    <div className="archimonster-counter">
      <span className="counter-text">
        Archimonstres: {archimonsterStats.owned}/{archimonsterStats.total}
      </span>
      <button 
        className="refresh-btn"
        onClick={handleRefresh}
        disabled={archimonsterStats.loading}
        title="Actualiser le compteur"
      >
        <span className="refresh-icon">
          ⟳
        </span>
      </button>
    </div>
  );
};

export default ArchimonsterCounter;
