const sendTicketEmail = require("../../utils/sendEmail");
const BookingService = require("./booking.service")
const crypto = require("crypto");

const createBooking = async (req, res) => {
    try {
        const booking = await BookingService.createBooking(req.user.id, req.body)
        res.status(201).json({ success: true, data: booking });
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error.message });
    }
}

const cancelBooking = async (req, res) => {
    try {
        const booking = await BookingService.cancelBooking(req.user.id, parseInt(req.params.id));
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getUserBookings = async (req, res) => {
    try {
        const bookings = await BookingService.getUserBookings(req.user.id);
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getEventBookings = async (req, res) => {
    try {
        const bookings = await BookingService.getEventBookings(req.params.eventId, req.user.id);
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const bookings = await BookingService.verifyPayment(req.body)
        return res.status(200).json({ success: true, message: "Payment successful, booking confirmed", data: bookings })
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
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

module.exports = {
    createBooking,
    cancelBooking,
    getUserBookings,
    getEventBookings,
    verifyPayment,
    handleWebhook
};
