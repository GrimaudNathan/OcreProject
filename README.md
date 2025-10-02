# Ocre App - MetaMob

Application React pour gérer votre collection de monstres MetaMob avec une interface moderne et intuitive.

## 🎯 Fonctionnalités

- **Gestion des monstres** : Visualisez et gérez votre collection de monstres
- **Filtres avancés** : Recherche par nom, type, étape
- **Actions rapides** : Boutons + et - pour modifier les quantités
- **Filtres intelligents** : Masquer les monstres possédés, afficher les doublons
- **Interface responsive** : Design moderne avec animations fluides

## 🚀 Technologies utilisées

- **React 19** - Framework JavaScript moderne
- **TypeScript** - Typage statique pour plus de sécurité
- **Vite** - Build tool rapide et moderne
- **CSS3** - Styles modernes avec animations
- **API MetaMob** - Intégration avec l'API officielle

## 📦 Installation

```bash
# Cloner le projet
git clone <repository-url>
cd ocre-project

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés API MetaMob

# Démarrer le serveur de développement
npm run dev
```

## 🛠️ Scripts disponibles

```bash
# Développement
npm run dev          # Démarrer le serveur de développement

# Production
npm run build        # Construire l'application
npm run preview      # Prévisualiser la build

# Qualité du code
npm run lint         # Vérifier le code avec ESLint
```

## 🏗️ Structure du projet

```
src/
├── components/
│   ├── MonsterList.tsx      # Composant principal
│   └── MonsterList.css     # Styles du composant
├── services/
│   └── metamobApi.ts       # Service API MetaMob
├── types/
│   └── monster.ts          # Types TypeScript
├── App.tsx                 # Composant racine
├── App.css                 # Styles globaux
├── main.tsx               # Point d'entrée
└── index.css              # Styles de base
```

## 🔧 Configuration

### Proxy API
L'application est configurée pour utiliser un proxy vers l'API MetaMob :

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'https://api.metamob.fr',
      changeOrigin: true,
      // ... configuration des headers
    }
  }
}
```

### Variables d'environnement
Les clés API sont configurées via des variables d'environnement :

```bash
# .env
VITE_API_BASE_URL=/api
VITE_USER_KEY=your-user-key
VITE_API_KEY=your-api-key
```

**⚠️ Important :** Copiez `.env.example` vers `.env` et configurez vos clés API MetaMob.

## 🎨 Fonctionnalités détaillées

### Filtres
- **Recherche par nom** : Recherche en temps réel avec debounce
- **Filtre par type** : Monstre, Archimonstre, Boss
- **Filtre par étape** : Numéro d'étape spécifique
- **Masquer possédés** : Afficher seulement les monstres non possédés
- **Afficher doublons** : Voir uniquement les monstres avec quantité ≥ 2

### Actions
- **Modification des quantités** : Boutons + et - pour chaque monstre
- **Synchronisation** : Mise à jour automatique après chaque action
- **Gestion d'erreurs** : Affichage des erreurs API

### Interface
- **Design moderne** : Interface claire et intuitive
- **Animations** : Transitions fluides et feedback visuel
- **Responsive** : Adaptation à toutes les tailles d'écran
- **Accessibilité** : Navigation au clavier et lecteurs d'écran

## 🔄 API MetaMob

L'application utilise l'API officielle MetaMob pour :

- **Récupérer les monstres** : `GET /utilisateurs/{pseudo}/monstres`
- **Modifier les quantités** : `PUT /utilisateurs/{pseudo}/monstres`

### Endpoints utilisés
```typescript
// Récupérer les monstres avec filtres
GET /api/utilisateurs/Grim-G/monstres?nom=dragon&type=monstre

// Modifier la quantité d'un monstre
PUT /api/utilisateurs/Grim-G/monstres
Body: [{ "id": 123, "quantite": "+1" }]
```

## 🚀 Déploiement

```bash
# Construire pour la production
npm run build

# Les fichiers sont générés dans le dossier 'dist'
# Déployez le contenu de 'dist' sur votre serveur
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **MetaMob** pour l'API et l'univers du jeu
- **React** pour le framework
- **Vite** pour l'outil de build
- **TypeScript** pour la sécurité des types