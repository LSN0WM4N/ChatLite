import { Outlet } from 'react-router';
import { useDispatch } from 'react-redux';

import { useAuth } from '../../hooks/useAuth';
import { FetchChannels } from '../../features/channel/channelThunk';
import { useEffect } from 'react';
import { ChatList } from '../chat/ChatList';

export const MainLayout = () => {
	const dispatch = useDispatch();
	const { UUID: UserID } = useAuth();

	useEffect(() => {
		dispatch(FetchChannels({ UserID }));
	}, [UserID, dispatch])

	return (
		<div className='flex h-screen'>
			<ChatList />
			<Outlet />
		</div>
	)
}
