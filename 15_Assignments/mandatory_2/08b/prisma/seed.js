// prisma/seed.js

const { PrismaClient: SourcePrismaClient } = require("./generated/source");
const { PrismaClient: DestPrismaClient } = require("./generated/dest");
const { execSync } = require("child_process");

const sourcePrisma = new SourcePrismaClient();
const destPrisma = new DestPrismaClient();


async function migrateSchema() {
  console.log("Applying existing migrations...");
  execSync("npx prisma migrate dev --schema=./prisma/schema.prisma --name source_init");

  console.log("Migrating source database schema...");
  execSync(
    "npx prisma migrate dev --schema=./prisma/schema_dest.prisma --name dest_init"
  );

  console.log("migration completed");
}


async function dropTables() {
  console.log("Dropping tables...");
  await sourcePrisma.$executeRaw`DROP TABLE IF EXISTS users;`;
  await sourcePrisma.$executeRaw`DROP TABLE IF EXISTS _prisma_migrations;`;
  await destPrisma.$executeRaw`DROP TABLE IF EXISTS user_dest;`;
  await destPrisma.$executeRaw`DROP TABLE IF EXISTS _prisma_migrations;`;
}


async function seed() {
  await sourcePrisma.user.createMany({
    data: [
      {
        email: "testdata@example.com",
        password: "kodeord00",
      },
      {
        email: "tester@example.com",
        password: "123123",
      },
    ],
  });
  console.log("Source data seeded");
}

async function main() {
  await dropTables();
  await migrateSchema();
  await seed();
  const users = await sourcePrisma.user.findMany();

  for (const user of users) {
    await destPrisma.dest.create({
      data: {
        email: user.email,
        password: user.password,
      },
    });
  }

  console.log("Data migration completed");
}

main()
