import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { fid: 1 },
    update: {},
    create: {
      fid: 1,
      username: 'player1',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { fid: 2 },
    update: {},
    create: {
      fid: 2,
      username: 'player2',
    },
  });

  console.log('Created users:', { user1, user2 });

  // Create a sample game
  const game = await prisma.game.create({
    data: {
      player1Id: user1.id,
      player2Id: user2.id,
      turn: 1,
      currentTeam: 'player',
      gridWidth: 10,
      gridHeight: 8,
      units: {
        create: [
          {
            name: 'Soldier 1',
            team: 'player',
            positionX: 1,
            positionY: 6,
            hp: 100,
            maxHp: 100,
            actionPoints: 2,
            maxActionPoints: 2,
            moveRange: 3,
            attackRange: 4,
            attackDamage: 25,
          },
          {
            name: 'Soldier 2',
            team: 'player',
            positionX: 3,
            positionY: 7,
            hp: 100,
            maxHp: 100,
            actionPoints: 2,
            maxActionPoints: 2,
            moveRange: 3,
            attackRange: 4,
            attackDamage: 25,
          },
          {
            name: 'Alien 1',
            team: 'enemy',
            positionX: 8,
            positionY: 1,
            hp: 80,
            maxHp: 80,
            actionPoints: 2,
            maxActionPoints: 2,
            moveRange: 3,
            attackRange: 4,
            attackDamage: 20,
          },
          {
            name: 'Alien 2',
            team: 'enemy',
            positionX: 6,
            positionY: 0,
            hp: 80,
            maxHp: 80,
            actionPoints: 2,
            maxActionPoints: 2,
            moveRange: 3,
            attackRange: 4,
            attackDamage: 20,
          },
        ],
      },
    },
  });

  console.log('Created sample game:', game);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
