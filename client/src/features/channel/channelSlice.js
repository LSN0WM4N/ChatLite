import { createSlice } from '@reduxjs/toolkit';
import { FetchChannels, FetchMessages, FetchReactions } from './channelThunk';
import { removeState, setState } from '../../utils/LocalFuncs';

const initialState = {
    channels: [],
    messages: {},
    reactions: [],
    fetchingChannels: false,
    fetchingMessages: false,
};

const channelSlice = createSlice({
    name: 'channel',
    initialState: initialState, // Hay un error al guardar los channels en el localStorage
    reducers: {
        addChannel(state, action) {
            state.channels.push(action.payload);
            setState("channels", state);
        },
        removeChannel(state, action) {
            state.channels = state.channels.filter(
                channel => channel.ID !== action.payload
            );
            setState("channels", state);
        },
        clearChannels(state) {
            state.channels = []
        },
        addMessage(state, action) {
            const { channelID, message } = action.payload;

            if (!state.messages[channelID]) 
                state.messages[channelID] = [];

            state.messages[channelID] = [...state.messages[channelID], message];
        },
        addReaction(state, action) {
            state.reactions.push(action.payload);
        }
    },

    extraReducers: (builder) => 
        builder
            .addCase(FetchChannels.fulfilled, (state, action) => {
                state.fetchingChannels = false
                state.channels = action.payload.map(c => ({...c, opened: 0}));
                setState("channels", state.channels);
            }) 
            .addCase(FetchChannels.rejected, (state) => {
                state.channels = [];
                state.fetchingChannels = false;
                removeState("channels");
            })
            .addCase(FetchChannels.pending, (state) => {
                state.fetchingChannels = true;
            })
            .addCase(FetchMessages.fulfilled, (state, action) => {
                state.fetchingMessages = false;

                if (!action.payload[0])
                    return;
                state.messages[action.payload[0].ChannelID] = action.payload;
            })
            .addCase(FetchMessages.rejected, (state) => {
                state.fetchingMessages = false;
                state.messages = {};
            })
            .addCase(FetchMessages.pending, (state) => {
                state.fetchingMessages = true;
            })
            .addCase(FetchReactions.fulfilled, (state, action) => {
                state.reactions = [...action.payload, ...state.reactions];
            })
});

export const {
    addChannel,
    removeChannel,
    clearChannels,
    addMessage,
    addReaction,
} = channelSlice.actions;

export default channelSlice.reducer;