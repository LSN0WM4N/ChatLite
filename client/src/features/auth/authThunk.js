import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/axios";
import { setError, setLoading, removeError, removeLoading } from "../ui/uiSlice";

export const loginAction = createAsyncThunk(
    'auth/login',
    async ({ credentials  }, { rejectWithValue, dispatch }) => {
        dispatch(setLoading()); 
        dispatch(removeError());
        try {
            const response = await api.post("/login", {
                username: credentials.username,
                password: credentials.password
            });

            return {
                ...response.data,
                photoURL: response.data.photoUrl,
            }; 
        } catch (error) {
            console.error("[-] Something went wrong", error.response.data.message);
            dispatch(setError(error.response?.data.message || error.message));
            return rejectWithValue(error.response?.data.message || error.message);
        } finally {
            dispatch(removeLoading());
        }
    }
);
