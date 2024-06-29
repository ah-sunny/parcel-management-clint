import { Progress } from "@/components/ui/progress";
import useAuth from "@/hooks/useAuth";
import PropTypes from 'prop-types';
import React from "react";
import { Navigate, useLocation } from "react-router-dom";




const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    // console.log(location.pathname);
    const [progress, setProgress] = React.useState(10)

    React.useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    return prevProgress;
                }
                return prevProgress + 20; // Increment progress 
            });
        }, 200); // 0.2 seconds

        return () => clearInterval(interval);
    }, [])

    if (loading) {
        return <Progress value={progress} className="w-56 m-auto text-center mt-16" />
    }

    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login" replace></Navigate>;
};
PrivateRoute.propTypes = {
    children: PropTypes.node
}
export default PrivateRoute;