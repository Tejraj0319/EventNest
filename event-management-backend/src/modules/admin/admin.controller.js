const AdminService = require("./admin.service");

// Stats
const getStats = async (req, res) => {
    try {
        const data = await AdminService.getStats();
        res.json({ success: true, data });
    } catch (err) {
        console.log(err);
    }
};

// Users
const getUsers = async (req, res) => {
    try {
        const data = await AdminService.getUsers();
        res.json({ success: true, data });
    } catch (err) {
        console.log(err);
    }
};

// Update Role
const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        const data = await AdminService.updateUserRole(req.params.id, role);
        res.json({ success: true, data });
    } catch (err) {
        console.log(err);
    }
};

// Block User
const toggleBlockUser = async (req, res) => {
    try {
        const { isBlocked } = req.body;
        const data = await AdminService.toggleBlockUser(req.params.id, isBlocked);
        res.json({ success: true, data });
    } catch (err) {
        console.log(err);
    }
};

// Events
const getEvents = async (req, res) => {
    try {
        const data = await AdminService.getEvents();
        res.json({ success: true, data });
    } catch (err) {
        console.log(err);
    }
};

// Delete Event
const deleteEvent = async (req, res) => {
    try {
        await AdminService.deleteEvent(req.params.id);
        res.json({ success: true, message: "Event deleted" });
    } catch (err) {
        console.log(err);
    }
};

// Bookings
const getBookings = async (req, res) => {
    try {
        const data = await AdminService.getBookings();
        res.json({ success: true, data });
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getStats,
    getUsers,
    updateUserRole,
    toggleBlockUser,
    getEvents,
    deleteEvent,
    getBookings,
};