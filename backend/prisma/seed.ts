import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const consultantsData = [
  {
    name: "Dr. AI Dermatologist",
    specialty: "General Dermatology & Psoriasis",
    precision: 99.5,
    avatar: "/avatars/doc-1.jpg",
    description: "Expert in general skin health, acne, psoriasis, and common rashes. Dr. AI Dermatologist provides comprehensive assessments and tailored advice."
  }
];

async function main() {
  console.log('Seeding AIConsultants...');
  
  // Clear existing consultants to avoid duplicates if run multiple times
  await prisma.aIConsultant.deleteMany({});
  
  for (const consultant of consultantsData) {
    const created = await prisma.aIConsultant.create({
      data: consultant,
    });
    console.log(`Created consultant: ${created.name}`);
  }
  
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
