const cron = require("node-cron");
const prisma = require("../config/db");

cron.schedule("*/5 * * * *", async () => {
    console.log("Running expire bookings job...");

    const expiredBookings = await prisma.booking.findMany({
        where: {
            status: "PENDING",
            createdAt: {
                lt: new Date(Date.now() - 10 * 60 * 1000) // 10 mins
            }
        }
    });

    for (let booking of expiredBookings) {

        await prisma.$transaction(async (tx) => {

            await tx.booking.update({
                where: { id: booking.id },
                data: {
                    status: "CANCELLED"
                }
            });

        });

        console.log(`Booking expired: ${booking.id}`);
    }
});