import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMyBookingsAPI, refundBookingAPI } from "./bookingAPI";
import { toast } from "react-toastify";

const initialState = {
    bookings: [],
    loading: false,
    refundLoadingId: null
};

export const fetchMyBookings = createAsyncThunk(
    "bookings/fetchMyBookings",
    async (_, thunkAPI) => {
        try {
            const data = await fetchMyBookingsAPI();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const refundBooking = createAsyncThunk(
    "bookings/refundBooking",
    async (id, thunkAPI) => {
        try {
            await refundBookingAPI(id);

            thunkAPI.dispatch(fetchMyBookings());

            return id;
        } catch (error) {
            console.log(error.response.data);
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyBookings.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchMyBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })


            .addCase(refundBooking.pending, (state, action) => {
                state.refundLoadingId = action.meta.arg; // clicked row id
            })

            .addCase(refundBooking.fulfilled, (state, action) => {
                state.refundLoadingId = null;
                toast.success("Refund successful");
            })
            .addCase(refundBooking.rejected, (state, action) => {
                state.refundLoadingId = null;
                toast.error(action.payload || "Refund failed");
            });
    }
})

export default bookingSlice.reducer;
