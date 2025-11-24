'use client';

import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';
import GameCanvas from '@/components/GameCanvas';
import GameUI from '@/components/GameUI';
import { GameState } from '@/types/game';

export default function Home() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<any>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        // Initialize Farcaster SDK
        const ctx = await sdk.context;
        setContext(ctx);
        sdk.actions.ready();
        setIsSDKLoaded(true);
      } catch (error) {
        console.error('Failed to load Farcaster SDK:', error);
      }
    };
    load();
  }, []);

  if (!isSDKLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Loading Farcaster Frame...</h1>
          <div className="animate-pulse">Please wait...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-900">
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800 p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">Tactical Strike</h1>
          {context && (
            <p className="text-sm text-gray-400">
              Player: {context.user?.displayName || 'Anonymous'}
            </p>
          )}
        </header>

        <div className="flex-1 flex">
          <div className="flex-1 flex items-center justify-center p-4">
            <GameCanvas gameState={gameState} setGameState={setGameState} />
          </div>

          <aside className="w-80 bg-gray-800 border-l border-gray-700 p-4">
            <GameUI gameState={gameState} setGameState={setGameState} />
          </aside>
        </div>
      </div>
    </main>
  );
}
