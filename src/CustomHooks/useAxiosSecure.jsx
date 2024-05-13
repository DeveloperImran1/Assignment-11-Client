
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://assignment-eleven-server-delta.vercel.app',
    withCredentials: true
})


const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log("error tracked in the intercepter", error.response)
            if (error.response.status === 401 || error.response.status === 403) {
                console.log("LogOut koro user k")
                logOut()
                    .then(() => {
                        navigate("/login")
                    })
                    .catch(err => console.log(err))
            }
        })
    }, [])


    return axiosSecure;
};

export default useAxiosSecure;