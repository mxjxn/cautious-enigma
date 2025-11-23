# Frontend App

Next.js application serving the Farcaster miniapp with tactical game interface.

## Structure

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main game page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── GameBoard.tsx    # Main game board with grid
│   └── GameControls.tsx # Control buttons
└── lib/                 # Utilities and logic
    ├── types.ts         # TypeScript types
    └── gameEngine.ts    # Game logic functions
```

## Key Components

### GameBoard
Renders the tactical grid, handles unit selection and movement visualization.

### GameControls
Provides buttons for game actions (end turn, new game).

### Game Engine
Core game logic including:
- Unit initialization
- Movement validation
- Attack calculations
- Distance calculations

## Running

Development:
```bash
npm run dev
```

Build:
```bash
npm run build
```

Production:
```bash
npm run start
```

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Farcaster Integration

The app uses @farcaster/frame-sdk to:
- Initialize the miniapp context
- Signal readiness to the Farcaster client
- Access user information
- Handle frame interactions

## Features

- Responsive grid-based game board
- Unit selection and highlighting
- Real-time game state updates
- Turn-based gameplay interface
- Pixel art style UI
