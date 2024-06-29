import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { format } from "date-fns";
import PropTypes from 'prop-types';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Reviews = ({ deliveryManId }) => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [rating, setRating] = useState(0);
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm()
    const handleReviews = (data) => {
        const today = new Date();
        const onTimeDate = format(today, 'do MMM,yyyy')
        const reviewInfo = { ...data, userName: user?.displayName, userImage: user?.photoURL, rating, deliveryManId,onTimeDate }
        // console.log("clicked:",reviewInfo)
        axiosSecure.post('/reviews-deliveryMan', reviewInfo)
            .then(res => {
                // console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Thanks for your REVIEW`,
                        showConfirmButton: false,
                        timer: 1000
                    });
                    reset();
                    navigate('/dashboard/Myparcel')
                }
            })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Review</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] ">
                <DialogHeader>
                    <DialogTitle>Review For Delivery Man</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">

                    <form onSubmit={handleSubmit(handleReviews)} className=" w-[97%] border-2 rounded-3xl p-3 bg-[#075f3fad] text-gray-100 "  >

                        <div className="flex justify-end absolute z-30 top-[13%] right-[5%]">
                            <img src={user?.photoURL} className="h-16 rounded-full" />
                        </div>

                        <div>
                            <h1 className="text-xl font-bold italic">{user.displayName}</h1>
                        </div>
                        <div className="mt-9 mb-3 space-y-2">
                            <div className="flex justify-center">
                                <Rating

                                    style={{ maxWidth: 180 }}
                                    value={rating}
                                    onChange={setRating}
                                    isRequired
                                />
                            </div>
                            <p className=" font-bold">DeliveryMan Id :  <span className="text-xs pl-1 font-light">{deliveryManId}</span> </p>
                            <Label className="font-semibold">Feedback : </Label>
                            <Textarea {...register('feedback', { required: true })} className="text-black" placeholder="Type your Feedback here." />
                        </div>


                        <DialogFooter>
                            <Button type="submit">Review</Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog >
    );
};
Reviews.propTypes = {
    deliveryManId: PropTypes.string
}
export default Reviews;