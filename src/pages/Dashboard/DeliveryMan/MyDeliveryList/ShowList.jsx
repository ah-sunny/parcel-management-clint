import { Button } from "@/components/ui/button";
import {
    TableCell,
    TableRow
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import Swal from "sweetalert2";


const ShowList = ({ list, idx,refetch }) => {
    const axiosSecure = useAxiosSecure()
    // console.log("list", list)
    const [disable, setDisabled] = useState(false)
    useEffect(() => {
        if (list?.status === 'cancelled' || list?.status === 'delivered' ) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [list])

    const  handleDeliver = (id)=>{

        const updateDeliverStatus = { status : "delivered" }
        // if(parcelRes.data.modifiedCount > 0){
            // show success popup
            // refetch()
            Swal.fire({
                title: "Are you sure?",
                text: "Deliver this parcel ? ",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delivered!"
            }).then( async(result) => {
                if (result.isConfirmed) {
    
                    const parcelRes = await axiosSecure.patch(`/deliveredparcel/${id}`, updateDeliverStatus);
                    // console.log(parcelRes.data)
                            if (parcelRes.data.deletedCount > 0) {
                                refetch()
                                Swal.fire({
                                    title: "delivered!",
                                    // text: "Your parcel has been deleted.",
                                    icon: "success"
                                });
                                // console.log("confirm",id)
                            }
                     
                }
            });
        }

        const  handleCancelStatus = (id)=>{

            const updateDeliverStatus = { status : "cancelled" }
                Swal.fire({
                    title: "Are you sure?",
                    text: "cancelled this parcel ? ",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, cancel!"
                }).then( async(result) => {
                    if (result.isConfirmed) {
        
                        const parcelRes = await axiosSecure.patch(`/deliveredparcel/${id}`, updateDeliverStatus);
                        // console.log(parcelRes.data)
                                if (parcelRes.data.deletedCount > 0) {
                                    refetch()
                                    Swal.fire({
                                        title: "cancelled!",
                                        // text: "Your parcel has been deleted.",
                                        icon: "success"
                                    });
                                   
                                }
                         
                    }
                });
            }
    


    return (
        <TableRow>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{list.name}</TableCell>
            <TableCell>{list.receiverName}</TableCell>
            <TableCell>{list.requestedDate}</TableCell>
            <TableCell>{list.approximateDate}</TableCell>
            <TableCell className="">{list.receiverPhoneNumber}</TableCell>
            <TableCell>
                {list.parcelDeliveryAddress}
            </TableCell>
            <TableCell>
                <Button variant="secondary" >Location</Button>
            </TableCell>
            <TableCell>{list.status}</TableCell>
            <TableCell>

                <Button className="p-3"
                    disabled={disable}
                    onClick={() => handleCancelStatus(list?._id)}
                    variant="destructive" > <FaRegWindowClose className="text-xl"></FaRegWindowClose> </Button>
            </TableCell>
            <TableCell>
                {list?.status === "delivered" ?
                    <Button variant="ghost" >delivered</Button>
                    :
                    <Button onClick={() => handleDeliver(list?._id)}
                     variant="outline" >Deliver</Button>
                }

            </TableCell>

        </TableRow>
    );
};
ShowList.propTypes = {
    list: PropTypes.object,
    refetch: PropTypes.func,
    idx: PropTypes.number
}
export default ShowList;