import { Separator } from "@/components/ui/separator";
import useAdmin from "@/hooks/useAdmin";
import useDeliveryMan from "@/hooks/useDeliveryMan";
import { BsJournalMedical } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaHistory, FaHome, FaThList, FaUserSecret, FaUsers } from "react-icons/fa";
import { FaChalkboardUser } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { GrDeliver } from "react-icons/gr";
import { MdOutlineReviews } from "react-icons/md";
import { PiPackageFill } from "react-icons/pi";
import { NavLink, Outlet } from "react-router-dom";
import "./nav.css";

const Dashboard = () => {
    // TODO :
    const [isAdmin] = useAdmin();
    const [isDeliveryMan] = useDeliveryMan();
    // const [deliverMan, setDeliverMan] = useState(false)
    // const onlyUser = (!isAdmin && !isDeliveryMan)
// const axiosSecure = useAxiosSecure()
    // const { user } = useAuth()
    // const { data: users = [], } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/users/${user.email}`);
    //         return res.data;
    //     }
    // })


    // console.log("onlyUser :", deliverMan)
    // useEffect(()=>{
    //     if ( users?.role === "deliveryMan" ) {
    //         setDeliverMan(true)
    //     }
    // },[users])
    // console.log("admin :", isAdmin)
    // console.log("isDeliveryMan :", isDeliveryMan)
   
    return (
        <div className="flex" >
            {/* dash menu bar */}
            <div className="w-52 h-auto lg:min-h-screen pl-2 lg:pl-4 pt-5 bg-sky-900 text-gray-300">
                <div className="mx-auto text-left mt-7">
                    <h1 className=" lg:text-3xl font-bold bg-">Safety Move</h1>
                    <p className="text-xs w-full flex items-stretch">Your Parcel Will Be Saved</p>
                </div>

                {/*  */}
                <ul className="space-y-1 mt-10">


                    {/*    // Admin Dashboard    //   className={isAdmin ? 'block' : 'hidden'}*/}
                    {
                        isAdmin ?
                            <div className="space-y-6 lg:space-y-0">
                                <li>
                                    <NavLink to="/dashboard/AllParcel" className=" flex flex-col lg:flex-row lg:items-center gap-2 pl-2" >
                                        <FaThList ></FaThList > All Parcel
                                    </NavLink>
                                </li>
                                <li>

                                    <NavLink to="/dashboard/All-Delivery-Man" className=" flex flex-col lg:flex-row lg:items-center gap-2 pl-2" >
                                        <GrDeliver ></GrDeliver> All Delivery man
                                    </NavLink>
                                </li>
                                <li>

                                    <NavLink to="/dashboard/AllUsers" className=" flex flex-col lg:flex-row items-center gap-2 pl-2" >
                                        <FaUsers ></FaUsers > All Users
                                    </NavLink>
                                </li>
                                <li>

                                        <NavLink to="/dashboard/MyProfile" className=" flex flex-col lg:flex-row items-center gap-2 pl-2">
                                            <FaUserSecret ></FaUserSecret > My Profile
                                        </NavLink>
                                    </li>

                            </div>
                            :
                            <>
                              {/* // User DashBoard  //  {isDeliveryMan ? 'hidden' : 'block'}*/}
                                <div className={isDeliveryMan ? 'hidden' : 'block'} >

                                    <li>
                                        <NavLink to="/dashboard/BookParcel" className=" flex flex-col lg:flex-row items-center gap-2 pl-2 " >
                                            <PiPackageFill ></PiPackageFill > Book A Parcel
                                        </NavLink>
                                    </li>
                                    <li>

                                        <NavLink to="/dashboard/Myparcel" className=" flex flex-col lg:flex-row items-center gap-2 pl-2 mt-7 lg:mt-0" >
                                            <FaChalkboardUser ></FaChalkboardUser > My Parcels
                                        </NavLink>
                                    </li>
                                    <li>

                                        <NavLink to="/dashboard/payment" className=" flex flex-col lg:flex-row items-center gap-2 pl-2 mt-7 lg:mt-0">
                                            <GiTakeMyMoney ></GiTakeMyMoney > Make Payment
                                        </NavLink>
                                    </li>
                                    <li>

                                        <NavLink to="/dashboard/Payment-history" className=" flex flex-col lg:flex-row items-center gap-2 pl-2 mt-7 lg:mt-0">
                                            <FaHistory  ></FaHistory  >Payment History
                                        </NavLink>
                                    </li>
                                    <li>

                                        <NavLink to="/dashboard/MyProfile" className=" flex flex-col lg:flex-row items-center gap-2 pl-2 mt-7 lg:mt-0">
                                            <FaUserSecret ></FaUserSecret > My Profile
                                        </NavLink>
                                    </li>
                                </div>




                                <div className={isDeliveryMan ? 'block' : 'hidden'} >

                                    <li>
                                        <NavLink to="/dashboard/My-DeliveryList" className=" flex flex-col lg:flex-row items-center gap-2 pl-2 " >
                                            <CiDeliveryTruck className="text-2xl" ></CiDeliveryTruck > My Delivery List
                                        </NavLink>
                                    </li>
                                    <li>

                                        <NavLink to="/dashboard/My-reviews" className=" flex flex-col lg:flex-row items-center gap-2 pl-2 mt-7 lg:mt-0" >
                                            <MdOutlineReviews className="text-xl" ></MdOutlineReviews > My Reviews
                                        </NavLink>
                                    </li>
                                    <li>

                                        <NavLink to="/dashboard/MyProfile" className=" flex flex-col lg:flex-row items-center gap-2 pl-2 mt-7 lg:mt-0">
                                            <FaUserSecret ></FaUserSecret > My Profile
                                        </NavLink>
                                    </li>

                                </div>

                            </>
                    }







                </ul>






                {/* shared link */}
                <Separator className="mt-10 w-[90%]" />
                <ul>
                    <li>
                        <NavLink to="/" className="flex flex-col lg:flex-row gap-2 mt-3 pl-2">
                            <FaHome className="text-xl" ></FaHome > Home
                        </NavLink>
                    </li>
                    <li>

                        <NavLink to="/service" className=" flex flex-col lg:flex-row lg:items-center gap-2 pl-2 mt-7 lg:mt-0 " >
                            <BsJournalMedical className="text-md" ></BsJournalMedical > Our Features
                        </NavLink>
                    </li>
                </ul>
            </div>


            {/* dash details */}
            <div className="flex-1 lg:p-5">
                <Outlet></Outlet>

            </div>

        </div>
    );
};

export default Dashboard;







{/* <>

<li>
    <NavLink to="/dashboard/BookParcel" className=" flex items-center gap-2 pl-2" >
        <PiPackageFill ></PiPackageFill > Book A Parcel
    </NavLink>
</li>
<li>

    <NavLink to="/dashboard/Myparcel" className=" flex items-center gap-2 pl-2" >
        <FaChalkboardUser ></FaChalkboardUser > My Parcels
    </NavLink>
</li>
<li>

    <NavLink to="/dashboard/payment" className=" flex items-center gap-2 pl-2">
        <FaUserSecret ></FaUserSecret > Make Payment
    </NavLink>
</li>
<li>

    <NavLink to="/dashboard/Payment-history" className=" flex items-center gap-2 pl-2">
        <FaUserSecret ></FaUserSecret >Payment History
    </NavLink>
</li>
<li>

    <NavLink to="/dashboard/MyProfile" className=" flex items-center gap-2 pl-2">
        <FaUserSecret ></FaUserSecret > My Profile
    </NavLink>
</li>
</> */}