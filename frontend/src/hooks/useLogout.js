import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthToken, setAuthUser, setRole } from "../redux/userSlice";

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(setAuthToken(null));
        dispatch(setAuthUser(null));
        dispatch(setRole(null));
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        localStorage.removeItem('role');
        navigate('/');
    };

    return handleLogout;
};

export default useLogout