import { CiDeliveryTruck } from "react-icons/ci";
import { FaHistory, FaThList, FaUserSecret, FaUsers } from "react-icons/fa";
import { FaChalkboardUser } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { GrDeliver } from "react-icons/gr";
import { MdOutlineReviews } from "react-icons/md";
import { PiPackageFill } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import "./nav.css";



const note = () => {
    return (
        <div>
            
            <ul className="space-y-1 mt-10">
                    {
                        // Admin Dashboard
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/AllParcel" className=" flex items-center gap-2 pl-2" >
                                    <FaThList ></FaThList > All Parcel
                                </NavLink>
                            </li>
                            <li>

                                <NavLink to="/dashboard/All-Delivery-Man" className=" flex items-center gap-2 pl-2" >
                                    <GrDeliver ></GrDeliver> All Delivery man
                                </NavLink>
                            </li>
                            <li>

                                <NavLink to="/dashboard/AllUsers" className=" flex items-center gap-2 pl-2" >
                                    <FaUsers ></FaUsers > All Users
                                </NavLink>
                            </li>

                        </>
                            :

                            <>
                                {
                                    // DeliveryMan Dashboard
                                    isDeliveryMan ?
                                         <>
                                           <li>
                                                <NavLink to="/dashboard/My-DeliveryList" className=" flex items-center gap-2 pl-2" >
                                                    <CiDeliveryTruck className="text-2xl" ></CiDeliveryTruck > My Delivery List
                                                </NavLink>
                                            </li>
                                            <li>

                                                <NavLink to="/dashboard/My-reviews" className=" flex items-center gap-2 pl-2" >
                                                    <MdOutlineReviews className="text-xl" ></MdOutlineReviews > My Reviews
                                                </NavLink>
                                            </li>
                                         </>
                                        :   
                                        // User DashBoard
                                        <>
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
                                                    <GiTakeMyMoney ></GiTakeMyMoney > Make Payment
                                                </NavLink>
                                            </li>
                                            <li>

                                                <NavLink to="/dashboard/Payment-history" className=" flex items-center gap-2 pl-2">
                                                    <FaHistory  ></FaHistory  >Payment History
                                                </NavLink>
                                            </li>
                                            <li>

                                                <NavLink to="/dashboard/MyProfile" className=" flex items-center gap-2 pl-2">
                                                    <FaUserSecret ></FaUserSecret > My Profile
                                                </NavLink>
                                            </li>
                                        </>
                                }

                            </>
                    }

                

                </ul>










        </div>
    );
};

export default note;