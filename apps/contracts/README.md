# Farcaster Tactical Game - Smart Contracts

This directory contains the smart contracts for the Farcaster Tactical Game. The contracts are built using Foundry.

## Contracts (Placeholder)

- **GameNFT.sol**: NFT contract for achievements and in-game items
- **GameRewards.sol**: Reward distribution and token management

## Setup

1. Install Foundry:
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

2. Install dependencies:
```bash
forge install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your values
```

## Development

```bash
# Build contracts
forge build

# Run tests
forge test

# Run tests with gas reporting
forge test --gas-report

# Deploy to testnet
forge script script/Deploy.s.sol:DeployScript --rpc-url $SEPOLIA_RPC_URL --broadcast
```

## TODO

These contracts are placeholders and need to be fully implemented:

- [ ] Implement NFT minting logic with proper ERC-721 compliance
- [ ] Add metadata URI handling
- [ ] Implement reward token economics
- [ ] Add tournament and leaderboard contracts
- [ ] Implement staking mechanisms
- [ ] Add access control and governance
- [ ] Write comprehensive tests
- [ ] Add deployment scripts for all networks
- [ ] Set up CI/CD for contract deployment
