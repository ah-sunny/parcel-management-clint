import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useBookParcel from "@/hooks/useBookParcel";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Confetti from 'react-confetti';
import { useNavigate } from "react-router-dom";


import Swal from "sweetalert2";

const FromCheckOut = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    const [congrats, setCongreats] = useState(false)
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const [bookParcel, refetch] = useBookParcel();
    const totalPrice = bookParcel.reduce((total, item) => total + item.bookedPrice, 0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const today = new Date();
        const formatedToday = format(today, 'dddd do MMM,yyyy')

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error,  } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            // console.log('payment error', error);
            setError(error.message);
        }
        else {
            // console.log('payment method', paymentMethod)
            setError('');
        }
        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            // console.log('confirm error :', confirmError)
        } else {
            // console.log("paument intent :", paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: formatedToday, // utc date convert. use moment js to 
                    parcelIds: bookParcel.map(item => item._id),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment);
                // console.log('payment saved', res.data);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Payment Successful",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setCongreats(true)
                    // console.log(congrats)
                    setTimeout(() => {
                        navigate("/dashboard/Payment-history")
                    }, 1700)
                }


            }
        }





    }

    // clientSecret and post
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    // console.log("clientSecret: ", res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, totalPrice])



    return (

        <Card className="w-fit shadow-xl mx-auto mt-10 ">
            <CardHeader>
                <CardTitle className="font-bold italic">Payment By CARD</CardTitle>
                <CardDescription className="flex gap-10 pt-5 items-center font-semibold">
                    <span>Pay amount :</span>
                    <Button variant="secondary" className="font-bold italic text-lg">$ {totalPrice}</Button>
                </CardDescription>
            </CardHeader>
            <CardContent>

                <form onSubmit={handleSubmit}>
                    <CardElement
                        className="w-96 border-2 rounded-lg p-2 "
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <Button variant="outline" className="bg-[#6cd5b2] text-black font-bold my-3" type="submit"
                        disabled={!stripe || !clientSecret} >
                        Make Payment
                    </Button>
                    <p className="text-red-600 italic font-semibold">{error}</p>
                    {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
                    <div className={congrats ? 'block' : 'hidden'} >
                        <Confetti className="absolute z-20 h-full w-full" />

                    </div>

                </form>



            </CardContent>
        </Card>


    );
};

export default FromCheckOut;