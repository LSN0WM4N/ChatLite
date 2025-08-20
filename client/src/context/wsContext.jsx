import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { addMessage, addReaction } from "../features/channel/channelSlice";
import { useDispatch, useSelector } from "react-redux";

const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);
    const { channels } = useSelector(state => state.channel)

    useEffect(() => {

        const socketIo = io(import.meta.env.VITE_BACKEND_URL,
            {
                reconnection: true,           
                reconnectionAttempts: 5,      
                reconnectionDelay: 2000,      
                transports: ["websocket"],    
            }
        ); 
        setSocket(socketIo);


        socketIo.on("message", (msg) => {
            const {
                Username,
                FromID,
                ChannelID,
                Content,
                timestamp,
                MessageID
            } = msg;

            dispatch(addMessage({
                channelID: ChannelID,
                message: {
                    Username,
                    FromID,
                    Content,
                    timestamp,
                    MessageID
                },
            }));
        });

        socketIo.on('reaction', (reaction) => {
            const {
                messageID,
                emoji
            } = reaction;

            dispatch(addReaction({messageID, emoji}));
        })

        return () => {
            socketIo.disconnect();
        };
    }, [dispatch]);

    useEffect(() => {
        if (!socket) 
            return;
        channels.forEach(channel => socket.emit("join_channel", channel.ID));
    }, [socket, channels]);
    
    const sendMessage = (msg) => {
        if (!socket) 
            return;

        socket.emit("message", msg);
    };

    const sendReaction = (reaction) => {
        if (!socket)
            return;

        socket.emit("reaction", reaction);
    }

    return (
        <SocketContext.Provider value={{ socket, sendMessage, sendReaction }}>
            {children}
        </SocketContext.Provider>
    );
};
