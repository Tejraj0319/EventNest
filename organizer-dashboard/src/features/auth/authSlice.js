import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginOrganizerAPI } from "./authAPI";


const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user || null,
    token: token || null,
    loading: false,
    error: null,
}

export const loginOrganizer = createAsyncThunk(
    "auth/loginOrganizer",
    async (loginData, thunkAPI) => {
        try {
            return await loginOrganizerAPI(loginData)
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login Failed"
            );
        }
    }
)


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginOrganizer.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginOrganizer.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.data.token;
                state.user = action.payload.data.user;
                localStorage.setItem("token", action.payload.data.token)
                localStorage.setItem("user", JSON.stringify(action.payload.data.user));
            })
            .addCase(loginOrganizer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;