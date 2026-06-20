"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const mockData_1 = require("./data/mockData");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Starting to seed the database...');
    // Seed AI Consultants
    for (const c of mockData_1.aiConsultants) {
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
    for (const act of mockData_1.dashboardStats.activities) {
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
