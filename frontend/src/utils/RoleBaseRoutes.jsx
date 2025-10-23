import React from "react";
import { useAuth } from "../context/authContext.jsx";

const RoleBaseRoutes = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <span className="loading loading-spinner loading-xl flex justify-self-center"></span>
        );
    }
    if (!requiredRole.includes(user.role)) {
        <Navigate to="/unathorized" />;
    }

    return user ? children : <Navigate to="/login" />;
};

export default RoleBaseRoutes;
