# Backend - Farcaster Tactical Game

Express.js REST API server for the Farcaster Tactical Game.

## Features

- RESTful API for game management
- Neynar SDK integration for Farcaster features
- Game state management
- Player authentication
- Zod schema validation

## Development

```bash
pnpm dev
```

Server runs on [http://localhost:3001](http://localhost:3001)

## Environment Variables

Create a `.env` file:

```
PORT=3001
NEYNAR_API_KEY=your_neynar_api_key
DATABASE_URL=postgresql://user:password@localhost:5432/farcaster_tactical
NODE_ENV=development
```

## API Endpoints

### Game Routes

- `POST /api/game/new` - Create new game
- `GET /api/game/:gameId` - Get game state
- `POST /api/game/action` - Execute game action
- `GET /api/game/player/:fid` - List player games

### Auth Routes

- `POST /api/auth/verify` - Verify Farcaster signature
- `GET /api/auth/user/:fid` - Get user profile

## Building

```bash
pnpm build
pnpm start
```
