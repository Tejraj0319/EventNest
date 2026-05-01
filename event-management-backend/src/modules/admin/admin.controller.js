const AdminService = require("./admin.service");

// Stats
const getStats = async (req, res) => {
    const data = await AdminService.getStats();
    res.json({ success: true, data });
};

// Users
const getUsers = async (req, res) => {
    const data = await AdminService.getUsers();
    res.json({ success: true, data });
};

// Update Role
const updateUserRole = async (req, res) => {
    const { role } = req.body;
    const data = await AdminService.updateUserRole(req.params.id, role);
    res.json({ success: true, data });
};

// Block User
const toggleBlockUser = async (req, res) => {
    const { isBlocked } = req.body;
    const data = await AdminService.toggleBlockUser(req.params.id, isBlocked);
    res.json({ success: true, data });
};

// Events
const getEvents = async (req, res) => {
    const data = await AdminService.getEvents();
    res.json({ success: true, data });
};

// Delete Event
const deleteEvent = async (req, res) => {
    await AdminService.deleteEvent(req.params.id);
    res.json({ success: true, message: "Event deleted" });
};

// Bookings
const getBookings = async (req, res) => {
    const data = await AdminService.getBookings();
    res.json({ success: true, data });
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
