import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { hideChannels } from "../../features/ui/uiSlice";

export const ChatListItem = ({
    ID,
    // CreatorID,
    Title,
    // Description,
    // PhotoURL,
    // JoinedAt,
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div
            key={ID}
            className="overflow-hidden p-2 mb-2 bg-white rounded  hover:bg-gray-200 w-full"
            onClick={() => {
                dispatch(hideChannels());
                navigate(`/chat/${ID}`);
            }}
        >
            <span className="text-md">{Title}</span>
        </div>
    )
}
