import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import adminReducer from '../features/admin/adminSlice'
import organizerReducer from '../features/organizer/organizerSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        organizer: organizerReducer,
    },
})