import API from "../../api/axios";

// CREATE BOOKING (PENDING)
export const createBookingAPI = async (data) => {
  const res = await API.post("/bookings", data);
  return res.data;
};

// VERIFY PAYMENT
export const verifyPaymentAPI = async (data) => {
  const res = await API.post("/bookings/verify-payment", data);
  return res.data;
};

// GET USER BOOKINGS
export const getUserBookingsAPI = async () => {
  const res = await API.get("/bookings");
  return res.data;
};

// CANCEL BOOKING
export const cancelBookingAPI = async (id) => {
  const res = await API.put(`/bookings/cancel/${id}`);
  return res.data;
};