# Farcaster Tactical Game - Turn-Based Miniapp

A turn-based tactical game (inspired by X-COM) built as a Farcaster miniapp using pixel art graphics. Players command units on a grid-based battlefield in strategic turn-based combat.

## 🎮 Features

- **Turn-Based Tactical Combat**: X-COM style gameplay with action points and tactical decisions
- **Farcaster Integration**: Built using @farcaster/frame-sdk for native Farcaster experience
- **Pixel Art Graphics**: Retro-style visual representation
- **Real-time Multiplayer**: Socket.IO for live game updates
- **Persistent Game State**: PostgreSQL database with Prisma ORM
- **Smart Contract Ready**: Foundry setup for future on-chain features

## 📁 Project Structure

This is a turborepo monorepo containing:

```
├── apps/
│   ├── frontend/          # Next.js frontend with Farcaster SDK
│   ├── backend/           # Express API server with Socket.IO
│   └── database/          # Prisma schema and migrations
├── packages/
│   └── contracts/         # Foundry smart contracts (placeholder)
├── turbo.json            # Turborepo configuration
└── package.json          # Root workspace configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL (for database)
- Foundry (optional, for contracts)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mxjxn/cautious-enigma.git
cd cautious-enigma
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Frontend
cp apps/frontend/.env.example apps/frontend/.env.local

# Backend
cp apps/backend/.env.example apps/backend/.env

# Database
cp apps/database/.env.example apps/database/.env
```

4. Set up the database:
```bash
cd apps/database
npm run db:push
npm run db:seed
```

### Development

Run all apps in development mode:
```bash
npm run dev
```

Or run individual apps:
```bash
# Frontend only (http://localhost:3000)
cd apps/frontend && npm run dev

# Backend only (http://localhost:3001)
cd apps/backend && npm run dev
```

### Building

Build all apps:
```bash
npm run build
```

## 🎯 Game Mechanics

### Units
- Each unit has HP, action points, movement range, and attack range
- Units can move or attack during their turn
- Action points limit the number of actions per turn

### Turn System
- Alternates between player and enemy teams
- Each team can move all their units during their turn
- Turn ends when player chooses to end it

### Combat
- Grid-based tactical movement
- Range-based attacks
- Health management

## 🛠️ Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- @farcaster/frame-sdk
- Tailwind CSS

### Backend
- Express
- Socket.IO
- Neynar SDK
- TypeScript

### Database
- PostgreSQL
- Prisma ORM

### Contracts
- Foundry
- Solidity 0.8.23

## 📦 Workspace Packages

### apps/frontend
Next.js application with Farcaster miniapp integration. Renders the game board and handles user interactions.

### apps/backend
Express server providing REST API and WebSocket connections for real-time game state synchronization.

### apps/database
Prisma schema defining the database structure for users, games, units, and moves.

### packages/contracts
Foundry project for future smart contract integration (NFTs, rewards, tournaments).

## 🔮 Future Enhancements

- [ ] AI opponent
- [ ] Different unit types with special abilities
- [ ] Multiple maps and terrain types
- [ ] Power-ups and items
- [ ] Tournament mode
- [ ] NFT integration for units and items
- [ ] On-chain leaderboard
- [ ] Replay system

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC

## 🔗 Links

- [Farcaster Documentation](https://docs.farcaster.xyz/)
- [Neynar API](https://docs.neynar.com/)
- [Turborepo](https://turbo.build/repo)
