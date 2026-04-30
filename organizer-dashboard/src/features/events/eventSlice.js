import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchEventsAPI,
    createEventAPI,
    deleteEventAPI,
    updateEventAPI,
    fetchMyEventsAPI
} from "./eventAPI";

export const fetchEvents = createAsyncThunk(
    "events/fetchEvents",
    async (_, thunkAPI) => {
        try {
            const res = await fetchEventsAPI();
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const createEvent = createAsyncThunk(
    "events/createEvent",
    async (data, thunkAPI) => {
        try {
            const res = await createEventAPI(data);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteEvent = createAsyncThunk(
    "events/deleteEvent",
    async (id, thunkAPI) => {
        try {
            await deleteEventAPI(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

export const updateEvent = createAsyncThunk(
    "events/updateEvent",
    async ({ id, data }, thunkAPI) => {
        try {
            const res = await updateEventAPI(id, data);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message);
        }
    }
);

export const fetchMyEvents = createAsyncThunk(
    "events/fetchMyEvents",
    async (_, thunkAPI) => {
        try {
            const res = await fetchMyEventsAPI();
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message);
        }
    }
);

const initialState = {
    events: [],
    loading: false,
    error: null,
}

const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // fetchMyEvents
            .addCase(fetchMyEvents.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMyEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(fetchMyEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create
            .addCase(createEvent.fulfilled, (state, action) => {
                state.events.push(action.payload);
            })

            // Delete
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.events = state.events.filter(
                    (event) => event.id !== action.payload
                );
            })

            // update
            .addCase(updateEvent.fulfilled, (state, action) => {
                state.events = state.events.map((event) =>
                    event.id === action.payload.id ? action.payload : event
                );
            })
    },
});

export default eventSlice.reducer;

