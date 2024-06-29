import AllDeliveryMan from "@/pages/Dashboard/Admin/AllDeliveryMan/AllDeliveryMan";
import AllParcel from "@/pages/Dashboard/Admin/AllParcel/AllParcel";
import AllUsers from "@/pages/Dashboard/Admin/AllUsers/AllUsers";
import BookParcel from "@/pages/Dashboard/BookParcel/BookParcel";
import Dashboard from "@/pages/Dashboard/Dashboard";
import MyDeliveryList from "@/pages/Dashboard/DeliveryMan/MyDeliveryList/MyDeliveryList";
import MyReview from "@/pages/Dashboard/DeliveryMan/MyReview/MyReview";
import Myparcel from "@/pages/Dashboard/MyParcel/Myparcel";
import MyProfile from "@/pages/Dashboard/MyProfile/MyProfile";
import CheckOut from "@/pages/Dashboard/Payment/CheckOut";
import PaymentHistory from "@/pages/Dashboard/Payment/PaymentHistory";
import UpdateBookParcel from "@/pages/Dashboard/updateBookParcel/UpdateBookParcel";
import OurFeacture from "@/pages/home/OurFeacture";
import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
import LogIn from "../pages/login/LogIn";
import Register from "../pages/register/Register";
import AdminRoute from "./AdminRoute";
import DeliveryRoute from "./DeliveryRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([

    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element : <Home></Home>,
            },
            {
                path:'/login',
                element: <LogIn></LogIn>,
            },
            {
                path: '/register',
                element: <Register></Register>

            },
            {
                path: '/service',
                element: <OurFeacture></OurFeacture>

            },

        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "/dashboard/BookParcel",
                element: <BookParcel></BookParcel>
            },
            {
                path: "/dashboard/Myparcel",
                element: <Myparcel></Myparcel>
            },
            {
                path: "/dashboard/MyProfile",
                element: <MyProfile></MyProfile>,

            },
            {
                path: '/dashboard/updateParcel/:id',
                element: <UpdateBookParcel></UpdateBookParcel>,
                loader: ({params})=> fetch(`https://parcel-management-server-red.vercel.app/bookParcel/${params.id}`)
            },
            {
                path: "/dashboard/payment",
                element: <CheckOut></CheckOut>
            },
            {
                path: "/dashboard/Payment-history",
                element: <PaymentHistory></PaymentHistory>
            },


            // admin routes
            {
                path:"/dashboard/AllUsers",
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path:"/dashboard/AllParcel",
                element: <AdminRoute><AllParcel></AllParcel></AdminRoute>
            },
            {
                path:"/dashboard/All-Delivery-Man",
                element: <AdminRoute><AllDeliveryMan></AllDeliveryMan></AdminRoute>
            },

            // Delivery man
            {
                path: "/dashboard/My-DeliveryList",
                element: <DeliveryRoute><MyDeliveryList></MyDeliveryList></DeliveryRoute>
            },
            {
                path: "/dashboard/My-reviews",
                element: <DeliveryRoute><MyReview></MyReview></DeliveryRoute>
            },
        ]
    }
]);

export default router;