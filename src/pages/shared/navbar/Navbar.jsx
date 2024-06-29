import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";
import { FaBars } from 'react-icons/fa6';
import { Link, NavLink } from "react-router-dom";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)

    const handleSignOut = () => {
        logOut()
            .then()
            // .catch(error => {
            //     // console.error(error)
            // })
        // console.log("clicked")
    }


    const navlinks = <>
        <li><NavLink to="/"
            className={({ isActive }) => isActive ? 'text-[#0952b3] font-bold' : ''} >
            Home</NavLink></li>
        <li><NavLink to="/dashboard/MyProfile">Dashboard</NavLink></li>
        <li><NavLink to="/service"
            className={({ isActive }) => isActive ? 'text-[#0952b3] font-bold' : ''}
        >Our Features </NavLink></li>

        {

            user ? ""
                :

                <li><NavLink to="/register"
                    className={({ isActive }) => isActive ? 'text-[#0952b3] font-bold' : ''}
                >Register</NavLink></li>
        }

    </>
    return (
        <div className=" ">
            <div className=" flex justify-between mt-4 font-medium ">
                {/* left */}
                <div className="flex items-center">
                    <DropdownMenu  >
                        <DropdownMenuTrigger className="visible lg:hidden ">
                            <FaBars ></FaBars>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="p-3 ml-5 mt-2">
                            <ul className="space-y-1">
                                {navlinks}
                            </ul>
                        </DropdownMenuContent>
                    </DropdownMenu>


                    <Button variant="ghost" className="font-bold lg:text-2xl">Safely Move</Button>
                </div>
                {/* middle */}
                <div className="hidden lg:block">
                    <ul className="flex gap-5">
                        {navlinks}
                    </ul>
                </div>


                {/* right */}
                <div>
                    {
                        user ?
                            <div className="flex items-center ">
                                <DropdownMenu >
                                    <DropdownMenuTrigger className=" ">
                                        <Avatar className=" mx-auto text-center">
                                            <AvatarImage src={user?.photoURL} />
                                            {/* <AvatarFallback>CN</AvatarFallback> */}
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <NavLink to="/dashboard">Dashboard</NavLink>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleSignOut} >Log out</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </div>
                            :
                            <Link to="/login">
                                <Button variant="ghost" className="font-bold text-lg">Login</Button>
                            </Link>

                    }
                </div>


            </div>
        </div>
    );
};

export default Navbar;