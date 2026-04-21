const prisma = require("../../config/db");
// check event
// !event
// check date
// seat avaliable
// if not throw error
// update avaliable seats form event
// create booking
// return booking

const createBooking = async (userId, data) => {
    const { eventId, quantity } = data;
    return await prisma.$transaction(async (tx) => {
        const event = await tx.event.findUnique({
            where: { id: eventId }
        })
        if (!event) {
            throw new Error("Event not found")
        }

        if (new Date(event.date) < new Date()) {
            throw new Error("Event already finished");
        }

        if (event.availableSeats < quantity) {
            throw new Error("Not enough seats available");
        }

        const updated = await tx.event.updateMany({
            where: {
                id: eventId,
                availableSeats: { gte: quantity }
            },
            data: {
                availableSeats: { decrement: quantity }
            }
        })

        if (updated.count === 0) {
            throw new Error("Not enough seats available");
        }

        const booking = await tx.booking.create({
            data: {
                userId,
                eventId,
                quantity,
                totalPrice: event.price * quantity,
                status: "CONFIRMED"
            }
        })
        return booking
    })
}


const cancelBooking = async (userId, bookingId) => {
    return await prisma.$transaction(async (tx) => {
        // find booking
        const booking = await tx.booking.findUnique({
            where: { id: bookingId }
        })
        if (!booking) {
            throw new Error("Booking not found");
        }
        // 2. Ownership check
        if (booking.userId !== userId) {
            throw new Error("Unauthorized");
        }
        // 3. Prevent double cancel
        if (booking.status === "CANCELLED") {
            throw new Error("Booking already cancelled");
        }
        // 4. Restore seats
        await tx.event.update({
            where: {
                id: booking.eventId
            },
            data: {
                availableSeats: {
                    increment: booking.quantity
                }
            }
        })
        // 5. Update booking status
        const updatedBooking = await tx.booking.update({
            where: { id: bookingId },
            data: {
                status: "CANCELLED"
            }
        })
        return updatedBooking;
    })
}


const getUserBookings = async (userId) => {
    return await prisma.booking.findMany({
        where: { userId },
        include: {
            event: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
};


// Organizer Only
const getEventBookings = async (eventId, userId) => {
  eventId = parseInt(eventId);
  const event = await prisma.event.findUnique({
    where: { id: eventId }
  });
  if (!event) throw new Error("Event not found");
  if (event.organizerId !== userId) {
    throw new Error("Unauthorized");
  }
  return await prisma.booking.findMany({
    where: { eventId },
    include: {
      user: {
        select: {
          id: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

module.exports = {
    createBooking,
    cancelBooking,
    getUserBookings,
    getEventBookings
};
