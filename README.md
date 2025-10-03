# Ocre App

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

# Installer les dépendances avec pnpm
pnpm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés API MetaMob et votre pseudo utilisateur

# Démarrer le serveur de développement
pnpm run dev
```

## 🛠️ Scripts disponibles

```bash
# Développement
pnpm run dev          # Démarrer le serveur de développement

# Production
pnpm run build        # Construire l'application
pnpm run preview      # Prévisualiser la build

# Qualité du code
pnpm run lint         # Vérifier le code avec ESLint
```

## 🏗️ Structure du projet

```
ocre-project/
├── src/
│   ├── components/
│   │   ├── ArchimonsterCounter.tsx    # Compteur d'archimonstres
│   │   ├── ArchimonsterCounter.css   # Styles du compteur
│   │   ├── MonsterList.tsx           # Liste des monstres
│   │   └── MonsterList.css           # Styles de la liste
│   ├── services/
│   │   └── metamobApi.ts             # Service API MetaMob
│   ├── types/
│   │   └── monster.ts                # Types TypeScript
│   ├── App.tsx                       # Composant racine
│   ├── App.css                       # Styles globaux
│   ├── main.tsx                      # Point d'entrée
│   └── index.css                     # Styles de base
├── netlify/
│   └── functions/
│       └── metamob-proxy.js          # Netlify Function pour proxy API
├── public/
│   └── favicon.ico                   # Icône du site
├── netlify.toml                      # Configuration Netlify
├── .npmrc                            # Configuration pnpm
├── package.json                      # Dépendances et scripts
├── vite.config.ts                    # Configuration Vite
├── tsconfig.json                     # Configuration TypeScript
└── README.md                         # Documentation
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
Les clés API et le pseudo utilisateur sont configurés via des variables d'environnement :

```bash
# .env
VITE_API_BASE_URL=/api
VITE_USER_KEY=your-user-key
VITE_API_KEY=your-api-key
VITE_USER_PSEUDO=your-pseudo
```

**⚠️ Important :** Copiez `.env.example` vers `.env` et configurez vos clés API MetaMob et votre pseudo utilisateur.

## 🔄 API MetaMob

L'application utilise l'API officielle MetaMob pour :

- **Récupérer les monstres** : `GET /utilisateurs/{pseudo}/monstres`
- **Modifier les quantités** : `PUT /utilisateurs/{pseudo}/monstres`

### Endpoints utilisés
```typescript
// Récupérer les monstres avec filtres
GET /api/utilisateurs/{USER_PSEUDO}/monstres?nom=dragon&type=monstre

// Modifier la quantité d'un monstre
PUT /api/utilisateurs/{USER_PSEUDO}/monstres
Body: [{ "id": 123, "quantite": "+1" }]
```

**Note :** Le pseudo utilisateur est configuré via la variable d'environnement `VITE_USER_PSEUDO`.

## 🚀 Déploiement

### Déploiement sur Netlify

L'application utilise des Netlify Functions pour contourner les restrictions CORS de l'API MetaMob.

1. **Variables d'environnement** : Configurez dans les paramètres Netlify :
   - `VITE_API_KEY` : Votre clé API MetaMob
   - `VITE_USER_KEY` : Votre clé utilisateur MetaMob  
   - `VITE_USER_PSEUDO` : Votre pseudonyme MetaMob

2. **Build automatique** : Netlify détectera automatiquement la configuration et déploiera les fonctions.

```bash
# Construire pour la production
pnpm run build

# Les fichiers sont générés dans le dossier 'dist'
# Les Netlify Functions sont dans 'netlify/functions'
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