'use client';

import { useState, useEffect } from 'react';
import { GameState, Unit, Position } from '@/lib/types';
import { initializeGame } from '@/lib/gameEngine';

export default function GameBoard() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  useEffect(() => {
    // Initialize game state
    const initialState = initializeGame();
    setGameState(initialState);
  }, []);

  const handleCellClick = (x: number, y: number) => {
    if (!gameState) return;

    // Check if there's a unit at this position
    const unit = gameState.units.find((u) => u.position.x === x && u.position.y === y);

    if (unit && unit.team === gameState.currentTeam) {
      // Select friendly unit
      setSelectedUnit(unit);
    } else if (selectedUnit) {
      // Try to move or attack
      console.log(`Moving ${selectedUnit.name} to (${x}, ${y})`);
      // TODO: Implement move/attack logic
      setSelectedUnit(null);
    }
  };

  if (!gameState) {
    return <div className="text-white">Loading game...</div>;
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="mb-4 text-white">
        <div className="flex justify-between">
          <span>Turn: {gameState.turn}</span>
          <span>Current Team: {gameState.currentTeam}</span>
        </div>
      </div>
      <div
        className="grid gap-1 bg-gray-700 p-2 rounded"
        style={{
          gridTemplateColumns: `repeat(${gameState.gridSize.width}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: gameState.gridSize.height }).map((_, y) =>
          Array.from({ length: gameState.gridSize.width }).map((_, x) => {
            const unit = gameState.units.find((u) => u.position.x === x && u.position.y === y);
            const isSelected = selectedUnit?.position.x === x && selectedUnit?.position.y === y;

            return (
              <div
                key={`${x}-${y}`}
                onClick={() => handleCellClick(x, y)}
                className={`
                  aspect-square border border-gray-600 cursor-pointer
                  flex items-center justify-center text-2xl
                  hover:bg-gray-600 transition-colors
                  ${isSelected ? 'bg-blue-500' : 'bg-gray-800'}
                `}
              >
                {unit && (
                  <span style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.8))' }}>
                    {unit.team === 'player' ? '🔵' : '🔴'}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
      {selectedUnit && (
        <div className="mt-4 p-3 bg-gray-700 rounded text-white">
          <h3 className="font-bold">{selectedUnit.name}</h3>
          <div className="text-sm mt-1">
            <div>HP: {selectedUnit.hp}/{selectedUnit.maxHp}</div>
            <div>AP: {selectedUnit.actionPoints}/{selectedUnit.maxActionPoints}</div>
            <div>Position: ({selectedUnit.position.x}, {selectedUnit.position.y})</div>
          </div>
        </div>
      )}
    </div>
  );
}
