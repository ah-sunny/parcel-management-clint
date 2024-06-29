import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import ShowAllUser from "./ShowAllUser";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    // const axiosPublic = useAxiosPublic()
    const { data: allusers = [], refetch } = useQuery({
        queryKey: ['allusers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    // console.log("all user: ",allusers)
    // 
    const handleMakeAdmin = user => {

        Swal.fire({
            title: "Are you sure?",
            text: "Do You Want To make him 'Admin' ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Admin!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users/admin/${user._id}`)
                        .then(res => {
                            // console.log(res.data)
                            if (res.data.modifiedCount > 0) {
                                refetch()
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'User Becomes an Admin.',
                                    showConfirmButton: false,
                                    timer: 1000
                                });
                            }
                        })
                }
            })
    }
    const handleDeliveryMan = user => {

        Swal.fire({
            title: "Are you sure?",
            text: 'Do You Want To make him "Delivery Man" ',
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delivery Man!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users/deliveryMan/${user._id}`)
                        .then(res => {
                            // console.log(res.data)
                            if (res.data.modifiedCount > 0) {
                                refetch()
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'User Becomes an "Delivery Man".',
                                    showConfirmButton: false,
                                    timer: 1000
                                });
                            }
                        })
                }
            })
    }


    return (
        <div>
            <Helmet>
                <title>Safety | Admin | All Users</title>
            </Helmet>
            <h1 className="text-xl lg:text-4xl font-bold text-center py-5 border-y-2 border-dashed"> All Users</h1>

            {/*  */}

            <div className="mt-10">
                <h1 className="text-3xl font-bold ">Total Users : {allusers.length} </h1>

                {/* table */}
                <div className="mt-5">
                    <Table>
                        <TableCaption className="mt-16">A list of your recent Booked Parcel.</TableCaption>
                        <TableHeader className="bg-slate-100">
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead className="text-left">User{"'"}s Name</TableHead>
                                <TableHead>Phone Number</TableHead>
                                <TableHead>Number of parcel Booked</TableHead>
                                <TableHead>Total Spent Amount</TableHead>
                                <TableHead>Make Delivery Men </TableHead>
                                <TableHead>Make Admin</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allusers.map((user, idx) => (
                                <ShowAllUser key={idx} idx={idx} user={user}
                                handleDeliveryMan={handleDeliveryMan} 
                                handleMakeAdmin={handleMakeAdmin}
                                 ></ShowAllUser>
                                // <TableRow key={user._id} className="text-center" >
                                //     <TableCell>{idx + 1}</TableCell>
                                //     <TableCell className="font-medium">{user?.name}</TableCell>
                                //     <TableCell>{user?.phoneNumber}</TableCell>
                                //     <TableCell></TableCell>
                                //     <TableCell></TableCell>
                                //     <TableCell>
                                //         {user?.role === "deliveryMan" ?
                                //             <Button variant="ghost" >Delivery Man</Button>
                                //             :
                                //             <Button onClick={() => handleDeliveryMan(user)}
                                //                 variant="outline" >Make Delivery man</Button>
                                //         }
                                //     </TableCell>
                                //     <TableCell >
                                //         {user?.role === "admin" ?
                                //             <Button variant="ghost" >Admin</Button>
                                //             :
                                //             <Button onClick={() => handleMakeAdmin(user)}
                                //                 variant="outline" >Make Admin
                                //             </Button>
                                //         }
                                //     </TableCell>

                                // </TableRow>
                            ))}
                          {/* { allusers.map(i=> <p key={i._id} >{i.name} </p> )} */}
                        </TableBody>
                    </Table>



                </div>

            </div>
        </div>
    );
};

export default AllUsers;