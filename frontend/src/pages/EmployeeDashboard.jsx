import React from "react";
import { useAuth } from "../context/authContext.jsx";
import EmpSidebar from "../components/employeeDashboard/EmpSidebar.jsx";
import {Outlet} from "react-router-dom";
import Navbar from "../components/dashboard/Navbar.jsx";



const EmployeeDashboard = () => {
    const { user } = useAuth();
    return (
        <div className="flex">
            <div className="">
                <EmpSidebar />
            </div>
            <div className="flex-1 ml-65 bg-gray-100 h-screen">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default EmployeeDashboard;
