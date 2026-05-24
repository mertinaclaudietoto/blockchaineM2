# Mini NFT Marketplace

Mini-projet Blockchain S14 - IT University Madagascar 2025/2026.

Sujet choisi : **Mini NFT Marketplace**. L'application permet de minter des NFT ERC-721, de les lister avec un prix en ETH, puis de les acheter via MetaMask sur le réseau Sepolia.

## Fonctionnalités

- Connexion MetaMask et vérification du réseau Sepolia.
- Mint d'un NFT ERC-721 avec métadonnées : nom, description et image.
- Galerie front des NFT mintés.
- Listing d'un NFT avec un prix en ETH.
- Achat d'un NFT listé avec paiement ETH.
- Transfert automatique du NFT vers l'acheteur.
- Transfert automatique de l'ETH vers le vendeur.
- Lecture des events du contrat pour les statistiques de ventes.
- Page d'accueil dynamique basée sur les données du marketplace.

## Stack technique

- React + Vite
- Solidity `^0.8.28`
- Hardhat 3
- Ethers.js v6
- OpenZeppelin ERC-721
- MetaMask
- Sepolia testnet

## Structure du projet

```text
my-app/
├── contracts/
│   └── NFTMarketplace.sol
├── test/
│   └── NFTMarketplace.ts
├── scripts/
│   └── deploy-marketplace.ts
├── src/
│   ├── blockchain/
│   ├── context/
│   ├── pages/
│   └── shared/
└── README.md
```

## Smart Contract

Contrat principal :

```text
contracts/NFTMarketplace.sol
```

Le contrat utilise :

- `ERC721URIStorage` pour gérer les NFT et leurs `tokenURI`.
- `Ownable` pour initialiser un owner du contrat.
- `ReentrancyGuard` pour protéger la fonction d'achat.

Fonctions principales :

- `mintNFT(string tokenURI)` : crée un NFT ERC-721.
- `listItem(uint256 tokenId, uint256 price)` : met un NFT en vente.
- `buyItem(uint256 tokenId)` : achète un NFT listé avec ETH.

Events :

- `NFTMinted`
- `ItemListed`
- `ItemSold`

## Sécurité

Le contrat vérifie notamment :

- un `tokenURI` vide est refusé ;
- un prix de vente égal à `0` est refusé ;
- seul le propriétaire du NFT peut le lister ;
- un NFT non listé ne peut pas être acheté ;
- un paiement insuffisant est refusé ;
- le vendeur ne peut pas acheter son propre NFT ;
- `buyItem` suit le pattern Checks-Effects-Interactions ;
- `buyItem` est protégé par `nonReentrant`.

## Installation

```bash
npm install
```

## Lancer le front

```bash
npm run dev
```

Puis ouvrir :

```text
http://localhost:5173
```

Pages utiles :

- `/` : page d'accueil dynamique.
- `/login` : connexion MetaMask.
- `/nft` : dashboard marketplace.
- `/nft/mint` : mint d'un NFT.
- `/nft/explorer` : galerie des NFT.
- `/nft/collection` : collection de l'utilisateur.

## Tests

Lancer les tests du contrat :

```bash
npx hardhat test test/NFTMarketplace.ts
```

Les tests couvrent :

- mint avec URI valide ;
- refus du mint avec URI vide ;
- listing avec prix valide ;
- refus du listing avec prix `0` ;
- refus du listing par un non-propriétaire ;
- refus d'achat d'un NFT non listé ;
- refus d'achat avec paiement insuffisant ;
- refus d'achat par le vendeur ;
- achat réussi avec transfert NFT et paiement ETH.

## Déploiement Sepolia

Créer un fichier `.env` à la racine du projet avec :

```env
SEPOLIA_RPC_URL=https://...
SEPOLIA_PRIVATE_KEY=0x...
VITE_NFT_MARKETPLACE_ADDRESS=0x...
```

Déployer le contrat :

```bash
npm run deploy:sepolia
```

Après le déploiement, copier l'adresse affichée dans :

```env
VITE_NFT_MARKETPLACE_ADDRESS=0xADRESSE_DU_CONTRAT
```

Puis redémarrer le front :

```bash
npm run dev
```

## Adresse du contrat Sepolia

```text
Adresse contrat : 0x4a5a1497cEd5fC29e5B9Cd8fF4CFaafF44D3ab99
Etherscan Sepolia : https://sepolia.etherscan.io/address/0x4a5a1497cEd5fC29e5B9Cd8fF4CFaafF44D3ab99
```

## Scénario de démonstration

1. Ouvrir l'application.
2. Connecter MetaMask sur Sepolia.
3. Aller sur `/nft/mint`.
4. Créer un NFT avec un nom, une description et une image.
5. Ouvrir la page détail du NFT.
6. Lister le NFT avec un prix en ETH.
7. Se connecter avec un deuxième compte MetaMask.
8. Acheter le NFT listé.
9. Vérifier que le propriétaire du NFT a changé.
10. Vérifier les statistiques de ventes sur la page d'accueil.

## Captures d'écran

dossier `screenshots/` :

- page d'accueil dynamique ;
- connexion MetaMask ;
- mint NFT ;
- listing NFT ;
- achat NFT ;
- transaction ou contrat sur Sepolia Etherscan.

## Liens de rendu

À compléter avant soumission :

```text
Repository GitHub public : https://github.com/...
Adresse Sepolia Etherscan : https://sepolia.etherscan.io/address/0x4a5a1497cEd5fC29e5B9Cd8fF4CFaafF44D3ab99
Vidéo de démonstration : https://...
Déploiement front public : https://...
```
