# Foundry Contracts

Placeholder Foundry project for smart contracts. This will be expanded when on-chain features are implemented.

## Setup

Install Foundry:
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

Install dependencies:
```bash
forge install foundry-rs/forge-std
```

## Commands

Build contracts:
```bash
forge build
```

Run tests:
```bash
forge test
```

Deploy (local):
```bash
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast
```

## Future Features

- Unit NFTs
- In-game item tokens
- Match rewards
- Tournament contracts
- Leaderboard on-chain tracking
