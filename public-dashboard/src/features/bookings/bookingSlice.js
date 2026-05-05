import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBookingAPI,
  verifyPaymentAPI,
  getUserBookingsAPI,
  cancelBookingAPI,
} from "./bookingAPI";

// CREATE BOOKING
export const createBooking = createAsyncThunk(
  "booking/create",
  async (data, thunkAPI) => {
    try {
      return await createBookingAPI(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Booking failed"
      );
    }
  }
);

// VERIFY PAYMENT
export const verifyPayment = createAsyncThunk(
  "booking/verify",
  async (data, thunkAPI) => {
    try {
      return await verifyPaymentAPI(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Payment verification failed"
      );
    }
  }
);

// GET BOOKINGS
export const getUserBookings = createAsyncThunk(
  "booking/getUser",
  async (_, thunkAPI) => {
    try {
      return await getUserBookingsAPI();
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch bookings");
    }
  }
);

// CANCEL
export const cancelBooking = createAsyncThunk(
  "booking/cancel",
  async (id, thunkAPI) => {
    try {
      return await cancelBookingAPI(id);
    } catch (err) {
      return thunkAPI.rejectWithValue("Cancel failed");
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookings: [],
    currentBooking: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload.data;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.currentBooking = action.payload.data;
      })

      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.bookings = action.payload.data;
      });
  },
});

export default bookingSlice.reducer;