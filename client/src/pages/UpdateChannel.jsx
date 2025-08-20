import { useDispatch } from "react-redux"
import { ChannelInfo } from "../components/channels/ChannelInfo"
import { useResponsive } from "../hooks/useResponsive";
import { BackButton } from "../components/common/BackButton";
import { hideChannels } from "../features/ui/uiSlice";

export const UpdateChannel = () => {
    const dispatch = useDispatch();
    const { isSmallScreen } = useResponsive();
    dispatch(hideChannels());

    return (
        <div className="flex flex-1 w-full items-center justify-center bg-gray-200">
            {isSmallScreen() && (
                <div className="absolute top-2 left-2 z-50">
                    <BackButton className="w-12 h-12"/>
                </div>
            )}
            <ChannelInfo />    
        </div>
    )
}
