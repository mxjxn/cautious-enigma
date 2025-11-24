# Development Guide

## Quick Start

```bash
# Install all dependencies
npm install

# Start all apps in development mode
npm run dev

# Or start individual apps
cd apps/frontend && npm run dev    # Frontend on :3000
cd apps/backend && npm run dev     # Backend on :3001
```

## Architecture

### Frontend (Next.js + Farcaster SDK)
- **Port**: 3000
- **Framework**: Next.js 14 with App Router
- **Key Features**:
  - Farcaster miniapp integration
  - React components for game UI
  - Client-side game state management
  - WebSocket connection for real-time updates

### Backend (Express + Socket.IO)
- **Port**: 3001
- **Framework**: Express with TypeScript
- **Key Features**:
  - REST API for game operations
  - WebSocket server for real-time communication
  - Game logic validation
  - Database operations

### Database (PostgreSQL + Prisma)
- **ORM**: Prisma
- **Key Features**:
  - User management
  - Game state persistence
  - Move history tracking
  - Type-safe database queries

### Contracts (Foundry)
- **Framework**: Foundry
- **Status**: Placeholder for future features
- **Planned Features**:
  - NFT units
  - In-game items
  - Tournaments
  - Rewards

## Development Workflow

### 1. Database Setup

```bash
cd apps/database

# Push schema to database
npm run db:push

# Seed with sample data
npm run db:seed

# Open Prisma Studio (visual editor)
npm run db:studio
```

### 2. Frontend Development

```bash
cd apps/frontend

# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Key files:
- `src/app/page.tsx` - Main game page
- `src/components/GameBoard.tsx` - Game grid component
- `src/lib/gameEngine.ts` - Game logic

### 3. Backend Development

```bash
cd apps/backend

# Development mode with auto-restart
npm run dev

# Build TypeScript
npm run build

# Start production server
npm run start
```

Key files:
- `src/index.ts` - Server entry point
- `src/routes/game.ts` - API routes
- `src/services/GameService.ts` - Game logic service

### 4. Smart Contracts (Optional)

First, install Foundry:
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

Then:
```bash
cd packages/contracts

# Install dependencies
forge install

# Build contracts
forge build

# Run tests
forge test

# Run tests with verbosity
forge test -vvv
```

## Common Tasks

### Adding a New Frontend Component

1. Create file in `apps/frontend/src/components/`
2. Export component
3. Import and use in pages/components

### Adding a New API Endpoint

1. Add route in `apps/backend/src/routes/game.ts`
2. Implement logic in service if needed
3. Update types in `src/types/index.ts`

### Modifying Database Schema

1. Edit `apps/database/prisma/schema.prisma`
2. Run `npm run db:push` to update database
3. Generate new client: `npm run db:generate`

### Adding a WebSocket Event

**Backend:**
```typescript
// In GameService.ts
socket.on('new-event', (data) => {
  // Handle event
  this.io.to(gameId).emit('response-event', result);
});
```

**Frontend:**
```typescript
// In component
socket.on('response-event', (data) => {
  // Handle response
});
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

### Backend (.env)
```
PORT=3001
FRONTEND_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/tactical_game
```

### Database (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/tactical_game?schema=public
```

## Troubleshooting

### "Module not found" errors
- Run `npm install` in the root directory
- Check that all workspaces are properly configured

### Database connection errors
- Ensure PostgreSQL is running
- Verify DATABASE_URL in .env files
- Run `npm run db:push` to sync schema

### WebSocket not connecting
- Check CORS settings in backend
- Verify WebSocket URL in frontend
- Check firewall/network settings

### Farcaster SDK errors
- Ensure you're testing in a Farcaster frame context
- Check SDK initialization in page.tsx
- Verify frame-ancestors CSP header

## Building for Production

```bash
# Build all packages
npm run build

# The builds are in:
# - apps/frontend/.next/
# - apps/backend/dist/
```

## Useful Commands

```bash
# Clean all builds and dependencies
npm run clean

# Format all code
npm run format

# Lint all code
npm run lint

# Run all tests
npm run test
```

## Next Steps

1. Implement complete game logic
2. Add user authentication
3. Implement multiplayer matchmaking
4. Add more unit types
5. Create different maps
6. Integrate smart contracts
7. Add tournaments and leaderboards
