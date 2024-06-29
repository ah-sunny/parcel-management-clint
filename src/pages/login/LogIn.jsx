import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from "react-simple-captcha";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";
import signupImage from '../../assets/login/a1.jpg';
import { AuthContext } from "../../provider/AuthProvider";
import SocialLogin from "../shared/SocialLogin/SocialLogin";


const LogIn = () => {
    const { loading, signIn } = useContext(AuthContext);
    const [disable, setDisabled] = useState(true)
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.form?.pathname || '/';

    const { register, handleSubmit } = useForm()
    const handleLogIn = (data) => {
        // console.log(data)
        signIn(data?.email, data?.password)
            .then(result => {
                swal({
                    // title: "Good job!",
                    title: `Welcome "${result.user?.displayName}"`,
                    icon: "success",
                    button: "continue",
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(`${error.message}`)
            })
    }

    useEffect(() => {
        loadCaptchaEnginge(5);
    }, [])


    // Watch the input value
    //  const inputValue = watch("captcha", 10); 
    // 
    // useEffect(() => {
    //     const value = inputValue;
    //     if (validateCaptcha(value)) {
    //         setDisabled(false);
    //     } else {
    //         setDisabled(true)
    //     }
    // }, [inputValue])

    const handleValidateCaptcha = (e) => {
        const captchaValue = e.target.value;
        if (validateCaptcha(captchaValue)) {
            setDisabled(false);
        } else {
            setDisabled(true)
        }
    }


    return (

        <div className='mb-10 lg:w-[78%] mx-auto border-2 p-5 mt-10 rounded-xl shadow-2xl'>
            <Helmet>
                <title>Safety Move | Login</title>
            </Helmet>
            {
                loading ? <span className="loading loading-ring loading-lg"></span> : ""
            }
            <h2 className="text-3xl mt-3 mb-5 text-center italic"> Log In Your Account </h2>
            <div className='flex flex-row-reverse gap-4 justify-center '>
                <div className="">
                    <img className='hidden lg:block h-80 w-[100%]' src={signupImage} alt="" />
                </div>

                <div className='flex flex-col lg:w-[30%] items-center justify-center '>
                    <form onSubmit={handleSubmit(handleLogIn)} className=" w-full"  >
                        {/* <input  /> */}
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label htmlFor="email">Email : </Label>
                            <Input {...register("email", { required: true })} type="email" id="email" placeholder="Enter Your Email" />
                        </div>
                        <div className="relative grid w-full max-w-sm items-center gap-2 mt-3">
                            <Label htmlFor="password">Password : </Label>
                            <Input {...register("password", { required: true })} type={showPass ? "text" : "password"} id="password" placeholder="Password" />

                            <span className='absolute right-[5%] bottom-[18%] ' onClick={() => setShowPass(!showPass)}> {showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>} </span>

                        </div>
                        <div className="grid w-full max-w-sm items-center gap-2 mt-3">
                            <Label htmlFor="captcha">
                                <LoadCanvasTemplate />
                            </Label>
                            <Input onBlur={handleValidateCaptcha} type="text" id="captcha" placeholder="Type the captcha" />
                        </div>

                        <Button disabled={disable} className="font-bold text-lg bg-primary w-full mt-2">
                            <input type="submit" value="Login" />
                        </Button>
                        <div>
                            <Separator className="mt-3" />
                            <p className="mx-auto text-center">or</p>
                        </div>
                        <SocialLogin></SocialLogin>
                        {/* <div className="flex justify-center gap-4">
                            <div onClick={handleGoogleLogIn}
                                className="w-30 border-2 border-gray-400 px-1.5 py-1 text-xl font-bold rounded-3xl  ">
                                <span><FcGoogle></FcGoogle></span>

                            </div>
                            <div onClick={handleGithubLogin} className="w-30 border-2 border-gray-400 px-1.5 py-1 text-xl font-bold rounded-3xl  ">
                                <span><FaGithub ></FaGithub ></span>

                            </div>
                        </div> */}

                        <p className="text-center">Do not have an account ? <Link className="text-blue-600 font-bold" to="/register"> Register</Link></p>

                    </form>



                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default LogIn;


{/* <div className="form-control">
    <label className="label">
        <LoadCanvasTemplate />
    </label>
    <input onBlur={handleValidateCaptcha} type="text" required name="captcha" placeholder="type the captcha" className="input input-bordered h-10" />
</div> */}