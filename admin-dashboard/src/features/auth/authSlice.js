import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAdminAPI } from "./authAPI"


const token = localStorage.getItem("token");

const initialState = {
    user: null,
    token: token || null,
    loading: false,
    error: null,
};

export const loginAdmin = createAsyncThunk(
    "auth/loginAdmin",
    async (loginData, thunkAPI) => {
        try {
            return await loginAdminAPI(loginData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login Failed"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
    },

    extraReducers: (builder) => {
        builder.
            addCase(loginAdmin.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.token = action.payload.data.token;
                localStorage.setItem("token", action.payload.data.token);
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;