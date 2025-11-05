import React from "react";
import { useAuth } from "../context/authContext.jsx";

const RoleBaseRoutes = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <span className="flex justify-self-center w-15  loading min-h-200 loading-spinner loading-xl"></span>
        );
    }
    if (!requiredRole.includes(user.role)) {
        <Navigate to="/unathorized" />;
    }

    return user ? children : <Navigate to="/login" />;
};

export default RoleBaseRoutes;
