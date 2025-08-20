import { useDispatch } from "react-redux";
import { useNavigate } from "react-router"
import { hideChannels } from "../../features/ui/uiSlice";

export const CreateChannelButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    return (
        <button
            onClick={() => {
                dispatch(hideChannels());
                navigate('/create-channel');
            }}
            className="absolute bottom-4 right-4 bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors text-4xl"
        >
            +
        </button>
    )
}
