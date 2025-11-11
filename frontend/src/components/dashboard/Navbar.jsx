import React from "react";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    return (
        <div className="flex h-20 justify-between bg-gray-200 rounded-2xl m-3 py-4 px-5">
            <p className="flex items-center text-lg font-medium">
                Welcome {user.name}
            </p>
            <button className="px-4 py-1 rounded-3xl bg-teal-700 hover:bg-teal-800 cursor-pointer text-white" onClick={logout}>Logout</button>
        </div>
    );
};

export default Navbar;