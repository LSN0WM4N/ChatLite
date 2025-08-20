import { useNavigate } from 'react-router'

import { BackButton } from '../common/BackButton';
import { ProfilePhoto } from '../profile/ProfilePhoto';
import { useResponsive } from '../../hooks/useResponsive';

export const ChannelInfoBar = ({ channelName, usersCount, ID }) => {
	const navigate = useNavigate();
	const { isSmallScreen } = useResponsive();

	return (
		<div className="flex justify-between mb-4 px-4">
			{isSmallScreen() && <BackButton />}

			<div
				className='flex gap-2 cursor-pointer'
				onClick={() => navigate(`/info/${ID}`)}
			>
				<ProfilePhoto
					size={28}
					ID={ID}
				/>
				<h2 className="text-lg font-semibold pl-2">{channelName}</h2>
			</div>
			<span>{usersCount} users</span>
		</div>
	)
}
