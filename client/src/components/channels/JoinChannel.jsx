import { useParams } from "react-router";
import { useDispatch } from "react-redux";

import api from "../../api/axios"
import { useAuth } from "../../hooks/useAuth"
import { FetchChannels } from "../../features/channel/channelThunk";
import { hideChannels, setShowChannels } from "../../features/ui/uiSlice";
import { useResponsive } from "../../hooks/useResponsive";
import { BackButton } from "../common/BackButton";
import { ChannelInfoFetch } from "./ChanelInfoFetch";
import { useEffect } from "react";

export const JoinChannel = () => {
	const dispatch = useDispatch();
	const { chatID } = useParams(); 
	const { UUID: UserID } = useAuth();
	const { screenWidth, isSmallScreen } = useResponsive();

	dispatch(hideChannels());

	useEffect(() => {
		if (!isSmallScreen())
			dispatch(setShowChannels());
	}, [screenWidth, dispatch, isSmallScreen]);

	const HandleJoin = async () => {
		api.post('/join-channel', {UserID, ChannelID: chatID})
			.then(() => {
				dispatch(FetchChannels())
				window.location.reload();
			});
	}

	return (
		<div
			className="flex flex-col w-full justify-center items-center	"
		>
			{isSmallScreen() && (
				<div className="absolute top-2 left-2 z-50">
					<BackButton className="w-12 h-12"/>
				</div>
			)}

			<ChannelInfoFetch />

			<div className="">
				<button
					className="bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold py-4 px-8 rounded-lg shadow-lg transition duration-200"
					onClick={HandleJoin}
					>
					JoinChannel
				</button>
			</div>
		</div>
	)
}