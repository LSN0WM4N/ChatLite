import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'light',
    loading: false,
    error: null,
    showChannels: true
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setLoading(state) {
            state.loading = true
        },
        removeLoading(state) {
            state.loading = false
        },
        setError(state, action) {
            state.error = action.payload
        },
        removeError(state) {
            state.error = null
        },
        setShowChannels(state) {
            state.showChannels = true;
        },
        hideChannels(state) {
            state.showChannels = false;
        },
    },
});

export const {
    toggleTheme,
    setLoading,
    setError,
    removeLoading,
    removeError,
    setShowChannels,
    hideChannels,
} = uiSlice.actions;

export default uiSlice.reducer;