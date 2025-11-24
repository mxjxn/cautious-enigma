# Frontend - Farcaster Tactical Game

Next.js frontend application for the Farcaster Tactical Game miniapp.

## Features

- Farcaster Frame SDK integration
- Pixel art game canvas with HTML5 Canvas API
- Real-time game state management
- Responsive UI with Tailwind CSS
- Turn-based action system

## Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_NEYNAR_CLIENT_ID=your_neynar_client_id
```

## Key Components

- **GameCanvas**: Main game rendering with canvas
- **GameUI**: Sidebar with unit info and controls
- **page.tsx**: Main game page with Farcaster SDK initialization

## Building

```bash
pnpm build
pnpm start
```
