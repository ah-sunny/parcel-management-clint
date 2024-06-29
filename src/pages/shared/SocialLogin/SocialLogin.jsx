import useAxiosPublic from "@/hooks/useAxiosPublic";
import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";


const SocialLogin = () => {
    const { createGithubUser,createGoogleUser, } = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()
    const axiosPublic = useAxiosPublic()
    const from = location.state?.form?.pathname || '/' ;

    const handleGoogleLogIn = ()=>{
        createGoogleUser()
        .then(result => {
            // console.log(result.user)
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                photoURL: result.user?.photoURL,
            }
            axiosPublic.post('/users', userInfo)
            .then(() =>{
                // console.log("res data : ",res.data)
                swal({
                    // title: "Good job!",
                    title: `Welcome "${result.user?.displayName}"`,
                    icon: "success",
                    button: "continue",
                  });
                  navigate(from, {replace: true });
            })
           
        })
        .catch(error => {
            toast.error(`${error.message}`)
        })

        
    }
    const handleGithubLogin = ()=>{
        createGithubUser()
        .then(result => {
            // console.log(result.user)
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                photoURL: result.user?.photoURL,
            }
            axiosPublic.post('/users', userInfo)
            .then(() =>{
                // console.log("res data : ",res.data)
                swal({
                    // title: "Good job!",
                    title: `Welcome "${result.user?.displayName}"`,
                    icon: "success",
                    button: "continue",
                  });
                  navigate(from, {replace: true });
            })
           
        })
        .catch(error => {
            toast.error(`${error.message}`)
        })
    }


    return (
        <div className="w-full mx-auto  flex items-center justify-center gap-0">
            <div onClick={handleGoogleLogIn}
                className="w-30 border-2 border-gray-400 px-1.5 py-1 text-xl font-bold rounded-3xl  ">
                <span><FcGoogle></FcGoogle></span>

            </div>
            <div onClick={handleGithubLogin} className="w-30 ml-3 border-2 border-gray-400 px-1.5 py-1 text-xl font-bold rounded-3xl  ">
                <span><FaGithub ></FaGithub ></span>

            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default SocialLogin;
