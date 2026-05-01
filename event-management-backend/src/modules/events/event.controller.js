const eventService = require("./event.service")

// const createEvent = async (req, res) => {
//         const event = await eventService.createEvent(req.body, req.user)
//         res.status(201).json(event)
// }

const createEvent = async (req, res) => {
    const event = await eventService.createEvent(
        req.body,
        req.user,
        req.file
    )
    res.status(201).json(event);
}

const getAllEvents = async (req, res) => {
    const events = await eventService.getAllEvents();
    res.json(events);
};


const getEventBySlug = async (req, res) => {
    const event = await eventService.getEventBySlug(req.params.slug)
    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
}

const updateEvent = async (req, res) => {
    const event = await eventService.updateEvent(
        req.params.id,
        req.body,
        req.user
    );
    res.status(200).json(event);
};

const deleteEvent = async (req, res) => {
    const result = await eventService.deleteEvent(
        req.params.id,
        req.user
    );
    res.status(204).json(result);
};

const getMyEvents = async (req, res) => {
    const events = await eventService.getMyEvents(req.user);
    res.json(events);
}

module.exports = {
    createEvent,
    getAllEvents,
    getEventBySlug,
    updateEvent,
    deleteEvent,
    getMyEvents
};
