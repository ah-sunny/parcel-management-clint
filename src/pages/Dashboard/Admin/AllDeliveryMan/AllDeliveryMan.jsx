import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";


const AllDeliveryMan = () => {

    const axiosSecure = useAxiosSecure();
    // const axiosPublic = useAxiosPublic()
    const { data: allusers = [] } = useQuery({
        queryKey: ['allusers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    // console.log("all user in delivery route : ",allusers)
    const deliveryMans = allusers.filter((DeMan) => DeMan?.role === "deliveryMan");
    


    return (
        <div>
            <Helmet>
                <title>Safety | Admin | All DeliveryMan</title>
            </Helmet>
            <h1 className="text-xl lg:text-4xl bg-[#8de1c521] rounded-lg font-bold text-center py-5 border-y-2 border-dashed"> All Delivery Man</h1>

            {/*  */}
            <div className="mt-10">
                <h1 className="text-3xl font-bold italic">Total Delivery Man : {deliveryMans.length} </h1>

                {/* table */}
                <div className="mt-5">
                    <Table>
                        <TableCaption className="mt-16">A list of All Delivery Man.</TableCaption>
                        <TableHeader className="bg-[#8de1c521] rounded-3xl ">
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead className="text-left">Delivery Man{"'"}s Name</TableHead>
                                <TableHead>Phone Number</TableHead>
                                <TableHead>Number of parcel delivered</TableHead>
                                <TableHead>Average review</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {deliveryMans.map((Man, idx) => (
                                <TableRow key={idx} >
                                    <TableCell>1</TableCell>
                                    <TableCell>{Man?.name}</TableCell>
                                    <TableCell>{Man?.phoneNumber}</TableCell>
                                    <TableCell>{Man?.totalDeliveried}</TableCell>
                                    <TableCell>{Man?.review}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>

            </div>
        </div>
    );
};

export default AllDeliveryMan;