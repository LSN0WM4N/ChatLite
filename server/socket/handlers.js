import { Server } from "socket.io";
import { WriteMessage, WriteReaction } from "../db/messages.js";

let io;

export const initSocketServer = (server, configs = {}) => {
    io = new Server(server, {
        pingInterval: 25000,
        pingTimeout: 60000, 
        ...configs
    });

    io.on('connection', (socket) => {
        console.log("User connected:", socket.id);

        socket.on('join_channel', (channelID) => {
            socket.join(channelID);
        });

        socket.on('message', data => {
            const {
                FromID,   
                ChannelID,
                Content,
                MessageID
            } = data;

            WriteMessage(MessageID, FromID, ChannelID, Content);
            io.to(ChannelID).emit("message", data);
        });

        socket.on('reaction', async (data) => {
            const {
                messageID,
                channelID,
                emoji
            } = data;

            await WriteReaction(messageID, channelID, emoji);
            io.to(channelID).emit('reaction', data);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) 
        throw new Error("Socket.io not initialized!");
    return io;
};