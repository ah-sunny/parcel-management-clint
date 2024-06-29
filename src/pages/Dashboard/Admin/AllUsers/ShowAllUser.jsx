import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PropTypes from 'prop-types';

const ShowAllUser = ({idx,user, handleDeliveryMan,handleMakeAdmin}) => {


    const axiosSecure = useAxiosSecure();
    const { data: allParcel = [] } = useQuery({
        queryKey: ['allParcel'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allParcel');
            return res.data;
        }
    })
    const parcelListOFOneMan = allParcel.filter((parcel) => parcel?.email === user?.email);
    // console.log("single parcel::: ",parcelListOFOneMan)
    // const totalPrice = parcelListOFOneMan.reduce((total, item) => total + item.bookedPrice, 0);
// console.log("cost: ",totalPrice)
    return (
        <TableRow className="text-center" >
                                   <TableCell>{idx+1}</TableCell>
                                    <TableCell className="font-medium">{user?.name}</TableCell>
                                    <TableCell>{user?.phoneNumber}</TableCell>
                                    <TableCell>{parcelListOFOneMan.length}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        {user?.role === "deliveryMan" ?
                                            <Button variant="ghost" >Delivery Man</Button>
                                            :
                                            <Button onClick={() => handleDeliveryMan(user)}
                                                variant="outline" >Make Delivery man</Button>
                                        }
                                    </TableCell>
                                    <TableCell >
                                        {user?.role === "admin" ?
                                            <Button variant="ghost" >Admin</Button>
                                            :
                                            <Button onClick={() => handleMakeAdmin(user)}
                                                variant="outline" >Make Admin
                                            </Button>
                                        }
                                    </TableCell>

                                </TableRow>
    );
};
ShowAllUser.propTypes = {
    user: PropTypes.object,
    handleDeliveryMan: PropTypes.func,
    handleMakeAdmin: PropTypes.func,
    idx: PropTypes.number
}

export default ShowAllUser;