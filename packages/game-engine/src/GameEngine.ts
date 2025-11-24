import { GameState, GameAction, Unit, Tile, Position, UnitType, UnitStats } from './types';
import { MapGenerator } from './MapGenerator';
import { v4 as uuidv4 } from 'uuid';

export class GameEngine {
  private mapGenerator: MapGenerator;

  constructor() {
    this.mapGenerator = new MapGenerator();
  }

  createNewGame(playerFid: number): GameState {
    const map = this.mapGenerator.generateMap(20, 15);
    const units = this.createInitialUnits(map);

    return {
      id: uuidv4(),
      playerFid,
      turn: 1,
      phase: 'player',
      units,
      map,
      selectedUnit: null,
      availableMoves: [],
      availableTargets: [],
      score: 0,
      status: 'active',
    };
  }

  processAction(state: GameState, action: GameAction): GameState {
    let newState = { ...state };

    switch (action.type) {
      case 'move':
        if (action.unitId && action.target && typeof action.target === 'object') {
          newState = this.moveUnit(newState, action.unitId, action.target as Position);
        }
        break;

      case 'attack':
        if (action.unitId && action.target && typeof action.target === 'string') {
          newState = this.attackUnit(newState, action.unitId, action.target);
        }
        break;

      case 'end_turn':
        newState = this.endTurn(newState);
        break;

      default:
        console.warn('Unknown action type:', action.type);
    }

    // Check win/loss conditions
    newState = this.checkGameStatus(newState);

    return newState;
  }

  private createInitialUnits(map: Tile[][]): Unit[] {
    const units: Unit[] = [];

    // Create player units
    const playerStartPositions = [
      { x: 2, y: 7 },
      { x: 3, y: 6 },
      { x: 3, y: 8 },
      { x: 4, y: 7 },
    ];

    playerStartPositions.forEach((pos, idx) => {
      const unitType: UnitType = ['soldier', 'sniper', 'medic', 'heavy'][idx] as UnitType;
      units.push(this.createUnit(unitType, pos, 'player'));
      map[pos.y][pos.x].occupied = true;
    });

    // Create enemy units
    const enemyStartPositions = [
      { x: 17, y: 7 },
      { x: 16, y: 6 },
      { x: 16, y: 8 },
      { x: 15, y: 7 },
    ];

    enemyStartPositions.forEach((pos, idx) => {
      const unitType: UnitType = ['soldier', 'soldier', 'sniper', 'heavy'][idx] as UnitType;
      units.push(this.createUnit(unitType, pos, 'enemy'));
      map[pos.y][pos.x].occupied = true;
    });

    return units;
  }

  private createUnit(type: UnitType, position: Position, team: 'player' | 'enemy'): Unit {
    const statsMap: Record<UnitType, UnitStats> = {
      soldier: { damage: 20, range: 5, accuracy: 75, defense: 5 },
      sniper: { damage: 40, range: 10, accuracy: 90, defense: 2 },
      medic: { damage: 10, range: 4, accuracy: 60, defense: 3 },
      heavy: { damage: 30, range: 4, accuracy: 65, defense: 10 },
    };

    const healthMap: Record<UnitType, number> = {
      soldier: 100,
      sniper: 70,
      medic: 80,
      heavy: 150,
    };

    return {
      id: uuidv4(),
      type,
      position,
      health: healthMap[type],
      maxHealth: healthMap[type],
      actionPoints: 2,
      maxActionPoints: 2,
      team,
      stats: statsMap[type],
    };
  }

  private moveUnit(state: GameState, unitId: string, target: Position): GameState {
    const newState = { ...state };
    const unit = newState.units.find((u) => u.id === unitId);

    if (!unit || unit.team !== 'player' || unit.actionPoints <= 0) {
      return state;
    }

    // Calculate movement cost
    const distance = Math.abs(unit.position.x - target.x) + Math.abs(unit.position.y - target.y);
    if (distance > unit.actionPoints) {
      return state;
    }

    // Check if target is valid
    if (newState.map[target.y][target.x].occupied || newState.map[target.y][target.x].type === 'wall') {
      return state;
    }

    // Update map occupancy
    newState.map[unit.position.y][unit.position.x].occupied = false;
    newState.map[target.y][target.x].occupied = true;

    // Move unit
    unit.position = target;
    unit.actionPoints -= distance;

    // Clear selection if no action points left
    if (unit.actionPoints <= 0) {
      newState.selectedUnit = null;
      newState.availableMoves = [];
    }

    return newState;
  }

