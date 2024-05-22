// prisma/seed.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: "alice@gmail.com",
        password: "password123",
      },
      {
        email: "bob@gmail.com",
        password: "Bob",
      },
      {
        email: "tester@gmail.com",
        password: "test",
      },
    ],
  });

  console.log("Seed data created");
}

main()
