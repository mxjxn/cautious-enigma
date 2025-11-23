# Contributing to Farcaster Tactical Game

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see `.env.example` files)
4. Set up the database (see `apps/database/README.md`)
5. Start development: `npm run dev`

## Project Structure

This is a turborepo monorepo with the following structure:

- `apps/frontend` - Next.js frontend application
- `apps/backend` - Express API server
- `apps/database` - Prisma database schema
- `packages/contracts` - Foundry smart contracts

## Code Style

- We use Prettier for code formatting
- Run `npm run format` before committing
- TypeScript is required for all new code
- Follow existing patterns in the codebase

## Making Changes

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test your changes locally
4. Run linting: `npm run lint`
5. Commit with a descriptive message
6. Push and create a pull request

## Testing

- Write tests for new features
- Ensure existing tests pass
- Test manually in the browser

## Pull Request Process

1. Update documentation if needed
2. Ensure all tests pass
3. Get code review approval
4. Squash and merge

## Areas for Contribution

- Game mechanics improvements
- UI/UX enhancements
- New unit types
- Map variations
- AI opponent
- Smart contract features
- Bug fixes
- Documentation improvements

## Questions?

Open an issue for discussion or questions about contributing.
