export interface Position {
  x: number;
  y: number;
}

export interface Unit {
  id: string;
  type: 'soldier' | 'sniper' | 'medic' | 'heavy';
  position: Position;
  health: number;
  maxHealth: number;
  actionPoints: number;
  maxActionPoints: number;
  team: 'player' | 'enemy';
  stats: {
    damage: number;
    range: number;
    accuracy: number;
    defense: number;
  };
}

export interface Tile {
  position: Position;
  type: 'floor' | 'wall' | 'cover' | 'objective';
  cover: 'none' | 'half' | 'full';
  occupied: boolean;
}

export interface GameState {
  id: string;
  playerFid: number;
  turn: number;
  phase: 'player' | 'enemy' | 'ended';
  units: Unit[];
  map: Tile[][];
  selectedUnit: string | null;
  availableMoves: Position[];
  availableTargets: string[];
  score: number;
  status: 'active' | 'victory' | 'defeat';
}

export interface GameAction {
  type: 'move' | 'attack' | 'ability' | 'end_turn';
  unitId: string;
  target?: Position | string;
  abilityId?: string;
}
