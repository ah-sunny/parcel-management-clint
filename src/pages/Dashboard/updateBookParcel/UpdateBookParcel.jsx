import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { addDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateBookParcel = () => {
    const parcel = useLoaderData();
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [showPrice, setPrice] = useState(0);

    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: `${user?.displayName}`,
            email: `${user?.email}`,
        },
    })
    // Watch the input value
    const inputValue = watch("parcelWeight", 10);

    // Calculate price whenever input value changes
    useEffect(() => {
        const value = parseFloat(inputValue, 10);
        if (!isNaN(value)) {
            setPrice(value * 50);
        } else {
            setPrice(0);
        }
    }, [inputValue])

    // useEffect(()=>{
    //     const loadedDate = parcel?.requestedDate;
    //     const normalFormatdate = format(loadedDate, "yyyy-MM-dd");
    //     console.log(normalFormatdate);
    // },[])


    const handleUpdateParcel = async (data) => {

        const today = new Date();
        const formatedToday = format(today, 'do MMM,yyyy') //8th Jun,2024
        const approxDate = addDays(today, 5);
        const approxDateFormat = format(approxDate, 'do MMM,yyyy') //13th Jun,2024

        const inputDateFormat = format(new Date(data?.requestedDate), 'do MMM,yyyy') //17th Jun,2024

        // console.log("today date : ", formatedToday, " =Approximate : ", approxDateFormat, "input date : ", inputDateFormat)

        // const x = parseISO(formatedToday)
        // const normalFormatdate = format(formatedToday, "yyyy-MM-dd");
        // console.log(normalFormatdate);


        const updateBookData = { ...data, bookedPrice: showPrice, status: "pending", requestedDate: inputDateFormat, bookingDate: formatedToday, approximateDate: approxDateFormat }
        // console.log(updateBookData)
        const parcelId = parcel?._id
        // console.log(parcelId)

        const parcelRes = await axiosSecure.patch(`/bookParcel/${parcelId}`, updateBookData);
        // console.log(parcelRes.data)
        if (parcelRes.data.modifiedCount > 0) {
            // show success popup
            // reset();
            Swal.fire({
                position: "top-end",
                icon: "updated",
                title: `Updated Your parcel Info`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <div className="w-full">
            <Helmet>
                <title>Safety Move | Update parcel</title>
            </Helmet>
            <h1 className="text-xl lg:text-4xl font-bold text-center py-5 border-y-2 border-dashed"> Update Your Parccel </h1>

            {/* update form */}
            <div>


                <div className="mt-12 w-[95%] mx-auto border-2 p-3 lg:p-10">
                    <form onSubmit={handleSubmit(handleUpdateParcel)}>

                        {/* 1st row */}
                        <div className='flex flex-col lg:flex-row justify-center gap-14 w-full'>

                            <div className="grid w-full max-w-md items-center gap-2">
                                <Label htmlFor="name">Name : </Label>
                                <Input defaultValue={user.displayName} {...register("name")} type="text" id="name" placeholder="Name" disabled />
                            </div>
                            <div className="grid w-full max-w-md items-center gap-2">
                                <Label htmlFor="email">Email : </Label>
                                <Input defaultValue={user.email} {...register("email")} type="email" id="email" placeholder="Email" disabled />
                            </div>
                        </div>

                        {/* 2nd row */}
                        <div className='flex flex-col lg:flex-row justify-center gap-14 w-full mt-4'>

                            <div className="grid w-full max-w-md items-center gap-2">
                                <Label htmlFor="phoneNumber">Phone Number <sup>*</sup>  : </Label>
                                <Input defaultValue={parcel.phoneNumber} {...register("phoneNumber", { required: true, minLength: 11, maxLength: 11 })} type="number" id="phoneNumber" placeholder="Phone Number" />
                                {errors.phoneNumber && <span className="text-red-500">Please input your 11 digited phone number</span>}
                            </div>
                            <div className="grid w-full max-w-md items-center gap-2">
                                <Label htmlFor="parceltype">Parcel Type <sup>*</sup>  : </Label>
                                <Input defaultValue={parcel.parceltype} {...register("parceltype", { required: true, maxLength: 21 })} type="text" id="parceltype" placeholder="Parcel Type" />
                                {errors.phoneNumber && <span className="text-red-500">This field is required</span>}
                            </div>
                        </div>

                        {/* 3rd */}
                        <div className='w-full mt-4 pl-2'>

                            <div className="grid gap-2 w-full max-w-md ">
                                <Label htmlFor="parcelWeight">Parcel Weight <sup>*</sup> : </Label>
                                <Input defaultValue={parcel.parcelWeight} {...register("parcelWeight")} type="text" id="parcelWeight" placeholder="Enter weight in 'kg' " />
                                {/* <input    type="number" id="parcelWeight" placeholder="Enter weight in 'kg'" className="border-2 p-2 rounded-md"  /> */}

                                {errors.parcelWeight && <span className="text-red-500">This field is required, please input number</span>}

                                {
                                    showPrice !== 0 && <h1 className="font-semibold text-sm text-muted-foreground"> Price : {showPrice} tk</h1>
                                }
                            </div>
                        </div>
                        <Separator className="my-9 ml-5" />

                        {/* 4th row */}
                        <div className='flex flex-col lg:flex-row justify-center gap-14 w-full'>

                            <div className="grid w-full max-w-md items-center gap-2">
                                <Label htmlFor="receiverName">Receiver Name <sup>*</sup>  : </Label>
                                <Input defaultValue={parcel.receiverName} {...register("receiverName", { required: true })} type="text" id="receiverName" placeholder="Receiver's Name" />
                                {errors.receiverName && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="grid w-full max-w-md items-center gap-2">
                                <Label htmlFor="receiverPhoneNumber">Receiver Phone Number <sup>*</sup>  : </Label>
                                <Input defaultValue={parcel.receiverPhoneNumber} {...register("receiverPhoneNumber", { required: true, minLength: 11, maxLength: 11 })} type="number" id="receiverPhoneNumber" placeholder="Receiver Phone Number" />
                                {errors.receiverPhoneNumber && <span className="text-red-500">Please input 11 digited phone number</span>}
                            </div>
                        </div>
                        {/* 5th row */}
                        <div className='flex flex-col lg:flex-row justify-center gap-14 w-full mt-4'>

                            <div className="grid w-full max-w-md items-center gap-2">
                                <Label htmlFor="parcelDeliveryAddress">Parcel Delivery Address <sup>*</sup> : </Label>
                                <Input defaultValue={parcel?.parcelDeliveryAddress} {...register("parcelDeliveryAddress", { required: true })} type="text" id="parcelDeliveryAddress" placeholder="Parcel Delivery Address" />
                                {errors.parcelDeliveryAddress && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="grid w-full max-w-md items-center gap-2">
                                <Label htmlFor="requestedDate">Requested Delivery Date <sup>*</sup>  : </Label>

                                <Input defaultValue={parcel?.requestedDate} type="date" name="requestedDate" id="requestedDate" {...register("requestedDate", { required: true })} className=" text-lg " />

                                {errors.requestedDate && <span className="text-red-500">This field is required</span>}

                            </div>
                        </div>
                        {/* 6th row */}
                        <div className='flex flex-col lg:flex-row justify-center gap-14 w-full mt-4'>

                            <div className="grid w-full max-w-md items-center gap-2">
                                <Label htmlFor="latitude">Delivery Address Latitude <sup>*</sup> : </Label>
                                <Input defaultValue={parcel.latitude}  {...register("latitude", { required: true })} type="text" id="latitude" placeholder="latitude" />
                                {errors.latitude && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="grid w-full max-w-md items-center gap-2">
                                <Label htmlFor="longitude">Delivery Address longitude <sup>*</sup> : </Label>
                                <Input defaultValue={parcel.longitude} {...register("longitude", { required: true })} type="text" id="longitude" placeholder="longitude" />
                                {errors.longitude && <span className="text-red-500">This field is required</span>}
                            </div>
                        </div>
                        <h1 className="text-xl font-bold my-2 pl-2 " >Price : {parcel?.bookedPrice} tk </h1>

                        <Button className="font-bold text-lg bg-primary w-full mt-2">
                            <input type="submit" value="Update" />
                        </Button>


                    </form>


                </div>
            </div>

        </div>
    );
};

export default UpdateBookParcel;