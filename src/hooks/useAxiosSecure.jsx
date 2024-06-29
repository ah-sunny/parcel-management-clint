import axios from "axios";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://parcel-management-server-red.vercel.app'
})

const useAxiosSecure = () => {
    // const naviagte = useNavigate();
    const {logOut} = useAuth();


    // 
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `carry ${token}`;
        return config;
    }, function (error) {
        // request error
        return Promise.reject(error);
    });


    // 401 and 403 error on interceptor
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('status error interceptor', error);

        // 401 and 403 error
        if (status === 401 || status === 403) {
            await logOut();
            // naviagte('/login');
        }
        return Promise.reject(error);
    }) 
    return axiosSecure;
};
export default useAxiosSecure;