import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice"
import eventsReducer from "../features/events/eventsSlice"
import organizerReducer from '../features/organizer/organizerSlice'
import bookingReducer from '../features/bookings/bookingSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        events: eventsReducer,
        organizer: organizerReducer,
        booking: bookingReducer
    }
})