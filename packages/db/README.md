# Database Package

Prisma-based database layer for the Farcaster Tactical Game.

## Schema

- **User**: Farcaster user information
- **Game**: Game state and metadata
- **GameAction**: Action history

## Development

```bash
# Generate Prisma client
pnpm build

# Push schema to database
pnpm db:push

# Run migrations
pnpm db:migrate

# Seed database
pnpm db:seed

# Open Prisma Studio
pnpm db:studio
```

## Environment Variables

Create a `.env` file:

```
DATABASE_URL=postgresql://user:password@localhost:5432/farcaster_tactical
```

## Usage

```typescript
import { prisma } from '@farcaster-tactical/db';

// Create a user
const user = await prisma.user.create({
  data: {
    fid: 123,
    username: 'player1'
  }
});

// Create a game
const game = await prisma.game.create({
  data: {
    userId: user.id,
    mapData: mapJson,
    unitsData: unitsJson
  }
});
```
