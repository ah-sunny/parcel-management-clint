import { Button } from "@/components/ui/button";
import {
    TableCell,
    TableRow
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Reviews from "./Reviews";

const ShowParce = ({ parcel, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
    const { bookingDate, approximateDate, parceltype, requestedDate, _id, status,deliveryManId } = parcel;

    const [disable, setDisabled] = useState(true)

    useEffect(() => {
        if (status === 'pending') {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [status])

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/bookParcel/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel has been deleted.",
                                icon: "success"
                            });
                            // console.log("confirm",id)
                        }
                    })
            }
        });

    }

    const handleUpdate = (id) => {
        navigate(`/dashboard/updateParcel/${id}`)
    }
    return (

        <TableRow>
            <TableCell className="font-medium">{parceltype}</TableCell>
            <TableCell>{requestedDate}</TableCell>
            <TableCell>{approximateDate}</TableCell>
            <TableCell>{bookingDate}</TableCell>
            <TableCell>{deliveryManId}</TableCell>
            <TableCell className="">{status}</TableCell>
            <TableCell>

                <Button
                    disabled={disable}
                    onClick={() => handleUpdate(_id)}
                    variant="outline" >update</Button>
            </TableCell>
            <TableCell>

                <Button className="p-3"
                    disabled={disable}
                    onClick={() => handleDelete(_id)}
                    variant="destructive" > <FaRegWindowClose className="text-xl"></FaRegWindowClose> </Button>
            </TableCell>
            <TableCell>
                {
                    status === 'delivered' ?
                       <Reviews deliveryManId={deliveryManId}></Reviews>
                        : ""
                }
            </TableCell>

        </TableRow>


    );
};

ShowParce.propTypes = {
    parcel: PropTypes.object,
    refetch: PropTypes.func
}

export default ShowParce;