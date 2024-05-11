import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { AuthContext } from "../AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation();
    console.log({loading, user})
    if (loading) {
        return <div className="flex justify-center items-center flex-col min-h-[calc(100vh-116px)]">
            <ScaleLoader size={100} color='#F92FD3' ></ScaleLoader>
        </div>

    }
    if (user) {
        return children;
    }
    else {
        return <Navigate to="/login" state={location.pathname} ></Navigate>
    }

};

export default PrivateRoute;