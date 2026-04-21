const BookingService = require("./booking.service")

const createBooking = async (req, res) => {
    try {
        const booking = await BookingService.createBooking(req.user.id, req.body)
        res.status(201).json({ success: true, data: booking });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const cancelBooking = async (req, res) => {
    try {
        const booking = await BookingService.cancelBooking(req.user.id, parseInt(req.params.id));

        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getUserBookings = async (req, res) => {
    try {
        const bookings = await BookingService.getUserBookings(req.user.id);
        res.status(200).json({ success: true, data: bookings });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getEventBookings = async (req, res) => {
  try {
    const bookings = await BookingService.getEventBookings(
      req.params.eventId,
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
    createBooking,
    cancelBooking,
    getUserBookings,
    getEventBookings
};
