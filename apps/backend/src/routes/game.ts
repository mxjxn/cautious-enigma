import { Router } from 'express';
import { GameEngine } from '@farcaster-tactical/game-engine';
import { z } from 'zod';

const router = Router();
const gameEngine = new GameEngine();

// In-memory game storage (replace with database in production)
const games = new Map<string, any>();

const GameActionSchema = z.object({
  gameId: z.string(),
  action: z.object({
    type: z.enum(['move', 'attack', 'ability', 'end_turn']),
    unitId: z.string().optional(),
    target: z.union([
      z.object({ x: z.number(), y: z.number() }),
      z.string(),
    ]).optional(),
    abilityId: z.string().optional(),
  }),
});

// Create new game
router.post('/new', async (req, res) => {
  try {
    const { playerFid } = req.body;

    const gameState = gameEngine.createNewGame(playerFid || 1);
    games.set(gameState.id, gameState);

    res.json(gameState);
  } catch (error) {
    console.error('Game creation error:', error);
    res.status(500).json({ error: 'Failed to create game' });
  }
});

// Get game state
router.get('/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = games.get(gameId);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json(game);
  } catch (error) {
    console.error('Game fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch game' });
  }
});

// Perform game action
router.post('/action', async (req, res) => {
  try {
    const validatedData = GameActionSchema.parse(req.body);
    const { gameId, action } = validatedData;

    const game = games.get(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const updatedGame = gameEngine.processAction(game, action);
    games.set(gameId, updatedGame);

    res.json(updatedGame);
  } catch (error) {
    console.error('Game action error:', error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid action', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to process action' });
  }
});

// List games for player
router.get('/player/:fid', async (req, res) => {
  try {
    const { fid } = req.params;
    const playerGames = Array.from(games.values()).filter(
      (game) => game.playerFid === parseInt(fid)
    );

    res.json(playerGames);
  } catch (error) {
    console.error('Game list error:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

export { router as gameRouter };
