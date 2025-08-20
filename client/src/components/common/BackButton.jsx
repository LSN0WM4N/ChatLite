import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setShowChannels } from "../../features/ui/uiSlice";

export const BackButton = ({ className = ""}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { showChannels } = useSelector(state => state.ui);
    
    if (showChannels)
        return <></>;

    return (
        <button
            onClick={() => {
                dispatch(setShowChannels());
                navigate('/');
            }}
            className={`flex items-center space-x-2 px-3 py-1 w-8 h-8 rounded-md bg-gray-200 hover:bg-gray-300 active:bg-gray-400 ${className}`}
        >
            <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M16 4L8 12L16 20" 
                    stroke="#000000" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );
};