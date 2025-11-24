# Farcaster Tactical Game

A turn-based tactical strategy game built as a Farcaster miniapp, inspired by X-COM with top-down pixel art graphics.

## 🎮 Overview

This project is a multiplayer turn-based tactical game where players command a squad of units in strategic combat. The game features:

- **Turn-based combat** with action points system
- **Multiple unit types**: Soldiers, Snipers, Medics, and Heavy units
- **Tactical gameplay**: Cover system, positioning, and range management
- **Pixel art aesthetics**: Retro-style top-down graphics
- **Farcaster integration**: Social features and player authentication
- **Smart contract support**: NFT achievements and rewards (coming soon)

## 📦 Project Structure

This is a **Turborepo** monorepo containing:

```
.
├── apps/
│   ├── frontend/        # Next.js app with Farcaster Frame SDK
│   ├── backend/         # Express API server
│   └── contracts/       # Foundry smart contracts (placeholder)
├── packages/
│   ├── game-engine/     # Core game logic and mechanics
│   └── db/              # Prisma database layer
└── turbo.json           # Turborepo configuration
```

### Apps

- **frontend**: Next.js 14 application with React, TypeScript, and Tailwind CSS
- **backend**: Express.js REST API with Neynar SDK integration
- **contracts**: Foundry project for smart contracts (to be implemented)

### Packages

- **game-engine**: Shared game logic, turn-based mechanics, and AI
- **db**: Prisma ORM with PostgreSQL schema

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL (for database)
- Foundry (optional, for smart contracts)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cautious-enigma
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:

**Backend** (`apps/backend/.env`):
```bash
cp apps/backend/.env.example apps/backend/.env
# Edit with your values
```

**Frontend** (`apps/frontend/.env`):
```bash
cp apps/frontend/.env.example apps/frontend/.env
# Edit with your values
```

**Database** (`packages/db/.env`):
```bash
cp packages/db/.env.example packages/db/.env
# Edit with your database URL
```

4. Set up the database:
```bash
cd packages/db
pnpm db:push
pnpm db:seed
```

### Development

Run all apps in development mode:
```bash
pnpm dev
```

Or run individual apps:
```bash
# Frontend only
cd apps/frontend
pnpm dev

# Backend only
cd apps/backend
pnpm dev
```

### Build

Build all packages and apps:
```bash
pnpm build
```

## 🎯 Game Mechanics

### Unit Types

- **Soldier**: Balanced unit with decent stats
  - Health: 100, Damage: 20, Range: 5, Accuracy: 75%

- **Sniper**: Long-range high-damage unit
  - Health: 70, Damage: 40, Range: 10, Accuracy: 90%

- **Medic**: Support unit with healing capabilities
  - Health: 80, Damage: 10, Range: 4, Accuracy: 60%

- **Heavy**: Tank unit with high health and defense
  - Health: 150, Damage: 30, Range: 4, Accuracy: 65%

### Action Points

Each unit has 2 action points per turn that can be used for:
- **Movement**: 1 AP per tile
- **Attacking**: Consumes all remaining AP
- **Abilities**: Varies by ability (coming soon)

### Cover System

- **Half Cover**: Provides defense bonus against attacks
- **Full Cover**: Maximum defense bonus
- Position strategically to maximize survivability

## 🔧 Technology Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Farcaster Frame SDK
- Canvas API for pixel art rendering

### Backend
- Node.js
- Express.js
- TypeScript
- Neynar SDK
- Zod for validation

### Database
- PostgreSQL
- Prisma ORM

### Smart Contracts (Planned)
- Solidity
- Foundry
- Achievement NFTs
- Reward distribution

## 📚 API Documentation

### Game Endpoints

- `POST /api/game/new` - Create a new game
- `GET /api/game/:gameId` - Get game state
- `POST /api/game/action` - Perform a game action
- `GET /api/game/player/:fid` - List player's games

### Auth Endpoints

- `POST /api/auth/verify` - Verify Farcaster signature
- `GET /api/auth/user/:fid` - Get user profile

## 🎨 Pixel Art Rendering

The game uses HTML5 Canvas with pixel-perfect rendering:
- 32x32 pixel tiles
- 20x15 tile grid (640x480 effective resolution)
- Crisp pixel art with `image-rendering: pixelated`

## 🔐 Farcaster Integration

The app integrates with Farcaster using:
- **@farcaster/frame-sdk**: Frame context and user authentication
- **@neynar/nodejs-sdk**: User profiles and social features

## 🎮 Future Features

### Phase 1 (Current)
- [x] Basic game mechanics
- [x] Turn-based combat
- [x] Simple AI
- [x] Frontend UI
- [x] Backend API

### Phase 2 (Planned)
- [ ] Multiplayer matchmaking
- [ ] Real-time multiplayer
- [ ] Enhanced AI with difficulty levels
- [ ] More unit types and abilities
- [ ] Campaign mode

### Phase 3 (Future)
- [ ] Smart contract integration
- [ ] Achievement NFTs
- [ ] Reward tokens
- [ ] Tournaments and leaderboards
- [ ] Custom maps and mod support

## 🧪 Testing

Run tests:
```bash
pnpm test
```

For smart contracts:
```bash
cd apps/contracts
forge test
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.