import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })

    return (
        <div>
            <h1 className="text-xl lg:text-4xl font-bold text-center py-5 border-y-2 border-dashed italic"> Payment History</h1>

            {/*  */}
            {/*  */}
            <div className="mt-10">
                <h1 className="text-3xl font-bold italic">Total Payments  : {payments.length} </h1>

                {/* table */}
                <div className="mt-5 border-2 rounded-lg shadow-2xl py-6 bg-[#79aa9a4a]">
                    <Table>
                        <TableCaption className="mt-16">A list of payments.</TableCaption>
                        <TableHeader className="bg-[#2251849b] rounded-3xl ">
                            <TableRow >
                                <TableHead className="text-gray-100" ></TableHead>
                                <TableHead className="text-left text-gray-100">Email</TableHead>
                                <TableHead className="text-gray-100" >Price</TableHead>
                                <TableHead className="text-gray-100" >transaction Id</TableHead>
                                <TableHead className="text-gray-100" >Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.map((payment, idx) => (
                            <TableRow key={idx} >
                                <TableCell>{idx+1}</TableCell>
                                <TableCell>{payment?.email}</TableCell>
                                <TableCell>{payment?.price}</TableCell>
                                <TableCell>{payment?.transactionId}</TableCell>
                                <TableCell>{payment?.date}</TableCell>

                            </TableRow>
                             ))} 
                        </TableBody>
                    </Table>

                </div>

            </div>


        </div>
    );
};

export default PaymentHistory;