const express = require("express");
const router = express.Router();
const BookingController = require("./booking.controller");
const { createBookingSchema } = require("./booking.validator");

const validate = require("../../middlewares/validate.middleware");
const authMiddleware = require("../../middlewares/auth.middleware");


router.post("/", authMiddleware, validate(createBookingSchema), BookingController.createBooking)
router.post("/verify-payment", authMiddleware, BookingController.verifyPayment)
router.post("/webhook", BookingController.handleWebhook);

router.put("/cancel/:id", authMiddleware, BookingController.cancelBooking)

router.get("/", authMiddleware, BookingController.getUserBookings);
router.get("/:eventId", authMiddleware, BookingController.getEventBookings);

module.exports = router;
