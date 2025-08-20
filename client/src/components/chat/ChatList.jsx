import { useSelector } from 'react-redux';

import { ChatListItem } from './ChatListItem';
import { CreateChannelButton } from '../channels/CreateChannelButton';
import { ProfileIndicator } from '../profile/ProfileIndicator';
import { useResponsive } from '../../hooks/useResponsive';

export const ChatList = () => {
    const { isSmallScreen } = useResponsive();
    const { showChannels } = useSelector(state => state.ui);
    const { channels } = useSelector(state => state.channel);

    if (!showChannels && isSmallScreen())
        return <></>;

    return (
        <div className="bg-gray-100 h-full flex flex-col p-4 fixed md:relative w-full md:w-1/4  z-50 md:h-auto">
            <ProfileIndicator />
            <hr /> 
            <div className="flex-1 overflow-y-auto mt-2 mb-2">
                {channels.length === 0 ? (
                    <div className="flex items-center justify-center text-gray-400 h-full">
                        No channels to show.
                    </div>
                ) : (
                    channels.map(channel => (
                        <ChatListItem {...channel} key={channel.ID} />
                    ))
                )}
            </div>

            <CreateChannelButton />
        </div>
    )
}
