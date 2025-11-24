export type Team = 'player' | 'enemy';

export interface Position {
  x: number;
  y: number;
}

export interface Unit {
  id: string;
  name: string;
  team: Team;
  position: Position;
  hp: number;
  maxHp: number;
  actionPoints: number;
  maxActionPoints: number;
  moveRange: number;
  attackRange: number;
  attackDamage: number;
}

export interface GameState {
  id: string;
  turn: number;
  currentTeam: Team;
  gridSize: {
    width: number;
    height: number;
  };
  units: Unit[];
  isGameOver: boolean;
  winner?: Team;
  createdAt: Date;
  updatedAt: Date;
}

export interface Player {
  id: string;
  fid: number;
  username: string;
  team?: Team;
}
