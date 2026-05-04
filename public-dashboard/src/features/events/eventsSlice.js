import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEventsAPI, fetchEventByIdAPI } from "./eventsAPI";

// FETCH EVENTS
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, thunkAPI) => {
    try {
      return await fetchEventsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch events"
      );
    }
  }
);

export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (id, thunkAPI) => {
    try {
      return await fetchEventByIdAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch event"
      );
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    selectedEvent: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchEvents
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

      // fetchEventById
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default eventsSlice.reducer;