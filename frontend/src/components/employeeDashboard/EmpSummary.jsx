import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const EmpSummary = () => {
    const { user } = useAuth();
    return (
        <div className="m-10">
            <div className="rounded-2xl flex bg-white h-30 w-100">
                <div
                    className={`text-5xl flex justify-center rounded-3xl items-center w-30 text-white px-4 bg-teal-600`}
                >
                    <FaUser />
                </div>
                <div className="pl-4 flex flex-col justify-around ml-8 py-2">
                    <p className="text-lg font-semibold">Welcome Back</p>
                    <p className="text-xl font-bold">{user.name}</p>
                </div>
            </div>
        </div>
    );
};

export default EmpSummary;
