const express = require("express");
const router = express.Router();
const BookingController = require("./booking.controller");
const { createBookingSchema } = require("./booking.validator");

const validate = require("../../middlewares/validate.middleware");
const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");


router.post("/", authMiddleware, validate(createBookingSchema), BookingController.createBooking)
router.post("/verify-payment", authMiddleware, BookingController.verifyPayment)
router.post("/webhook", BookingController.handleWebhook);

router.put("/cancel/:id", authMiddleware, BookingController.cancelBooking)

// getUserBookings used to get all bookings of the user
router.get("/", authMiddleware, BookingController.getUserBookings);

router.get("/my-bookings", authMiddleware, roleMiddleware("ORGANIZER"), BookingController.getMyBookings)


router.post("/refund/:id", authMiddleware, roleMiddleware("ORGANIZER"), BookingController.refundBooking);

// getEventBookings used to get booking for that particular event,only if the user is the organizer of that event
router.get("/:eventId", authMiddleware, BookingController.getEventBookings);


module.exports = router;
