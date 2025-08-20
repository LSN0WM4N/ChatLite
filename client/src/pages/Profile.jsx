import { useAuth } from "../hooks/useAuth"

import { useResponsive } from "../hooks/useResponsive";

import { LoginToView } from "../components/auth/LoginToView";
import { ProfileInfo } from "../components/profile/ProfileInfo"
import { BackButton } from "../components/common/BackButton";
import { useDispatch } from "react-redux";
import { hideChannels } from "../features/ui/uiSlice";

export const Profile = () => {
    const { isAuthenticated } = useAuth();
	const { isSmallScreen } = useResponsive();
	const dispatch = useDispatch();

	if (!isAuthenticated)
		return <LoginToView />

	dispatch(hideChannels());

    return (
      	<div className="flex flex-1 w-full items-center justify-center bg-gray-200">
          	{isSmallScreen() && (
                <div className="absolute top-2 left-2 z-50">
                    <BackButton className="w-12 h-12"/>
                </div>
            )}
        	<ProfileInfo />    
      	</div>
    )
}
