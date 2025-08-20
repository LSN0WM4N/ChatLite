import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import api from "../api/axios";
import { useForm } from "../hooks/useForm";
import { hideChannels, removeLoading, setLoading } from "../features/ui/uiSlice";
import { addChannel } from "../features/channel/channelSlice";

import { ChangePhoto } from "../components/profile/ChangePhoto";
import { BackButton } from "../components/common/BackButton";
import { useResponsive } from "../hooks/useResponsive";
import { useNavigate } from "react-router";
import { ProfilePhoto } from "../components/profile/ProfilePhoto";

export const CreateChannel = () => {
    const ChannelID = uuidv4();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { UUID } = useSelector(state => state.auth);
    const [{channelName, channelDescription}, handleInputChange, reset] = useForm({
        channelName: "", 
        channelDescription: ""
    }); 

    const { isSmallScreen } = useResponsive();
    dispatch(hideChannels());

    const handleCreateChannel = async (e) => {
        e.preventDefault();

        dispatch(setLoading());

        try {
            const res = await api.post("/create-channel", {
                ChannelID,
                CreatorUUID: UUID, 
                channelName,
                channelDescription,
            });

            const data = res.data;

            dispatch(addChannel({
                ID: data,
                Title: channelName,
                Description: channelDescription,
            }));
            dispatch(removeLoading());
            navigate(`/chat/${data}`);
            
        } catch (error) {
            dispatch(removeLoading());
            console.error(error);
        }

        reset();
    }
    
    return (
        <div className="flex flex-1 items-center justify-center w-full h-full bg-gray-200">
            {isSmallScreen() && (
                <div className="absolute top-2 left-2 z-50">
                    <BackButton className="w-12 h-12"/>
                </div>
            )}
            <div className="flex bg-white rounded-3xl p-8">
                <form className="flex flex-col items-center justify-center">
                    <ChangePhoto 
                        endpoint='/upload'
                        body={{ChannelID}}
                        canEdit={true}
                    />

                    <input 
                        className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300 mb-2" 
                        placeholder="Enter the channel name" 
                        id="channelName" 
                        name="channelName" 
                        type="text" 
                        required
                        onChange={handleInputChange}
                        value={channelName}
                    />

                    <textarea 
                        placeholder="Description..."
                        name="channelDescription" 
                        id="channelDescription"
                        rows="4" cols="50"
                        className="resize-none outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300" 
                        onChange={handleInputChange}
                        value={channelDescription}
                    />
                    <button 
                        className="mt-5 w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-b-md text-white ring-2" id="login" name="login" type="button"
                        onClick={handleCreateChannel}
                    >Create Channel</button>
                </form>
            </div>
        </div>
    )
}
