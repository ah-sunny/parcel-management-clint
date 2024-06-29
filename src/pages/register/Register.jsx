import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import signupImage from '../../assets/login/a2.jpg';
import { AuthContext } from "../../provider/AuthProvider";
import SocialLogin from "../shared/SocialLogin/SocialLogin";

const Register = () => {
    const [showPass, setShowPass] = useState(false)
    const { createUser, updateUserProfile, logOut, loading } = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    //  const location = useLocation()
    //  const from = location.state?.form?.pathname || '/' ;

    const { register, handleSubmit, reset } = useForm()
    const handleRegister = (data) => {
        // console.log(data);

        if (data?.password.length < 6) {
            toast.error(' Password should be at least 6 characters')
            return;
        } else if (!/[A-Z]/.test(data.password)) {
            toast.error('Your password should be at one uppercase characters.')
            return;
        } else if (!/[a-z]/.test(data.password)) {
            toast.error('Your password should be at one lowercase characters.')
            return;
        }

        //create user
        createUser(data.email, data.password)
            .then(() => {
                // console.log(result.user)
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // console.log("user profile info updated")
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photoURL: data.photoURL,
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    // console.log('user added to the database')
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    logOut();
                                    navigate("/login");
                                }
                            })
                    })
            })
            .catch(error => {
                // console.error(error)
                toast.error(`${error.message}`)
            })

    }


    return (
        <div className='mb-10 lg:w-[78%] mx-auto border-2 p-5 mt-10 rounded-xl shadow-2xl'>
            <Helmet>
                <title>Safety Move | Register</title>
            </Helmet>
            {
                loading ? <span className="loading loading-ring loading-lg"></span> : ""
            }
            <h2 className="text-3xl mt-3 mb-5 text-center italic"> Register Here </h2>
            <div className='flex gap-4 justify-center '>
                <div>
                    <img className='hidden lg:block h-80 w-[100%]' src={signupImage} alt="" />
                </div>

                <div className='flex flex-col lg:w-[40%]items-center justify-center'>
                    <form onSubmit={handleSubmit(handleRegister)} className=" w-full"  >

                        <div className='flex flex-col lg:flex-row gap-6 w-full'>

                            <div className="grid w-full max-w-sm items-center gap-2">
                                <Label htmlFor="name">Name : </Label>
                                <Input {...register("name", { required: true })} type="text" id="name" placeholder="Name" />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-2">
                                <Label htmlFor="photoURL">Photo URL : </Label>
                                <Input {...register("photoURL", { required: true })} type="text" id="photoURL" placeholder="photoURL" />
                            </div>
                        </div>

                        <div className='flex flex-col lg:flex-row  gap-6 w-full mt-3'>
                            <div className="grid w-full max-w-sm items-center gap-2">
                                <Label htmlFor="email">Email : </Label>
                                <Input {...register("email", { required: true })} type="email" id="email" placeholder="Enter Your Email" />
                            </div>
                            <div className="relative grid w-full max-w-sm items-center gap-2 mt-3">
                                <Label htmlFor="password">Password : </Label>
                                <Input {...register("password", { required: true })} type={showPass ? "text" : "password"} id="password" placeholder="Password" />

                                <span className='absolute right-[5%] bottom-[18%] ' onClick={() => setShowPass(!showPass)}> {showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>} </span>

                            </div>
                        </div>
                        <Button className="font-bold text-lg bg-primary w-full mt-2">
                            <input type="submit" value="Register" />
                        </Button>

                        <div>
                            <p className="mx-auto text-center">or</p>
                        </div>
                        <SocialLogin></SocialLogin>

                        <p className="text-center mt-4">Already have an account? <Link className="text-blue-600 font-bold" to="/login">Login</Link></p>
                    </form>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Register;