const prisma = require("../../config/db");
const razorpay = require("../../utils/razorpay");
const crypto = require("crypto");
const QRCode = require("qrcode");
const generateTicket = require("../../utils/generateTicket")
const sendTicketEmail = require("../../utils/sendEmail");


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

        //  Create Razorpay Order
        const order = await razorpay.orders.create({
            amount: event.price * quantity * 100,
            currency: "INR"
        })

        // const updated = await tx.event.updateMany({
        //     where: {
        //         id: eventId,
        //         availableSeats: { gte: quantity }
        //     },
        //     data: {
        //         availableSeats: { decrement: quantity }
        //     }
        // })
        // if (updated.count === 0) {
        //     throw new Error("Not enough seats available");
        // }

        const booking = await tx.booking.create({
            data: {
                userId,
                eventId,
                quantity,
                totalPrice: event.price * quantity,
                status: "PENDING",
                orderId: order.id
                // status: "CONFIRMED"
            }
        })
        return booking
    })
}


const cancelBooking = async (userId, bookingId) => {
    return await prisma.$transaction(async (tx) => {
        const booking = await tx.booking.findUnique({
            where: { id: bookingId }
        });

        if (!booking) {
            throw new Error("Booking not found");
        }

        if (booking.userId !== userId) {
            throw new Error("Unauthorized");
        }

        if (booking.status === "CANCELLED") {
            throw new Error("Booking already cancelled");
        }

        // 4. If already CONFIRMED → restore seats
        if (booking.status === "CONFIRMED") {
            await tx.event.update({
                where: { id: booking.eventId },
                data: {
                    availableSeats: {
                        increment: booking.quantity
                    }
                }
            });
        }

        const updatedBooking = await tx.booking.update({
            where: { id: bookingId },
            data: {
                status: "CANCELLED"
            }
        });
        return updatedBooking;
    });
};


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


const verifyPayment = async (data) => {
    if (!data) {
        throw new Error("Request body is missing");
    }

    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = data;

    // VERIFY SIGNATURE
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    //Keep this enabled in production
    // if (expectedSignature !== razorpay_signature) {
    //     throw new Error("Invalid payment signature");
    // }

    // STEP 2: TRANSACTION
    return await prisma.$transaction(async (tx) => {

        // 1. Find booking
        const booking = await tx.booking.findFirst({
            where: { orderId: razorpay_order_id }
        });

        console.log("Incoming orderId:", razorpay_order_id);

        if (!booking) throw new Error("Booking not found");

        // 2. Prevent duplicate processing
        if (booking.status === "CONFIRMED") {
            return booking;
        }

        // 3. Get event
        const event = await tx.event.findUnique({
            where: { id: booking.eventId }
        });

        if (!event) throw new Error("Event not found");

        // 4. Check seat availability again (safety)
        if (event.availableSeats < booking.quantity) {
            throw new Error("Seats sold out");
        }

        // 5. Deduct seats
        await tx.event.update({
            where: { id: booking.eventId },
            data: {
                availableSeats: {
                    decrement: booking.quantity
                }
            }
        });

        // 6. Generate QR Code
        const qrData = JSON.stringify({
            bookingId: booking.id,
            eventId: booking.eventId
        });

        const qrCode = await QRCode.toDataURL(qrData);

        // 7. Update booking → CONFIRMED
        const updatedBooking = await tx.booking.update({
            where: { id: booking.id },
            data: {
                status: "CONFIRMED",
                paymentId: razorpay_payment_id,
                qrCode: qrCode
            }
        });

        // 8. Get user details
        const user = await tx.user.findUnique({
            where: { id: booking.userId }
        });

        // 9. Generate PDF ticket
        const ticketPdf = await generateTicket(updatedBooking, user, event, qrCode);

        //DEBUG HERE
        console.log("Is Buffer:", Buffer.isBuffer(ticketPdf));
        console.log("Size:", ticketPdf.length);

        // 10. Send Email (outside DB but inside flow)
        setImmediate(async () => {
            try {
                console.log("Sending email to:", user.email);
                await sendTicketEmail(user.email, ticketPdf);
                console.log("Email sent");
            } catch (err) {
                console.error("Email failed: ", err);
            }
        });

        return updatedBooking;
    });
};


module.exports = {
    createBooking,
    cancelBooking,
    getUserBookings,
    getEventBookings,
    verifyPayment
};
