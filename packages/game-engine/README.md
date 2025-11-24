# Game Engine

Core game logic package for the Farcaster Tactical Game.

## Features

- Turn-based combat system
- Unit management and stats
- Map generation
- AI opponent logic
- Action validation
- Win/loss condition checking

## Usage

```typescript
import { GameEngine } from '@farcaster-tactical/game-engine';

const engine = new GameEngine();

// Create a new game
const gameState = engine.createNewGame(playerFid);

// Process an action
const updatedState = engine.processAction(gameState, {
  type: 'move',
  unitId: 'unit-123',
  target: { x: 5, y: 5 }
});
```

## Game Mechanics

### Action Points System

Each unit has action points that reset each turn:
- Movement costs 1 AP per tile (Manhattan distance)
- Attacks consume all remaining AP
- Turn ends when player chooses or no units have AP

### Combat System

- Range-based attacks
- Accuracy rolls determine hit/miss
- Damage calculation: `max(0, attacker.damage - target.defense)`
- Cover provides defense bonus

### AI System

Simple AI that:
1. Finds nearest player unit
2. Attacks if in range
3. Moves toward target if out of range

## Development

```bash
pnpm build  # Compile TypeScript
pnpm dev    # Watch mode
```
