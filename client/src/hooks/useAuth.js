import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../features/auth/authThunk";
import {logout, updatePhoto} from "../features/auth/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    
    const login = (credentials) => {dispatch(loginAction({credentials}))};
    const changePhoto = (photoURL) => {dispatch(updatePhoto(photoURL))};
    const doLogout = () => {dispatch(logout())};

    return {
        login,
        logout: doLogout,
        updatePhoto: changePhoto,
        ...auth
    }
}   
