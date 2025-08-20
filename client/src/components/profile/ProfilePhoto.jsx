import { useEffect, useMemo, useState } from "react";

import api from "../../api/axios";
import { LOADING_PFP, WRONG_PFP } from "../../constants";

export const ProfilePhoto = ({ ID, size = 96, type = "group", preview}) => {
    const [URL, setURL] = useState(LOADING_PFP);

    const fetchParams = useMemo(() => ({ UUID: ID, type }), [ID, type]);

    useEffect(() => {
        const fetchPhoto = async() => {
            try {
                const res = await api.get('/photo', { params: fetchParams});
                setURL(res.data.photoUrl)
            } catch (error) {
                setURL(WRONG_PFP);
                console.error(error);
            }
        }
        
        fetchPhoto();
        
    }, [fetchParams]);

    if (preview) {
        return <img
            src={preview}
            alt='Preview'
            style={{ width: size, height: size }}
            className="rounded-full object-cover"
        />  
    }

    return (
        <img
            src={URL}
            alt={URL === null ? "Cargando..." : "PFP"}
            style={{ width: size, height: size }}
            className="rounded-full object-cover border-2"
        />
    );
};
