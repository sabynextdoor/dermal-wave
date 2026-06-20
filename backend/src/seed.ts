import { PrismaClient } from '@prisma/client';
import { aiConsultants, dashboardStats } from './data/mockData';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed the database...');

  // Seed AI Consultants
  for (const c of aiConsultants) {
    await prisma.aIConsultant.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id,
        name: c.name,
        specialty: c.specialty,
        precision: c.precision,
        avatar: c.avatar,
        description: c.description,
      },
    });
  }

  // Seed Activities (from dashboardStats)
  for (const act of dashboardStats.activities) {
    await prisma.activity.create({
      data: {
        title: act.title,
        time: act.time,
        desc: act.desc,
        type: act.type,
      },
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
