import { useNavigate } from "react-router"

import { useAuth } from "../../hooks/useAuth";

import { ProfilePhoto } from "../profile/ProfilePhoto";
import { useDispatch } from "react-redux";
import { hideChannels } from "../../features/ui/uiSlice";

export const ProfileIndicator = () => {
	const dispatch = useDispatch();
	const { UUID, username } = useAuth();
	const navigate = useNavigate();

	return (
		<div
			className="flex items-center mb-4 cursor-pointer"
			onClick={() => {
				dispatch(hideChannels());				
				navigate('/profile') 
			}}
		>
			<ProfilePhoto
				size={28}
				ID={UUID}
				indicator={'ready'}
				type="user"
			/>
			<h2 className="text-lg font-semibold pl-2 sm-max-w-[140px] break-words text-center">{username}</h2>
		</div>
	)
}
