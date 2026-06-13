import { prisma } from "./src/lib/prisma.js";

async function test() {
  try {
    const users = await prisma.user.findMany();

    console.log("Funcionou:");
    console.log(users);
  } catch (err) {
    console.error("Erro:");
    console.error(err);
  } finally {
    process.exit();
  }
}

test();