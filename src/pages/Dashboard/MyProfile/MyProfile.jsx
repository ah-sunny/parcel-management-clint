import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;




const MyProfile = () => {
    const { updateUserProfile, user } = useAuth();

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()

    const { data: dbuser = [], refetch } = useQuery({
        queryKey: ['dbuser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    })
    // console.log("get from db: ", dbuser)

    // console.log(user)
    const { register, handleSubmit, reset ,formState: { errors } } = useForm()
    const onSubmit = async (data) => {
        // console.log("click", data)

        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        // console.log(res.data)

        if (res.data.success) {
            // now send the 
            updateUserProfile(dbuser.name, res.data.data.display_url)
                .then(() => {
                    const userInfo = {
                        name: dbuser.name,
                        email: dbuser.email,
                        photoURL: res.data.data.display_url,
                        phoneNumber: data.phoneNumber
                    }
                    // console.log("info: ",userInfo)
                    axiosSecure.patch(`/users/${dbuser._id}`, userInfo)
                        .then(res => {
                            // console.log(res.data)
                            if (res.data.modifiedCount > 0) {
                                // console.log('user added to the database')
                                refetch();
                                reset();
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'profile pic updated',
                                    showConfirmButton: false,
                                    timer: 1500
                                });

                            }
                        })

                })

        }
    }

    return (
        <div>
            <Helmet>
                <title>Safety Move | MyProfile</title>
            </Helmet>
            <Card className="w-[80%] mt-10 mx-auto p-7 rounded-2xl shadow-2xl border-2">
                <CardHeader>
                    <CardTitle className="text-center w-fit mx-auto mb-8">
                        <img className="rounded-3xl h-44 border-b-8 border-l-8 border-sky-950 " src={dbuser?.photoURL} />
                    </CardTitle>
                    <CardTitle className="flex justify-between">
                        <p><span className="font-normal">Username : </span>{dbuser?.name}</p>
                        <p><span className="font-normal">Email : </span>{dbuser?.email}</p>
                    </CardTitle>

                </CardHeader>
                <CardContent>



                    <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">


                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="picture">Picture</Label>
                            <Input {...register("image", { required: true })} id="picture" type="file" />
                            <p className="text-xs">please input under 200KB</p>
                        </div>
                        <div className="grid w-full max-w-md items-center gap-2">
                            <Label htmlFor="phoneNumber">Phone Number  : </Label>
                            <Input {...register("phoneNumber", { minLength: 11, maxLength: 11 })} type="number" id="phoneNumber" placeholder="Phone Number" />
                            {errors.phoneNumber && <span className="text-red-500">Please input your 11 digited phone number</span>}
                        </div>

                        <Button variant="secondary" type="submit">Update Profile Picture</Button>
                    </form>


                </CardContent>

            </Card>

        </div>
    );
};

export default MyProfile;