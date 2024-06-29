import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ManageButton = ({ parcelID,refetch }) => {

    const axiosSecure = useAxiosSecure();
    // const axiosPublic = useAxiosPublic()
    const { data: allusers = [] } = useQuery({
        queryKey: ['allusers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    // console.log("all user in manage button : ",allusers)
    const deliveryMans = allusers.filter((DeMan) => DeMan?.role === "deliveryMan");



    const { register, handleSubmit,reset, formState: { errors } } = useForm()
    const handleRegister = async (data) => {
        // console.log("get", data)
        // console.log("get id:", name, "===", parcelID)

        const updateInfo = { ...data, status: "On The Way", approximateDate: data.approximateDate }
        // console.log(updateInfo)
        const parcelRes = await axiosSecure.patch(`/add-deliveryMan-parcel/${parcelID}`, updateInfo);
        // console.log(parcelRes.data)
        if (parcelRes.data.modifiedCount > 0) {
            // show success popup
            refetch();
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Parcel is sent to the Delivery Man`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Manage</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Set Delivery Man</DialogTitle>
                    <DialogDescription>
                        Make changes Delivery Man here. Click SET when you are done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">

                    <form onSubmit={handleSubmit(handleRegister)} className=" w-full"  >

                        <select defaultValue="default" {...register('deliveryManId', { required: true })}
                            className="border-2 h-11 mb-5 pl-3 rounded-lg w-full s">
                            <option disabled value="default" >Select a category</option>

                            {
                                deliveryMans.map((Man, idx) => <option key={idx} value={Man?._id}>{Man?.name}</option>)
                            }


                        </select>

                        <div className="mb-4 grid w-full max-w-md items-center gap-2">
                            <Label htmlFor="approximateDate">Approximate Date <sup>*</sup>  : </Label>

                            <Input type="date" name="approximateDate" id="approximateDate" {...register("approximateDate", { required: true })} className=" text-lg " />

                            {errors.requestedDate && <span className="text-red-500">This field is required</span>}

                        </div>

                        <DialogFooter>
                            <Button type="submit">Set Delivery Man</Button>
                        </DialogFooter>
                    </form>
                </div>
                {/* <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
};

ManageButton.propTypes = {
    parcelID: PropTypes.string,
    refetch: PropTypes.func
}
export default ManageButton;