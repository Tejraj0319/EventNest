const eventService = require("./event.service")

const createEvent = async (req, res) => {
    try {
        const event = await eventService.createEvent(req.body, req.user)
        res.status(201).json(event)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllEvents = async (req, res) => {
    try {
        const events = await eventService.getAllEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getEventBySlug = async (req, res) => {
    try {
        const event = await eventService.getEventBySlug(req.params.slug)
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateEvent = async (req, res) => {
    try {
        const event = await eventService.updateEvent(
            req.params.id,
            req.body,
            req.user
        );
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const result = await eventService.deleteEvent(
            req.params.id,
            req.user
        );
        res.status(204).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    createEvent,
    getAllEvents,
    getEventBySlug,
    updateEvent,
    deleteEvent
};