import React from "react";
import { useAuth } from "../context/authContext.jsx";
import AdminSidebar from "../components/dashboard/AdminSidebar.jsx";
import Navbar from "../components/dashboard/Navbar.jsx";
import AdminSummary from "../components/dashboard/AdminSummary.jsx";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div className="flex">
            <div className="">
                <AdminSidebar />
            </div>
            <div className="flex-1 ml-65 bg-gray-100 h-screen">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;
