import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    createOrganizerRequestAPI,
    getAllRequestsAPI,
    approveRequestAPI,
    rejectRequestAPI,
} from "./organizerApi";

// USER
export const createRequest = createAsyncThunk(
    "organizer/create",
    async (data, thunkAPI) => {
        try {
            const res = await createOrganizerRequestAPI(data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

// ADMIN
export const getAllRequests = createAsyncThunk(
    "organizer/getAll",
    async (_, thunkAPI) => {
        try {
            const res = await getAllRequestsAPI();
            return res.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

export const approveRequest = createAsyncThunk(
    "organizer/approve",
    async (id, thunkAPI) => {
        try {
            await approveRequestAPI(id);
            return id;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

export const rejectRequest = createAsyncThunk(
    "organizer/reject",
    async (id, thunkAPI) => {
        try {
            await rejectRequestAPI(id);
            return id;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message);
        }
    }
);

const slice = createSlice({
    name: "organizer",
    initialState: {
        requests: [],
        loading: false,
        error: null,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // CREATE
            .addCase(createRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(createRequest.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // GET ALL
            .addCase(getAllRequests.fulfilled, (state, action) => {
                state.requests = action.payload;
            })

            // APPROVE
            .addCase(approveRequest.fulfilled, (state, action) => {
                state.requests = state.requests.filter(
                    (r) => r.id !== action.payload
                );
            })

            // REJECT
            .addCase(rejectRequest.fulfilled, (state, action) => {
                state.requests = state.requests.filter(
                    (r) => r.id !== action.payload
                );
            });
    },
});

export default slice.reducer;