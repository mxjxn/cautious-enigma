export interface Position {
  x: number;
  y: number;
}

export interface UnitStats {
  damage: number;
  range: number;
  accuracy: number;
  defense: number;
}

export type UnitType = 'soldier' | 'sniper' | 'medic' | 'heavy';
export type Team = 'player' | 'enemy';
export type TileType = 'floor' | 'wall' | 'cover' | 'objective';
export type CoverType = 'none' | 'half' | 'full';

export interface Unit {
  id: string;
  type: UnitType;
  position: Position;
  health: number;
  maxHealth: number;
  actionPoints: number;
  maxActionPoints: number;
  team: Team;
  stats: UnitStats;
}

export interface Tile {
  position: Position;
  type: TileType;
  cover: CoverType;
  occupied: boolean;
}

export type GamePhase = 'player' | 'enemy' | 'ended';
export type GameStatus = 'active' | 'victory' | 'defeat';

export interface GameState {
  id: string;
  playerFid: number;
  turn: number;
  phase: GamePhase;
  units: Unit[];
  map: Tile[][];
  selectedUnit: string | null;
  availableMoves: Position[];
  availableTargets: string[];
  score: number;
  status: GameStatus;
}

export type GameActionType = 'move' | 'attack' | 'ability' | 'end_turn';

export interface GameAction {
  type: GameActionType;
  unitId?: string;
  target?: Position | string;
  abilityId?: string;
}
