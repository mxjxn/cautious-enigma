# Database

PostgreSQL database with Prisma ORM for game state persistence.

## Schema

### Models

#### User
Stores Farcaster user information.
- `id`: Unique identifier
- `fid`: Farcaster ID
- `username`: Username
- `createdAt`, `updatedAt`: Timestamps

#### Game
Represents a game session.
- `id`: Unique identifier
- `turn`: Current turn number
- `currentTeam`: Active team (player/enemy)
- `gridWidth`, `gridHeight`: Board dimensions
- `isGameOver`: Game completion status
- `winner`: Winning team (if finished)
- `player1Id`, `player2Id`: Player references
- `createdAt`, `updatedAt`: Timestamps

#### Unit
Game units on the battlefield.
- `id`: Unique identifier
- `gameId`: Parent game
- `name`, `team`: Unit identification
- `positionX`, `positionY`: Grid position
- `hp`, `maxHp`: Health
- `actionPoints`, `maxActionPoints`: Turn actions
- `moveRange`, `attackRange`, `attackDamage`: Stats
- `isAlive`: Status

#### Move
Records all moves made in a game.
- `id`: Unique identifier
- `gameId`, `unitId`: References
- `moveType`: Type of action (move/attack)
- `fromX`, `fromY`, `toX`, `toY`: Positions
- `targetId`, `damage`: For attacks
- `turnNumber`: When move occurred

## Commands

Generate Prisma client:
```bash
npm run db:generate
```

Push schema to database:
```bash
npm run db:push
```

Create and run migrations:
```bash
npm run db:migrate
```

Open Prisma Studio:
```bash
npm run db:studio
```

Seed database:
```bash
npm run db:seed
```

## Environment Variables

Create `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/tactical_game?schema=public"
```

## Setup

1. Install PostgreSQL locally or use a cloud provider
2. Create a database named `tactical_game`
3. Update `.env` with your database URL
4. Run migrations: `npm run db:push`
5. Seed with sample data: `npm run db:seed`

## Usage in Backend

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Query example
const game = await prisma.game.findUnique({
  where: { id: gameId },
  include: { units: true }
});
```
