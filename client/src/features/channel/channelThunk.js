import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeLoading, setLoading } from "../ui/uiSlice";
import api from "../../api/axios";
import { decodeEmoji } from "../../utils/decoders";

export const FetchChannels = createAsyncThunk(
    "channel/fetchChannels", 
    async ({ UserID }, { rejectWithValue, dispatch }) => {
        dispatch(setLoading());
        try {
            const res = await api.get("/get-channel", { params: { UUID: UserID } });
            return res.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response?.data || error.message);
        } finally {
            dispatch(removeLoading());
        }
    }
);

export const FetchMessages = createAsyncThunk(
    "channel/fetchMessagesSince",
    async ({ UserID, ChannelID }, { rejectWithValue, dispatch }) => {
        dispatch(setLoading());

        try {
            const res = await api.get("/messages", {
                params: {
                    UserID,
                    ChannelID,
                }
            });
            
            const result = res.data.map(message => ({
                MessageID: message.ID,
                Username: message.Username,
                FromID: message.FromID,
                Content: message.Content,
                timestamp: message.timestamp,
                ChannelID: message.ChannelID,
            }));

            return result;
        } catch(error) {
            console.error('Channel fetching error =>', error);
            return rejectWithValue(error.response?.data || error.message);
        } finally {
            dispatch(removeLoading());
        }
    }
);

export const FetchReactions = createAsyncThunk(
    "channel/fetchReactions",
    async ({ ChannelID }, { rejectWithValue }) => {
        try {
            const res = await api.get('/reactions', {
                params: { ChannelID },
            });
            const result = res.data.map(reaction => ({
                messageID: reaction.MessageID,
                emoji: decodeEmoji(reaction.reaction)
            }));

            return result;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);