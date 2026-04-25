import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchStatsAPI, fetchUsersAPI, fetchEventsAPI, fetchBookingsAPI } from "./adminAPI"

const initialState = {
    stats: {},
    users: [],
    events: [],
    bookings: [],
    loading: false,
    error: null
}

export const fetchStats = createAsyncThunk(
    "admin/fetchStats",
    async () => await fetchStatsAPI()
)
export const fetchEvents = createAsyncThunk(
    "admin/fetchEvents",
    async () => await fetchEventsAPI()
)
export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers ",
    async () => await fetchUsersAPI()
)
export const fetchBookings = createAsyncThunk(
    "admin/fetchBookings",
    async () => await fetchBookingsAPI()
);

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // stats
            .addCase(fetchStats.pending, (state, action) => {
                state.loading = true
            })
            
            .addCase(fetchStats.fulfilled, (state, action) => {
                state.loading = false,
                    state.stats = action.payload.data
            })

            // users
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload.data
            })

            // events
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.events = action.payload.data
            })

            // bookings
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.bookings = action.payload.data
            })

            .addCase(fetchStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
})

export default adminSlice.reducer;