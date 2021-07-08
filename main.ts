import { PrismaClient } from "@prisma/client";

async function main() {
  const prisma = new PrismaClient({
    log: ["query"],
  });
  const source = { id: 1 };
  const users = await prisma.user.findUnique({
    where: { id: source.id },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  console.log(users);
  prisma.$disconnect();
}

main();
