'use client';

import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';
import GameBoard from '@/components/GameBoard';
import GameControls from '@/components/GameControls';

export default function Home() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const ctx = await sdk.context;
      setContext(ctx);
      sdk.actions.ready();
      setIsSDKLoaded(true);
    };
    load();
  }, []);

  if (!isSDKLoaded) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Tactical Commander...</h1>
          <div className="animate-pulse">Initializing game...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-900">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Tactical Commander
        </h1>
        <GameBoard />
        <GameControls />
      </div>
    </main>
  );
}
