import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import ShowList from "./ShowList";

const MyDeliveryList = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { data: users = [], } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    })
    // console.log(users)
    const { data: deliveryList = [], refetch } = useQuery({
        queryKey: ['deliveryList'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/deliveryList/${users._id}`);
            return res.data;
        }
    })




    return (
        <div>
            <Helmet>
                <title>Safety | DeliveryMan | List</title>
            </Helmet>
            <h1 className="text-xl lg:text-4xl font-bold text-center py-5 border-y-2 border-dashed"> My Delivery list {deliveryList.length} </h1>
            {/*  */}
            <div className="mt-16">
                <h1 className="font- mb-5">Total Delivery : {deliveryList.length}</h1>

                <Table>
                    <TableCaption className="mt-8">Your Deliver list.</TableCaption>
                    <TableHeader className="bg-[#2251849b] py-2">
                        <TableRow>
                            <TableHead className="text-left text-gray-100"></TableHead>
                            <TableHead className="text-gray-100" >Booked User{"'"}s Name</TableHead>
                            <TableHead className="text-gray-100" >Receiver Name</TableHead>
                            <TableHead className="text-gray-100" >Requested Delivery date</TableHead>

                            <TableHead className="text-gray-100"  >Aproximate Delivery Date</TableHead>
                            <TableHead className="text-gray-100" >Receiver Phone Number</TableHead>
                            <TableHead className="text-gray-100" >Receiver Address</TableHead>
                            <TableHead className="text-gray-100" >Location</TableHead>
                            <TableHead className="text-gray-100" >status</TableHead>
                            <TableHead className="text-gray-100" >Cancel</TableHead>
                            <TableHead className="text-gray-100" >Deliver</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {deliveryList.map((list, idx) => (
                            <ShowList key={idx} list={list} idx={idx} refetch={refetch} ></ShowList>

                        ))}
                    </TableBody>
                </Table>



            </div>
        </div>
    );
};

export default MyDeliveryList;