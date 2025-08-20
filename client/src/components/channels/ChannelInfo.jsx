import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";

import { ChangePhoto } from "../profile/ChangePhoto";
import { Loading } from "../layout/Loading";

export const ChannelInfo = () => {
    const { UUID: UserID } = useAuth();
    const { chatID: ID } = useParams();
    const [values, setValues] = useState({
        CreatorID: null,
        name: null,
        description: null,
    });
    const { channels, FetchingChannels } = useSelector(state => state.channel);

    useEffect(() => {
        if (channels.length === 0)
            return;

        const channel = channels.find(c => c.ID === ID);
        if (!channel)
            return;

        setValues({
            CreatorID: channel.CreatorID,
            name: channel.Title,
            description: channel.Description
        });


    }, [ID, channels]);
    
    const handleChange = (e) => {
        e.preventDefault();
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const saveChanges = async (e) => {
        e.preventDefault();

        api.post('/update-channel', {
            channelID: ID,
            name: values.name,
            description: values.description
        }).then(() => {
            window.location.reload();
        }).catch(error => {
            console.error(error);
        })
    }

    if (FetchingChannels)
        return <Loading />

    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto bg-white rounded-3xl p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center mb-6 sm:mb-10">
                <ChangePhoto
                    endpoint={'/upload'}
                    body={{ channelID: ID }}
                    canEdit={values.CreatorID === UserID}
                />
                <input
                    className="mt-4 sm:mt-0 sm:ml-4 text-2xl sm:text-3xl font-semibold w-full"
                    value={values.name}
                    name="name"
                    onChange={handleChange}
                    readOnly={values.CreatorID !== UserID}
                />
            </div>

            <textarea
                className="resize-none outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300 text-sm sm:text-base"
                name="description"
                id="description"
                rows="4"
                value={values.description}
                onChange={handleChange}
                readOnly={values.CreatorID !== UserID}
            />

            {values.CreatorID === UserID && (
                <button
                    className='mt-4 sm:mt-5 w-full py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2 text-sm sm:text-base'
                    type="button"
                    onClick={saveChanges}
                >
                    Save changes
                </button>
            )}
        </div>
    );
}