const express = require("express");
const router = express.Router();

const controller = require("./event.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");
const validate = require("../../middlewares/validate.middleware")
const { createEventSchema, updateEventSchema } = require("./event.validator");
const upload = require("../../middlewares/upload.middleware")

router.get("/", controller.getAllEvents)

router.get("/my-events", authMiddleware, roleMiddleware("ORGANIZER"), controller.getMyEvents);

router.get("/:slug", controller.getEventBySlug)

router.post("/", authMiddleware, roleMiddleware("ORGANIZER"), upload.single("image"), controller.createEvent)

router.put("/:id", authMiddleware, roleMiddleware("ORGANIZER"), validate(updateEventSchema), controller.updateEvent);

router.delete("/:id", authMiddleware, roleMiddleware("ORGANIZER"), controller.deleteEvent);

module.exports = router;
