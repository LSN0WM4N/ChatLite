import { useLayoutEffect, useRef } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import { useAuth } from "../../hooks/useAuth";
import { formatTime } from "../../utils/Dates";

import { MessageInput } from "../chat/Input"
import { RecivedMessage, SendedMessage } from "../chat/Messages"
import { ChannelInfoBar } from "../channels/ChannelInfoBar";
import { Loading } from "../layout/Loading";

export const ChatArea = ({ channelName, usersCount, ID}) => {
    const { UUID } = useAuth();
    const { chatID } = useParams();
    const { fetchingMessages } = useSelector(state => state.channel);
    const { [chatID]:messages } = useSelector(state => state.channel.messages);

    const messageContainer = useRef(null);

    useLayoutEffect(() => {
        if (messageContainer.current) {
            messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
        }
    }, [messages]);

    if (fetchingMessages)
        return <Loading />

    return (
    <div className='flex flex-1 flex-col bg-white p-4 h-screen'>
        <ChannelInfoBar channelName={channelName} usersCount={usersCount} ID={ID}/>
 
        <ul 
            ref={messageContainer}
            className="flex-1 border-t border-gray-200 p-3 pb-12 overflow-y-scroll scroll-smooth"    
        >
            {
                messages && messages.map(({
                    MessageID: ID, 
                    FromID, 
                    Username, 
                    Content, 
                    timestamp
                }) => ((FromID === UUID 
                    ? <SendedMessage
                        messageID={ID}   
                        key={`sended-${timestamp}`} 
                        message={Content}
                        time={formatTime(timestamp)}
                    /> : <RecivedMessage
                        messageID={ID}
                        key={`recived-${timestamp}`} 
                        message={Content} 
                        time={formatTime(timestamp)}
                        username={Username}
                    />
                )
                ))
            }
        </ul>    
    
        <MessageInput />
    </div>
  )
}
