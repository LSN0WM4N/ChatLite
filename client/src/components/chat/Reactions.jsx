import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';

import { useSocket } from '../../context/wsContext';
import { useAuth } from '../../hooks/useAuth';
import { useResponsive } from '../../hooks/useResponsive';

export const Reactions = ({
    showPicker = false,
    setShowPicker = () => { },
    messageID
}) => {
    const { chatID } = useParams();
    const { UUID: userID } = useAuth();
    const { sendReaction } = useSocket();
    const { isSmallScreen } = useResponsive();
    const [messageReactions, setMessageReactions] = useState([]);
    const reactions = useSelector(state => state.channel.reactions);
    
    const pickerRef = useRef(false);

    useEffect(() => {
        const filtered = reactions.filter(r => r.messageID === messageID);

        const grouped = filtered.reduce((acc, { emoji }) => {
            acc[emoji] = (acc[emoji] || 0) + 1;
            return acc;
        }, {});

        const sorted = Object.entries(grouped)
            .map(([emoji, count]) => ({ emoji, count }))
            .sort((a, b) => b.count - a.count);

        setMessageReactions(sorted);
    }, [reactions, messageID]);

    const handleEmojiClick = async (emojiData) => {
        sendReaction({
            emoji: emojiData.emoji,
            messageID,
            channelID: chatID,
            userID
        });

        setShowPicker(false);
    };

    return (
        <div
        >
            

            {showPicker && (
                <div className={`${
                    isSmallScreen() 
                        ? "absolute top-0 left-0 z-10 w-creen h-screen flex justify-center items-center" 
                        : "z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    }`}
                    onClick={() =>{
                        if (pickerRef.current.matches(':hover'))
                            return;
                        setShowPicker(false);
                    }}    
                >  
                    <div
                        className='p-10'
                        onMouseLeave={() => setShowPicker(false)}
                        ref={pickerRef}
                    >
                        <EmojiPicker
                            onEmojiClick={handleEmojiClick}
                        />
                    </div>
                </div>
            )}

            {messageReactions.length > 0 && (
                <div className="flex space-x-1 mt-1 cursor-default">
                    {messageReactions.map(({ emoji, count }, idx) => (
                        idx < 5 && <span 
                            key={`${messageID}-${idx}`}
                            className="px-2 py-1 bg-gray-200 rounded-full text-sm"
                        >{emoji}{count > 1 && count}</span>
                    ))}
                </div>
            )}
        </div>
    )
}
