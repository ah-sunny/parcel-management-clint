import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";


const MyReview = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    })
    // console.log(users)
    // const deliveryMans = users.filter((DeMan)=> DeMan?.role ==="deliveryMan" ); 
    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews-deliveryMan/${users._id}`);
            return res.data;
        }
    })

    return (
        <div>
            <Helmet>
                <title>Safety | DeliveryMan | Reviews </title>
            </Helmet>
            <h1 className="text-xl lg:text-4xl font-bold text-center py-5 border-y-2 border-dashed"> My Review</h1>

            {/*  */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-16">
                {
                    reviews.map((review, idx) => <Card key={idx}
                        className="shadow-2xl border-2 bg-gray-300">
                        <CardHeader  >
                            <CardDescription className="flex justify-end">
                                <img className="h-20  rounded-full border-2 border-gray-600" src={review?.userImage} alt="" />

                            </CardDescription>
                            <CardTitle>
                                <p className="txet-2xl my-2 text-right">{review.userName}</p>
                                <div className="flex flex-row-reverse items-center justify-between">
                                    <Rating

                                        style={{ maxWidth: 180 }}
                                        value={review.rating}
                                        readOnly
                                    />
                                    <p className="text-sm">Rating:  {review.rating} <span className="text-xs">(out of 5)</span></p>
                                </div>

                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{review?.feedback}</p>
                        </CardContent>
                        <CardFooter>
                            <p>{review?.onTimeDate}</p>
                        </CardFooter>
                    </Card>)
                }


            </div>
        </div>
    );
};

export default MyReview;