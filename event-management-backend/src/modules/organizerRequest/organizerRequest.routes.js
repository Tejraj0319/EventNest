const express = require("express");
const router = express.Router();
const controller = require("./organizerRequest.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");

// USER
router.post("/", authMiddleware, controller.createRequest);

// ADMIN
router.get("/", authMiddleware, roleMiddleware("ADMIN"), controller.getAllRequests);

router.patch("/:id/approve", authMiddleware, roleMiddleware("ADMIN"), controller.approveRequest);

router.patch("/:id/reject", authMiddleware, roleMiddleware("ADMIN"), controller.rejectRequest);

module.exports = router;