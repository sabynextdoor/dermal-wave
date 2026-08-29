import { PrismaClient } from '@prisma/client';
import { aiConsultants, dashboardStats } from '../src/data/mockData';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding AI Consultants...');

  // Clear existing consultants to avoid duplicates if run multiple times
  await prisma.aIConsultant.deleteMany({});

  for (const c of aiConsultants) {
    await prisma.aIConsultant.create({
      data: {
        name: c.name,
        specialty: c.specialty,
        precision: c.precision,
        avatar: c.avatar,
        description: c.description,
      },
    });
    console.log(`Created consultant: ${c.name}`);
  }

  // Create (or update) the seed user so dashboard activities have a valid owner
  const user = await prisma.user.upsert({
    where: { email: 'seed@example.com' },
    update: {},
    create: {
      name: 'Seed User',
      email: 'seed@example.com',
    },
  });

  // Seed demo activities from dashboardStats
  await prisma.activity.createMany({
    data: dashboardStats.activities.map((act) => ({
      userId: user.id,
      title: act.title,
      time: act.time,
      desc: act.desc,
      type: act.type,
    })),
    skipDuplicates: true,
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
