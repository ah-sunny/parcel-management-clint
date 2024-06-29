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
import ManageButton from "./ManageButton";

const AllParcel = () => {
    // const [bookParcel,] = useBookParcel()

    const axiosSecure = useAxiosSecure();
    const { data: allParcel = [],refetch } = useQuery({
        queryKey: ['allParcel'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allParcel');
            return res.data;
        }
    })
    // console.log("all parcel : ",allParcel)




    return (
        <div>
            <Helmet>
                <title>Safety | Admin | All Parcel</title>
            </Helmet>
            <h1 className="text-xl lg:text-4xl bg-[#8de1c521] rounded-lg font-bold text-center py-5 border-y-2 border-dashed"> All Parcel</h1>

            {/*  */}
            <div className="mt-10">
                <h1 className="text-3xl font-bold italic">Total Parcel : {allParcel.length} </h1>

                {/* table */}
                <div className="mt-5">
                    <Table>
                        <TableCaption className="mt-16">A list of All Booked Parcel.</TableCaption>
                        <TableHeader className="bg-[#8de1c521] rounded-3xl ">
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead className="text-left">User{"'"}s Name</TableHead>
                                <TableHead>User{"'"}s Phone Number</TableHead>
                                <TableHead>Booking Date</TableHead>
                                <TableHead>Requested Delivery Date</TableHead>
                                <TableHead>Cost</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allParcel.map((parcel, idx) => (
                                <TableRow key={idx} >
                                    <TableCell>{idx + 1}</TableCell>
                                    <TableCell>{parcel?.name}</TableCell>
                                    <TableCell>{parcel?.phoneNumber}</TableCell>
                                    <TableCell>{parcel?.bookingDate}</TableCell>
                                    <TableCell>{parcel?.requestedDate}</TableCell>
                                    <TableCell>$ {parcel?.bookedPrice}</TableCell>
                                    <TableCell>{parcel?.status}</TableCell>
                                    <TableCell >
                                        <ManageButton refetch={refetch} parcelID={parcel._id} ></ManageButton>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>

            </div>
        </div>
    );
};

export default AllParcel;