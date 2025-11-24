'use client';

export default function GameControls() {
  const handleEndTurn = () => {
    console.log('Ending turn...');
    // TODO: Implement end turn logic
  };

  const handleNewGame = () => {
    console.log('Starting new game...');
    // TODO: Implement new game logic
  };

  return (
    <div className="mt-4 flex gap-4">
      <button
        onClick={handleEndTurn}
        className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
      >
        End Turn
      </button>
      <button
        onClick={handleNewGame}
        className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
      >
        New Game
      </button>
    </div>
  );
}
