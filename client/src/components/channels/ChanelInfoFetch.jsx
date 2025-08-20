import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import api from "../../api/axios";

import { ChangePhoto } from "../profile/ChangePhoto";
import { Loading } from "../layout/Loading";
import { removeLoading, setLoading } from "../../features/ui/uiSlice";

export const ChannelInfoFetch = () => {
    const { chatID: ID } = useParams();
    const [values, setValues] = useState({
        CreatorID: null,
        name: null,
        description: null,
    });

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui);

    useEffect(() => {
        const fetchChannelInfo = async () => {
            dispatch(setLoading());
            try {
                const res = await api.get('/channel-info', {
                    params: { ChannelID: ID }
                });

                console.log(res.data);

                setValues({
                    name: res.data.Title,
                    CreatorID: res.data.CreatorID,
                    description: res.data.Description,
                });
            } catch (error) {
                console.error('Error while fetching channel info', error);
            } finally {
                dispatch(removeLoading());
            }

        }

        fetchChannelInfo();
    }, [ID, dispatch]);

    if (loading)
        return <Loading />

    return (
        <div className="flex flex-col w-full max-w-md mx-auto bg-white rounded-3xl p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center mb-6 sm:mb-10">
                <ChangePhoto
                    endpoint={'/upload'}
                    body={{ channelID: ID }}
                    canEdit={false}
                />
                <input
                    className="mt-4 sm:mt-0 sm:ml-4 text-2xl sm:text-3xl font-semibold w-full"
                    value={values.name}
                    name="name"
                    readOnly={true}
                />
            </div>

            <textarea
                className="resize-none outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300 text-sm sm:text-base"
                name="description"
                id="description"
                rows="4"
                value={values.description}
                readOnly={true}
            />
        </div>
    );
}