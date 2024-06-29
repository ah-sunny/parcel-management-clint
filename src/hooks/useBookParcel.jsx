import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useBookParcel = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    // tansatck query
    const { refetch, data: bookParcel=[] } = useQuery({
        queryKey: ['bookParcel', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/bookParcel?email=${user.email}`) // backend a email pathano holo
            return res.data;
        }
    })
return [bookParcel, refetch]
};

export default useBookParcel;