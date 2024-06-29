import { Progress } from "@/components/ui/progress";
import useAdmin from "@/hooks/useAdmin";
import useAuth from "@/hooks/useAuth";
import PropTypes from 'prop-types';
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
  

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
        }, 2000); // 0.2 seconds

        return () => clearInterval(interval);
    }, [])

    if (loading && isAdminLoading) {
        return <Progress value={progress} className="w-56 m-auto text-center mt-16" />
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login" replace></Navigate>;
};
AdminRoute.propTypes = {
    children: PropTypes.node
}

export default AdminRoute;