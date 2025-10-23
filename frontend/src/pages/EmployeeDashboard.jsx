import React from "react";
import { useAuth } from "../context/authContext.jsx";

const EmployeeDashboard = () => {
    const { user } = useAuth();
    return (<div>EmployeeDashboard</div>);
};

export default EmployeeDashboard;
