const express = require("express");
const router = express.Router();

const AdminController = require("./admin.controller");
const auth = require("../../middlewares/auth.middleware");
const authorizeRoles = require("../../middlewares/role.middleware");

router.use(auth, authorizeRoles("ADMIN"));

router.get("/stats", AdminController.getStats);

router.get("/users", AdminController.getUsers);
router.patch("/users/:id/role", AdminController.updateUserRole);
router.patch("/users/:id/block", AdminController.toggleBlockUser);

router.get("/events", AdminController.getEvents);
router.delete("/events/:id", AdminController.deleteEvent);

router.get("/bookings", AdminController.getBookings);

module.exports = router;