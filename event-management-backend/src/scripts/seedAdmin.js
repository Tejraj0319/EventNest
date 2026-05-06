const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.user.create({
        data: {
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    console.log("Admin user created");
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });