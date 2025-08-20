import { createSlice } from "@reduxjs/toolkit";
import { loginAction } from "./authThunk";
import { loadState, removeState, setState } from "../../utils/LocalFuncs";

const authSlice = createSlice({
    name: "auth",
    initialState: loadState('auth') || {
        UUID: null,
        username: null,
        photoURL: null,
        isAuthenticated: false,
    },     

    reducers: {
        logout: (state) => {
            state.UUID = null;
            state.username = null;
            state.photoURL = null;
            state.isAuthenticated = false;

            removeState('auth');
        },

        updatePhoto: (state, action) => {
            state.photoURL = action.payload;
            setState("auth", state);
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginAction.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.UUID = action.payload.ID;
                state.username = action.payload.Username;
                state.photoURL = action.payload.photoURL || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";

                setState("auth", state);
            })
            .addCase(loginAction.rejected, (state) => {
                state.isAuthenticated = false;
                state.UUID = null;
                state.username = null;
                state.photoURL = null;
            });
    }
});

export const { logout, updatePhoto } = authSlice.actions;
export default authSlice.reducer;