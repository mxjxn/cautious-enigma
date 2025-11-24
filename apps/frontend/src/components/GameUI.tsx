'use client';

import { GameState } from '@/types/game';

interface GameUIProps {
  gameState: GameState | null;
  setGameState: (state: GameState) => void;
}

export default function GameUI({ gameState, setGameState }: GameUIProps) {
  const selectedUnit = gameState?.units.find((u) => u.id === gameState.selectedUnit);

  const handleEndTurn = async () => {
    if (!gameState) return;

    try {
      const response = await fetch('/api/game/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId: gameState.id,
          action: { type: 'end_turn' },
        }),
      });

      if (response.ok) {
        const updatedState = await response.json();
        setGameState(updatedState);
      }
    } catch (error) {
      console.error('Failed to end turn:', error);
    }
  };

  const handleNewGame = async () => {
    try {
      const response = await fetch('/api/game/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const newState = await response.json();
        setGameState(newState);
      }
    } catch (error) {
      console.error('Failed to create new game:', error);
    }
  };

  if (!gameState) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-white">Welcome!</h2>
        <p className="text-gray-400">Start a new tactical mission</p>
        <button
          onClick={handleNewGame}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          New Game
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 text-white">
      <div className="bg-gray-700 p-4 rounded">
        <h2 className="text-lg font-bold mb-2">Mission Status</h2>
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-400">Turn:</span>
            <span>{gameState.turn}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Phase:</span>
            <span className="capitalize">{gameState.phase}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Score:</span>
            <span>{gameState.score}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Status:</span>
            <span
              className={`capitalize ${
                gameState.status === 'victory'
                  ? 'text-green-400'
                  : gameState.status === 'defeat'
                  ? 'text-red-400'
                  : 'text-blue-400'
              }`}
            >
              {gameState.status}
            </span>
          </div>
        </div>
      </div>

      {selectedUnit && (
        <div className="bg-gray-700 p-4 rounded">
          <h2 className="text-lg font-bold mb-2">Selected Unit</h2>
          <div className="space-y-2">
            <div>
              <div className="text-sm text-gray-400 capitalize">{selectedUnit.type}</div>
              <div className="text-xs text-gray-500">Team: {selectedUnit.team}</div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Health</span>
                <span>
                  {selectedUnit.health}/{selectedUnit.maxHealth}
                </span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${(selectedUnit.health / selectedUnit.maxHealth) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Action Points</span>
                <span>
                  {selectedUnit.actionPoints}/{selectedUnit.maxActionPoints}
                </span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${(selectedUnit.actionPoints / selectedUnit.maxActionPoints) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mt-3">
              <div className="bg-gray-600 p-2 rounded">
                <div className="text-gray-400">Damage</div>
                <div className="font-bold">{selectedUnit.stats.damage}</div>
              </div>
              <div className="bg-gray-600 p-2 rounded">
                <div className="text-gray-400">Range</div>
                <div className="font-bold">{selectedUnit.stats.range}</div>
              </div>
              <div className="bg-gray-600 p-2 rounded">
                <div className="text-gray-400">Accuracy</div>
                <div className="font-bold">{selectedUnit.stats.accuracy}%</div>
              </div>
              <div className="bg-gray-600 p-2 rounded">
                <div className="text-gray-400">Defense</div>
                <div className="font-bold">{selectedUnit.stats.defense}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-700 p-4 rounded">
        <h2 className="text-lg font-bold mb-2">Your Forces</h2>
        <div className="space-y-2">
          {gameState.units
            .filter((u) => u.team === 'player')
            .map((unit) => (
              <div
                key={unit.id}
                className={`p-2 rounded cursor-pointer ${
                  gameState.selectedUnit === unit.id ? 'bg-blue-600' : 'bg-gray-600'
                } hover:bg-blue-500 transition-colors`}
                onClick={() =>
                  setGameState({
                    ...gameState,
                    selectedUnit: unit.id,
                    availableMoves: [],
                  })
                }
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm capitalize">{unit.type}</span>
                  <span className="text-xs">
                    HP: {unit.health}/{unit.maxHealth}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={handleEndTurn}
          disabled={gameState.phase !== 'player' || gameState.status !== 'active'}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded transition-colors"
        >
          End Turn
        </button>

        <button
          onClick={handleNewGame}
          className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          New Game
        </button>
      </div>
    </div>
  );
}
