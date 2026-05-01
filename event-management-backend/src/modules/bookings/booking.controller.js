const sendTicketEmail = require("../../utils/sendEmail");
const BookingService = require("./booking.service")
const crypto = require("crypto");

const createBooking = async (req, res) => {
    const booking = await BookingService.createBooking(req.user.id, req.body)
    res.status(201).json({ success: true, data: booking });
}

const cancelBooking = async (req, res) => {
    const booking = await BookingService.cancelBooking(req.user.id, parseInt(req.params.id));
    res.status(200).json({ success: true, data: booking });
};

const getUserBookings = async (req, res) => {
    const bookings = await BookingService.getUserBookings(req.user.id);
    res.status(200).json({ success: true, data: bookings });
};

// getEventBookings used to get booking for that particular event, but only if the user is the organizer of that event
const getEventBookings = async (req, res) => {
    const bookings = await BookingService.getEventBookings(req.params.eventId, req.user.id);
    res.status(200).json({ success: true, data: bookings });
};

const verifyPayment = async (req, res) => {
    const bookings = await BookingService.verifyPayment(req.body)
    return res.status(200).json({ success: true, message: "Payment successful, booking confirmed", data: bookings })
}

const handleWebhook = async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers["x-razorpay-signature"];

    const rawBody = req.body.toString();

    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(rawBody)
        .digest("hex");

    if (signature !== expectedSignature) {
        return res.status(400).send("Invalid webhook signature");
    }

    // parse JSON AFTER verification
    const event = JSON.parse(rawBody);

    // Payment captured
    if (event.event === "payment.captured") {
        const payment = event.payload.payment.entity;

        await BookingService.verifyPayment({
            razorpay_order_id: payment.order_id,
            razorpay_payment_id: payment.id,
            razorpay_signature: signature // optional
        });
    }

    res.status(200).json({ received: true });
};

const getMyBookings = async (req, res) => {
    const bookings = await BookingService.getMyBookings(req.user.id);
    res.status(200).json({ success: true, data: bookings });
}

const refundBooking = async (req, res) => {
    const data = await BookingService.refundBooking(
        req.params.id,
        req.user.id
    );
    res.status(200).json({
        success: true,
        message: "Refund successful",
        data
    });
};

module.exports = {
    createBooking,
    cancelBooking,
    getUserBookings,
    getEventBookings,
    getMyBookings,
    verifyPayment,
    handleWebhook,
    refundBooking
};
