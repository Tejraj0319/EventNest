const express = require("express");
const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes")
const eventRoutes = require("../modules/events/event.routes")
const bookingRoutes = require("../modules/bookings/booking.routes")
const adminRoutes = require("../modules/admin/admin.routes")

router.use("/auth", authRoutes)
router.use("/events", eventRoutes)
router.use("/bookings", bookingRoutes)
router.use("/admin", adminRoutes)

module.exports = router