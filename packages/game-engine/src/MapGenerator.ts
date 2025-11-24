import { Tile, TileType, CoverType } from './types';

export class MapGenerator {
  generateMap(width: number, height: number): Tile[][] {
    const map: Tile[][] = [];

    for (let y = 0; y < height; y++) {
      const row: Tile[] = [];
      for (let x = 0; x < width; x++) {
        row.push(this.generateTile(x, y, width, height));
      }
      map.push(row);
    }

    // Add some walls
    this.addWalls(map, width, height);

    // Add cover
    this.addCover(map, width, height);

    // Add objectives
    this.addObjectives(map, width, height);

    return map;
  }

  private generateTile(x: number, y: number, width: number, height: number): Tile {
    return {
      position: { x, y },
      type: 'floor',
      cover: 'none',
      occupied: false,
    };
  }

  private addWalls(map: Tile[][], width: number, height: number): void {
    // Add border walls
    for (let x = 0; x < width; x++) {
      map[0][x].type = 'wall';
      map[height - 1][x].type = 'wall';
    }
    for (let y = 0; y < height; y++) {
      map[y][0].type = 'wall';
      map[y][width - 1].type = 'wall';
    }

    // Add some interior walls
    const wallPatterns = [
      { x: 10, y: 5, width: 1, height: 5 },
      { x: 8, y: 9, width: 4, height: 1 },
    ];

    wallPatterns.forEach((pattern) => {
      for (let y = pattern.y; y < pattern.y + pattern.height; y++) {
        for (let x = pattern.x; x < pattern.x + pattern.width; x++) {
          if (x < width && y < height) {
            map[y][x].type = 'wall';
          }
        }
      }
    });
  }

  private addCover(map: Tile[][], width: number, height: number): void {
    const coverPositions = [
      { x: 5, y: 5, cover: 'half' as CoverType },
      { x: 5, y: 9, cover: 'half' as CoverType },
      { x: 14, y: 5, cover: 'half' as CoverType },
      { x: 14, y: 9, cover: 'full' as CoverType },
      { x: 10, y: 3, cover: 'full' as CoverType },
      { x: 10, y: 11, cover: 'half' as CoverType },
    ];

    coverPositions.forEach((pos) => {
      if (pos.x < width && pos.y < height && map[pos.y][pos.x].type === 'floor') {
        map[pos.y][pos.x].type = 'cover';
        map[pos.y][pos.x].cover = pos.cover;
      }
    });
  }

  private addObjectives(map: Tile[][], width: number, height: number): void {
    const objectivePos = { x: Math.floor(width / 2), y: Math.floor(height / 2) };

    if (map[objectivePos.y][objectivePos.x].type === 'floor') {
      map[objectivePos.y][objectivePos.x].type = 'objective';
    }
  }
}
