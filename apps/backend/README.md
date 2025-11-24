# Backend API Server

Express server with REST API and WebSocket support for real-time game synchronization.

## Structure

```
src/
├── index.ts            # Server entry point
├── routes/
│   └── game.ts        # Game API routes
├── services/
│   └── GameService.ts # Game logic service
└── types/
    └── index.ts       # TypeScript types
```

## API Endpoints

### REST API

#### POST /api/game/create
Create a new game.

Request:
```json
{
  "playerId": "string",
  "playerName": "string"
}
```

Response:
```json
{
  "success": true,
  "gameId": "string",
  "message": "Game created successfully"
}
```

#### POST /api/game/join/:gameId
Join an existing game.

#### GET /api/game/:gameId
Get current game state.

#### POST /api/game/:gameId/move
Execute a move.

Request:
```json
{
  "unitId": "string",
  "targetPosition": { "x": 0, "y": 0 }
}
```

#### POST /api/game/:gameId/end-turn
End the current turn.

### WebSocket Events

#### Client -> Server

- `join-game`: Join a game room
- `game-action`: Send game action (move, attack, end-turn)

#### Server -> Client

- `game-update`: Broadcast game state changes

## Running

Development with hot reload:
```bash
npm run dev
```

Build:
```bash
npm run build
```

Production:
```bash
npm run start
```

## Environment Variables

Create `.env`:
```
PORT=3001
FRONTEND_URL=http://localhost:3000
NEYNAR_API_KEY=your_api_key
DATABASE_URL=postgresql://user:password@localhost:5432/tactical_game
```

## Features

- RESTful API for game operations
- WebSocket for real-time updates
- CORS enabled for frontend communication
- Neynar SDK integration for Farcaster features
- Game state management
- Move validation
