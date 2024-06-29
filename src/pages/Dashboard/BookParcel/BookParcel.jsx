import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import swal from "sweetalert";




const BookParcel = () => {
    const { user } = useAuth()
    // const [date, setDate] = React.useState(new Date())
    const [showPrice, setPrice] = useState(0);
    const axiosSecure = useAxiosSecure();
    // console.log(date)

    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: `${user?.displayName}`,
            email: `${user?.email}`,
        },
    })

    // Watch the input value
    const inputValue = watch("parcelWeight", 10);

    // Calculate price whenever input value changes
    useEffect(() => {
        const value = parseFloat(inputValue, 0);
        if (!isNaN(value)) {
            setPrice(value * 50);
        } else {
            setPrice(0);
        }
    }, [inputValue])

    const handleBookParcel = (data) => {
        // console.log("data", data )
        const today = new Date();
        const formatedToday = format(today, 'do MMM,yyyy')
        const inputDateFormat = format(new Date(data?.requestedDate), 'do MMM,yyyy')

        const bookData = { ...data, bookedPrice: showPrice, status: "pending", requestedDate: inputDateFormat, bookingDate: formatedToday, }

        axiosSecure.post('/bookParcel', bookData)
            .then(res => {
                // console.log(res.data);
                if (res.data.insertedId) {
                    swal({
                        title: "success",
                        text: "Your Parcel is Booked!",
                        icon: "success",
                        button: "okay!",
                    });
                    setPrice(0)
                    reset();
                }
            })

    }

    return (
        <div className="w-full">

            <Helmet>
                <title>Safety Move | Book a Parcel</title>
            </Helmet>
            <h1 className="text-xl lg:text-5xl font-bold text-center pb-5 border-b-2 border-dashed"> Book A Parcel </h1>
            {/* form */}
            <div className="mt-12 w-[95%] mx-auto border-2 p-3 lg:p-10 rounded-xl shadow-2xl mb-2 bg-[#8de1c521]">
                <form onSubmit={handleSubmit(handleBookParcel)}>

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
                            <Input {...register("phoneNumber", { required: true, minLength: 11, maxLength: 11 })} type="number" id="phoneNumber" placeholder="Phone Number" />
                            {errors.phoneNumber && <span className="text-red-500">Please input your 11 digited phone number</span>}
                        </div>
                        <div className="grid w-full max-w-md items-center gap-2">
                            <Label htmlFor="parceltype">Parcel Type <sup>*</sup>  : </Label>
                            <Input {...register("parceltype", { required: true, maxLength: 21 })} type="text" id="parceltype" placeholder="Parcel Type" />
                            {errors.parceltype && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>

                    {/* 3rd */}
                    <div className='w-full mt-4 pl-2'>

                        <div className="grid gap-2 w-full max-w-md ">
                            <Label htmlFor="parcelWeight">Parcel Weight <sup>*</sup> : </Label>
                            <Input {...register("parcelWeight", { required: true })} type="text" id="parcelWeight" placeholder="Enter weight in 'kg' " />
                            {errors.parcelWeight && <span className="text-red-500">This field is required, please input number</span>}
                        </div>
                    </div>
                    <Separator className="my-9 ml-5" />

                    {/* 4th row */}
                    <div className='flex flex-col lg:flex-row justify-center gap-14 w-full'>

                        <div className="grid w-full max-w-md items-center gap-2">
                            <Label htmlFor="receiverName">Receiver Name <sup>*</sup>  : </Label>
                            <Input  {...register("receiverName", { required: true })} type="text" id="receiverName" placeholder="Receiver's Name" />
                            {errors.receiverName && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="grid w-full max-w-md items-center gap-2">
                            <Label htmlFor="receiverPhoneNumber">Receiver Phone Number <sup>*</sup>  : </Label>
                            <Input {...register("receiverPhoneNumber", { required: true, minLength: 11, maxLength: 11 })} type="number" id="receiverPhoneNumber" placeholder="Receiver Phone Number" />
                            {errors.receiverPhoneNumber && <span className="text-red-500">Please input 11 digited phone number</span>}
                        </div>
                    </div>
                    {/* 5th row */}
                    <div className='flex flex-col lg:flex-row justify-center gap-14 w-full mt-4'>

                        <div className="grid w-full max-w-md items-center gap-2">
                            <Label htmlFor="parcelDeliveryAddress">Parcel Delivery Address <sup>*</sup> : </Label>
                            <Input {...register("parcelDeliveryAddress", { required: true })} type="text" id="parcelDeliveryAddress" placeholder="Parcel Delivery Address" />
                            {errors.parcelDeliveryAddress && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="grid w-full max-w-md items-center gap-2">
                            <Label htmlFor="requestedDate">Requested Delivery Date <sup>*</sup>  : </Label>
                            {/* <div className="w-full">
                                <DatePicker date={date} setDate={setDate} ></DatePicker>
                            </div> */}
                            <Input {...register("requestedDate", { required: true })} type="date" name="requestedDate" id="requestedDate" className=" text-lg " />
                            {errors.requestedDate && <span className="text-red-500">This field is required</span>}

                        </div>
                    </div>
                    {/* 6th row */}
                    <div className='flex flex-col lg:flex-row justify-center gap-14 w-full mt-4'>

                        <div className="grid w-full max-w-md items-center gap-2">
                            <Label htmlFor="latitude">Delivery Address Latitude <sup>*</sup> : </Label>
                            <Input  {...register("latitude", { required: true })} type="text" id="latitude" placeholder="latitude" />
                            {errors.latitude && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="grid w-full max-w-md items-center gap-2">
                            <Label htmlFor="longitude">Delivery Address longitude <sup>*</sup> : </Label>
                            <Input {...register("longitude", { required: true })} type="text" id="longitude" placeholder="longitude" />
                            {errors.longitude && <span className="text-red-500">This field is required</span>}
                        </div>
                    </div>
                    <h1 className="text-xl font-bold my-2 pl-2 " >Price : {showPrice} tk </h1>

                    <Button className="font-bold text-lg bg-primary w-full mt-2">
                        <input type="submit" value="BOOK" />
                    </Button>
                    {/* <input type="submit" /> */}

                </form>


            </div>
        </div>
    );
};

export default BookParcel;