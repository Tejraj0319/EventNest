const express = require("express");
const router = express.Router();

const authRoutes = require("../modules/auth/auth.routes")
const eventRoutes = require("../modules/events/event.routes")

router.use("/auth", authRoutes)
router.use("/events", eventRoutes)

module.exports = router