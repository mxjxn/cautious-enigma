'use client';

import { useEffect, useRef, useState } from 'react';
import { GameState, Position } from '@/types/game';

interface GameCanvasProps {
  gameState: GameState | null;
  setGameState: (state: GameState) => void;
}

const TILE_SIZE = 32;
const MAP_WIDTH = 20;
const MAP_HEIGHT = 15;

export default function GameCanvas({ gameState, setGameState }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredTile, setHoveredTile] = useState<Position | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for (let x = 0; x <= MAP_WIDTH; x++) {
      ctx.beginPath();
      ctx.moveTo(x * TILE_SIZE, 0);
      ctx.lineTo(x * TILE_SIZE, MAP_HEIGHT * TILE_SIZE);
      ctx.stroke();
    }
    for (let y = 0; y <= MAP_HEIGHT; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * TILE_SIZE);
      ctx.lineTo(MAP_WIDTH * TILE_SIZE, y * TILE_SIZE);
      ctx.stroke();
    }

    // Draw tiles
    if (gameState?.map) {
      gameState.map.forEach((row, y) => {
        row.forEach((tile, x) => {
          if (tile.type === 'wall') {
            ctx.fillStyle = '#4a5568';
            ctx.fillRect(x * TILE_SIZE + 1, y * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2);
          } else if (tile.type === 'cover') {
            ctx.fillStyle = '#2d3748';
            ctx.fillRect(x * TILE_SIZE + 1, y * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2);
            // Draw cover indicator
            ctx.fillStyle = '#718096';
            ctx.fillRect(
              x * TILE_SIZE + 8,
              y * TILE_SIZE + 8,
              TILE_SIZE - 16,
              TILE_SIZE - 16
            );
          } else if (tile.type === 'objective') {
            ctx.fillStyle = '#2d3748';
            ctx.fillRect(x * TILE_SIZE + 1, y * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2);
            // Draw objective marker
            ctx.fillStyle = '#ecc94b';
            ctx.beginPath();
            ctx.arc(x * TILE_SIZE + 16, y * TILE_SIZE + 16, 6, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      });
    }

    // Draw available moves
    if (gameState?.availableMoves) {
      ctx.fillStyle = 'rgba(66, 153, 225, 0.3)';
      gameState.availableMoves.forEach((pos) => {
        ctx.fillRect(pos.x * TILE_SIZE + 1, pos.y * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2);
      });
    }

    // Draw hovered tile
    if (hoveredTile) {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        hoveredTile.x * TILE_SIZE + 2,
        hoveredTile.y * TILE_SIZE + 2,
        TILE_SIZE - 4,
        TILE_SIZE - 4
      );
    }

    // Draw units
    if (gameState?.units) {
      gameState.units.forEach((unit) => {
        const x = unit.position.x * TILE_SIZE;
        const y = unit.position.y * TILE_SIZE;

        // Unit body
        ctx.fillStyle = unit.team === 'player' ? '#48bb78' : '#f56565';
        ctx.beginPath();
        ctx.arc(x + 16, y + 16, 10, 0, Math.PI * 2);
        ctx.fill();

        // Selected indicator
        if (gameState.selectedUnit === unit.id) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x + 16, y + 16, 12, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Health bar
        const healthPercent = unit.health / unit.maxHealth;
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(x + 4, y + 28, 24, 3);
        ctx.fillStyle = healthPercent > 0.5 ? '#48bb78' : healthPercent > 0.25 ? '#ecc94b' : '#f56565';
        ctx.fillRect(x + 4, y + 28, 24 * healthPercent, 3);
      });
    }
  }, [gameState, hoveredTile]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !gameState) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / TILE_SIZE);
    const y = Math.floor((e.clientY - rect.top) / TILE_SIZE);

    // Check if clicking on a unit
    const clickedUnit = gameState.units.find(
      (u) => u.position.x === x && u.position.y === y
    );

    if (clickedUnit && clickedUnit.team === 'player') {
      // Select unit
      setGameState({
        ...gameState,
        selectedUnit: clickedUnit.id,
        availableMoves: calculateAvailableMoves(clickedUnit, gameState),
      });
    } else if (gameState.selectedUnit) {
      // Try to move selected unit
      const canMove = gameState.availableMoves.some(
        (pos) => pos.x === x && pos.y === y
      );
      if (canMove) {
        moveUnit(gameState.selectedUnit, { x, y });
      }
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / TILE_SIZE);
    const y = Math.floor((e.clientY - rect.top) / TILE_SIZE);

    if (x >= 0 && x < MAP_WIDTH && y >= 0 && y < MAP_HEIGHT) {
      setHoveredTile({ x, y });
    } else {
      setHoveredTile(null);
    }
  };

  const calculateAvailableMoves = (unit: any, state: GameState): Position[] => {
    // Simple movement calculation - can be expanded
    const moves: Position[] = [];
    const range = unit.actionPoints;

    for (let dx = -range; dx <= range; dx++) {
      for (let dy = -range; dy <= range; dy++) {
        if (Math.abs(dx) + Math.abs(dy) <= range) {
          const newX = unit.position.x + dx;
          const newY = unit.position.y + dy;

          if (
            newX >= 0 &&
            newX < MAP_WIDTH &&
            newY >= 0 &&
            newY < MAP_HEIGHT &&
            !state.map[newY][newX].occupied
          ) {
            moves.push({ x: newX, y: newY });
          }
        }
      }
    }

    return moves;
  };

  const moveUnit = async (unitId: string, target: Position) => {
    try {
      const response = await fetch('/api/game/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId: gameState?.id,
          action: { type: 'move', unitId, target },
        }),
      });

      if (response.ok) {
        const updatedState = await response.json();
        setGameState(updatedState);
      }
    } catch (error) {
      console.error('Failed to move unit:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={MAP_WIDTH * TILE_SIZE}
        height={MAP_HEIGHT * TILE_SIZE}
        onClick={handleCanvasClick}
        onMouseMove={handleCanvasMouseMove}
        onMouseLeave={() => setHoveredTile(null)}
        className="border-2 border-gray-700 rounded cursor-pointer pixel-art"
      />
      <div className="mt-4 text-sm text-gray-400">
        Click units to select, click tiles to move
      </div>
    </div>
  );
}
