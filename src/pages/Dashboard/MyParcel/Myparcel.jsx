import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import useBookParcel from "@/hooks/useBookParcel";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import ShowParce from "./ShowParce";


const Myparcel = () => {

    const [bookParcel, refetch] = useBookParcel();
    const totalPrice = bookParcel.reduce((total, item) => total + item.bookedPrice, 0);

    return (
        <div className="w-full">
            <Helmet>
                <title>Safety Move | My Parcel</title>
            </Helmet>
            <h1 className="text-xl lg:text-4xl font-bold text-center py-5 border-y-2 border-dashed"> My Parccel</h1>


            {/* table */}
            <div className="mt-11 border-2 rounded-lg shadow-2xl px-1 py-6 bg-[#2c635138] ">
                <div className="flex justify-evenly text-xl lg:text-2xl font-bold mb-3 italic">
                    <h1>Total Parcel : {bookParcel.length}</h1>
                    <h1>Total Price : {totalPrice} tk</h1>
                    <h1>
                        {bookParcel.length ? <Link to="/dashboard/payment">
                            <Button variant="outline" className="bg-[#8ce0c4] text-black font-bold text-xl ">Pay Now</Button>
                        </Link> :
                            <Button disabled variant="outline" className="bg-[#8ce0c4] text-black font-bold text-xl ">Pay Now</Button>
                        }
                    </h1>
                </div>

                <Table>
                    <TableCaption className="mt-8">A list of your recent Booked Parcel.</TableCaption>
                    <TableHeader className="bg-[#2251849b]">
                        <TableRow>
                            <TableHead className="text-left text-gray-100">Parcel Type</TableHead>
                            <TableHead className="text-gray-100" >Requested Delivery Date</TableHead>
                            <TableHead className="text-gray-100" >Approximate Delivery Date</TableHead>
                            <TableHead className="text-gray-100" >Booking Date</TableHead>
                            <TableHead className="text-gray-100" >Delivery Men ID</TableHead>
                            <TableHead className="text-gray-100"  >Status</TableHead>
                            <TableHead className="text-gray-100" >Update</TableHead>
                            <TableHead className="text-gray-100" >cancel</TableHead>
                            <TableHead className="text-gray-100" >Review</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookParcel.map((parcel) => (
                            <ShowParce key={parcel._id} parcel={parcel} refetch={refetch} ></ShowParce>

                        ))}
                    </TableBody>
                </Table>



            </div>

        </div>
    );
};

export default Myparcel;