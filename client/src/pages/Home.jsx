import { useAuth } from "../hooks/useAuth";

import { CreateOrSelect } from "../components/channels/CreateOrSelect";
import { LoginToView } from "../components/auth/LoginToView";
import { useResponsive } from "../hooks/useResponsive";
import { useDispatch } from "react-redux";
import { setShowChannels } from "../features/ui/uiSlice";
import { BackButton } from "../components/common/BackButton";

export const Home = () => {
	const { isAuthenticated } = useAuth();
	const { isSmallScreen } = useResponsive();
	const dispatch = useDispatch();

	if (!isAuthenticated)
		return <LoginToView />;

	dispatch(setShowChannels());

	return (
		<>
			{!isSmallScreen() && <CreateOrSelect />}
		</>
	)
}
