import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { useAuth } from '../hooks/useAuth'
import { FetchMessages, FetchReactions } from '../features/channel/channelThunk';

import { ChatArea } from '../components/chat/ChatArea';
import { Loading } from '../components/layout/Loading';
import { JoinChannel } from '../components/channels/JoinChannel';
import { useResponsive } from '../hooks/useResponsive';
import { hideChannels } from '../features/ui/uiSlice';

export const Chat = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { chatID: ID} = useParams();
    const { UUID: UserID } = useAuth();
    const { isSmallScreen } = useResponsive();
    const { channels, fetchingChannels } = useSelector(state => state.channel);

    const channelInfo = channels.find(c => c.ID === ID);

    if ( isSmallScreen )
        dispatch(hideChannels());
    
    useEffect(() => {
        if (!ID)
            return;

        dispatch(FetchMessages({UserID, ChannelID: ID}));
        dispatch(FetchReactions({ ChannelID: ID }));
    
        return () => {}
    }, [ID, UserID, dispatch]);

    if (!ID) {
        navigate('/');
        return;
    }

    if (fetchingChannels)
        return <Loading />


    return (
        !channelInfo 
            ? <JoinChannel /> 
            : <ChatArea channelName={channelInfo.Title} ID={ID}/>
    )
}
