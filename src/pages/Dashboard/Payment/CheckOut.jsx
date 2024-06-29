import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import FromCheckOut from "./FromCheckOut";


// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const CheckOut = () => {
    return (
        <div className="w-full">
            <Helmet>
                <title>Safety Move | Payment</title>
            </Helmet>
            <h1 className="text-xl lg:text-4xl font-bold text-center py-5 border-y-2 border-dashed italic"> Check Out</h1>

            {/*  */}
            <div>
                <Elements stripe={stripePromise}>
                    <FromCheckOut></FromCheckOut>
                </Elements>
            </div>

        </div>
    );
};

export default CheckOut;