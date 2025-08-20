import { describe, it, expect } from "vitest";

import reducer, {
    addChannel,
    removeChannel,
    clearChannels,
    addMessage,
    addReaction,
} from './channelSlice';

describe("ChannelSlice", () => {
    const initialState = {
        channels: [],
        messages: {},
        reactions: [],
        fetchingChannels: false,
        fetchingMessages: false,
    };

    it("should return the initial state when passed an empty action", () => {
        expect(reducer(undefined, { type: "" })).toEqual(initialState);
    });

    it("should add a new channel to the state", () => {
        const newChannel = {
            ID: "143376fe-7a55-4b19-81c6-5ad44ad3bd87",     
            Title: "TestingChannel",        
            Description: "Channel destinated to DEV TEST ",     
            PhotoURL: "192.168.28.179:3000/uploads/1755602262583.jpg",      
            CreatorID: "8bbcbe1f-bdc0-41c5-9d02-0c6776b37272",      
            opened: 0,     
        }

        const expectedChannels = [newChannel];

        expect(reducer(initialState, addChannel(newChannel))).toStrictEqual({
            ...initialState, 
            "channels": expectedChannels
        });
    });

    it("should remove a channel", () => {
        const testInitialState= {
            ...initialState,
            "channels": [
                {
                    ID: "143376fe-7a55-4b19-81c6-5ad44ad3bd87",
                    Title: "TestingChannel",
                    Description: "Channel destinated to DEV TEST ",
                    PhotoURL: "192.168.28.179:3000/uploads/1755602262583.jpg",
                    CreatorID: "8bbcbe1f-bdc0-41c5-9d02-0c6776b37272",
                    opened: 0,
                }, {
                    ID: "465737ec-1950-48e1-8457-c9e503fda33e",
                    Title: "Lolo",
                    Description: "Yo",
                    PhotoURL: null,
                    CreatorID: "48b8ea1f-b7dd-4674-b7a7-63bea2d9605d",
                    opened: 0,
                }, {
                    ID: "9e9ccdbe-98a9-4ead-8f25-9c1219fc2ea8",
                    Title: "Otro channel",
                    Description: "Como?",
                    PhotoURL: null,
                    CreatorID: "8bbcbe1f-bdc0-41c5-9d02-0c6776b37272",
                    opened: 0,
                }
            ]
        };

        const expectedChannel = [
            {
                ID: "143376fe-7a55-4b19-81c6-5ad44ad3bd87",
                Title: "TestingChannel",
                Description: "Channel destinated to DEV TEST ",
                PhotoURL: "192.168.28.179:3000/uploads/1755602262583.jpg",
                CreatorID: "8bbcbe1f-bdc0-41c5-9d02-0c6776b37272",
                opened: 0,
            }, {
                ID: "9e9ccdbe-98a9-4ead-8f25-9c1219fc2ea8",
                Title: "Otro channel",
                Description: "Como?",
                PhotoURL: null,
                CreatorID: "8bbcbe1f-bdc0-41c5-9d02-0c6776b37272",
                opened: 0,
            }
        ];

        expect(reducer(testInitialState, removeChannel("465737ec-1950-48e1-8457-c9e503fda33e"))).toStrictEqual({
            ...initialState,
            "channels": expectedChannel
        })
    });

    it("should clear channels in the state", () => {
        const testInitialState= {
            ...initialState,
            "channels": [
                {
                    ID: "143376fe-7a55-4b19-81c6-5ad44ad3bd87",
                    Title: "TestingChannel",
                    Description: "Channel destinated to DEV TEST ",
                    PhotoURL: "192.168.28.179:3000/uploads/1755602262583.jpg",
                    CreatorID: "8bbcbe1f-bdc0-41c5-9d02-0c6776b37272",
                    opened: 0,
                }, {
                    ID: "465737ec-1950-48e1-8457-c9e503fda33e",
                    Title: "Lolo",
                    Description: "Yo",
                    PhotoURL: null,
                    CreatorID: "48b8ea1f-b7dd-4674-b7a7-63bea2d9605d",
                    opened: 0,
                }, {
                    ID: "9e9ccdbe-98a9-4ead-8f25-9c1219fc2ea8",
                    Title: "Otro channel",
                    Description: "Como?",
                    PhotoURL: null,
                    CreatorID: "8bbcbe1f-bdc0-41c5-9d02-0c6776b37272",
                    opened: 0,
                }
            ]
        };

        expect(reducer(testInitialState, clearChannels())).toStrictEqual(initialState);
    });

    it("should add a Message to the state", () => {
        const message = {
            MessageID: "ba366015-705e-47b6-84cd-ec12c7f65cc2",
            Username: "SN0WM4N",
            FromID: "8bbcbe1f-bdc0-41c5-9d02-0c6776b37272",
            Content: "Ahora si funciona",
            timestamp: 1755552014000,
            ChannelID: "143376fe-7a55-4b19-81c6-5ad44ad3bd87",
        }

        const expectedState = {
            ...initialState,
            messages: {
                "143376fe-7a55-4b19-81c6-5ad44ad3bd87": [message],
            }
        }

        expect(reducer(initialState, addMessage({channelID: message.ChannelID, message}))).toStrictEqual(expectedState);
    });

    it('adding more than one message', () => {
        const message = {
            MessageID: "ba366015-705e-47b6-84cd-ec12c7f65cc2",
            Username: "SN0WM4N",
            FromID: "8bbcbe1f-bdc0-41c5-9d02-0c6776b37272",
            Content: "Ahora si funciona",
            timestamp: 1755552014000,
            ChannelID: "143376fe-7a55-4b19-81c6-5ad44ad3bd87",
        }

        const expectedState = {
            ...initialState,
            messages: {
                "143376fe-7a55-4b19-81c6-5ad44ad3bd87": [message, message, message, message],
            }
        }

        let finalReducer = reducer(initialState, addMessage({channelID: message.ChannelID, message}));
        finalReducer = reducer(finalReducer, addMessage({channelID: message.ChannelID, message}));
        finalReducer = reducer(finalReducer, addMessage({channelID: message.ChannelID, message}));
        finalReducer = reducer(finalReducer, addMessage({channelID: message.ChannelID, message}));

        expect(finalReducer).toStrictEqual(expectedState);
        
    });

    it('should add reactions to the state', () => {
        const reaction = {
            messageID: "33313004-4b8c-482d-8ac1-02e77bc5c50e",
            emoji: "😂",
        }

        const expectedState = {
            ...initialState,
            reactions: [reaction],
        }

        expect(reducer(initialState, addReaction(reaction))).toStrictEqual(expectedState);
    });

    it('adding more than one reaction', () => {
        const reaction = {
            messageID: "33313004-4b8c-482d-8ac1-02e77bc5c50e",
            emoji: "😂",
        }

        const expectedState = {
            ...initialState,
            "reactions": [reaction, reaction, reaction, reaction],
        }

        let finalState = initialState;
        finalState = reducer(finalState, addReaction(reaction));
        finalState = reducer(finalState, addReaction(reaction));
        finalState = reducer(finalState, addReaction(reaction));
        finalState = reducer(finalState, addReaction(reaction));

        expect(finalState).toStrictEqual(expectedState);
    });
});