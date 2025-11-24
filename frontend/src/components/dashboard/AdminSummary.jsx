import React from "react";
import SummaryCard from "./SummaryCard";
import { FaBuilding, FaCheck, FaFileAlt, FaHourglassHalf, FaMoneyBill, FaTimesCircle, FaUsers } from "react-icons/fa";

const AdminSummary = () => {
    return (
        <div className="m-4">
            <h3 className="font-bold text-4xl my-12">Dashboard Overview</h3>
            <div className="grid grid-col-1 md:grid-cols-3 gap mt-6">
                <SummaryCard
                    icon={<FaUsers />}
                    text="Total Employees"
                    number={13}
                    color={"bg-teal-600"}
                />
                <SummaryCard
                    icon={<FaBuilding />}
                    text="Total Departments"
                    number={5}
                    color={"bg-yellow-600"}
                />
                <SummaryCard
                    icon={<FaMoneyBill />}
                    text="Monthy Pay"
                    number={"$10000"}
                    color={"bg-red-600"}
                />
            </div>
            {/* <div className="flex flex-col mt-20">
                <h3 className="font-bold text-3xl my-2 text-center mb-10">
                    Leave Details
                </h3>
                <div className="grid grid-col-2 md:grid-cols-2 gap mt-6 space-y-8">
                <SummaryCard
                    icon={<FaFileAlt />}
                    text="Leave Applied"
                    number={5}
                    color={"bg-cyan-600"}
                />
                <SummaryCard
                    icon={<FaCheck />}
                    text="Leave Approved"
                    number={2}
                    color={"bg-green-600"}
                />
                <SummaryCard
                    icon={<FaHourglassHalf />}
                    text="Leave Pending"
                    number={1}
                    color={"bg-yellow-400"}
                />
                <SummaryCard
                    icon={<FaTimesCircle />}
                    text="Leave Rejected"
                    number={2}
                    color={"bg-red-600"}
                />
                </div>
            </div> */}
        </div>
    );
};

export default AdminSummary;