  private attackUnit(state: GameState, attackerId: string, targetId: string): GameState {
    const newState = { ...state };
    const attacker = newState.units.find((u) => u.id === attackerId);
    const target = newState.units.find((u) => u.id === targetId);

    if (!attacker || !target || attacker.actionPoints <= 0) {
      return state;
    }

    // Check range
    const distance =
      Math.abs(attacker.position.x - target.position.x) +
      Math.abs(attacker.position.y - target.position.y);

    if (distance > attacker.stats.range) {
      return state;
    }

    // Calculate hit chance
    const hitRoll = Math.random() * 100;
    if (hitRoll <= attacker.stats.accuracy) {
      // Calculate damage
      const damage = Math.max(0, attacker.stats.damage - target.stats.defense);
      target.health = Math.max(0, target.health - damage);

      // Remove dead units
      if (target.health <= 0) {
        newState.units = newState.units.filter((u) => u.id !== targetId);
        newState.map[target.position.y][target.position.x].occupied = false;
        newState.score += 100;
      }
    }

    // Consume action point
    attacker.actionPoints = 0;
    newState.selectedUnit = null;
    newState.availableMoves = [];
    newState.availableTargets = [];

    return newState;
  }

  private endTurn(state: GameState): GameState {
    let newState = { ...state };

    if (newState.phase === 'player') {
      // Restore player units' action points
      newState.units.forEach((unit) => {
        if (unit.team === 'player') {
          unit.actionPoints = unit.maxActionPoints;
        }
      });

      // Switch to enemy phase
      newState.phase = 'enemy';
      newState.selectedUnit = null;
      newState.availableMoves = [];

      // Process enemy AI
      newState = this.processEnemyTurn(newState);

      // After enemy turn, switch back to player
      newState.phase = 'player';
      newState.turn += 1;

      // Restore all units' action points
      newState.units.forEach((unit) => {
        unit.actionPoints = unit.maxActionPoints;
      });
    }

    return newState;
  }

  private processEnemyTurn(state: GameState): GameState {
    let newState = { ...state };
    const enemyUnits = newState.units.filter((u) => u.team === 'enemy');

    // Simple AI: Move towards and attack nearest player unit
    enemyUnits.forEach((enemy) => {
      const playerUnits = newState.units.filter((u) => u.team === 'player');
      if (playerUnits.length === 0) return;

      // Find nearest player unit
      let nearest = playerUnits[0];
      let minDistance = this.calculateDistance(enemy.position, nearest.position);

      playerUnits.forEach((player) => {
        const dist = this.calculateDistance(enemy.position, player.position);
        if (dist < minDistance) {
          minDistance = dist;
          nearest = player;
        }
      });

      // Try to attack if in range
      if (minDistance <= enemy.stats.range && enemy.actionPoints > 0) {
        newState = this.attackUnit(newState, enemy.id, nearest.id);
      } else if (enemy.actionPoints > 0) {
        // Move towards target
        const direction = this.getDirectionTowards(enemy.position, nearest.position);
        const newPos = {
          x: enemy.position.x + direction.x,
          y: enemy.position.y + direction.y,
        };

        // Validate move
        if (
          newPos.x >= 0 &&
          newPos.x < 20 &&
          newPos.y >= 0 &&
          newPos.y < 15 &&
          !newState.map[newPos.y][newPos.x].occupied &&
          newState.map[newPos.y][newPos.x].type !== 'wall'
        ) {
          newState = this.moveUnit(newState, enemy.id, newPos);
        }
      }
    });

    return newState;
  }

  private calculateDistance(a: Position, b: Position): number {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  private getDirectionTowards(from: Position, to: Position): Position {
    const dx = to.x - from.x;
    const dy = to.y - from.y;

    return {
      x: dx === 0 ? 0 : dx > 0 ? 1 : -1,
      y: dy === 0 ? 0 : dy > 0 ? 1 : -1,
    };
  }

  private checkGameStatus(state: GameState): GameState {
    const playerUnits = state.units.filter((u) => u.team === 'player');
    const enemyUnits = state.units.filter((u) => u.team === 'enemy');

    if (playerUnits.length === 0) {
      return { ...state, status: 'defeat', phase: 'ended' };
    }

    if (enemyUnits.length === 0) {
      return { ...state, status: 'victory', phase: 'ended' };
    }

    return state;
  }
}
