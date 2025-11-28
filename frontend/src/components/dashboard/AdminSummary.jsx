import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import {
    FaBuilding,
    FaCheck,
    FaFileAlt,
    FaHourglassHalf,
    FaMoneyBill,
    FaTimesCircle,
    FaUsers,
} from "react-icons/fa";
import axios from "axios";

const AdminSummary = () => {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/dashboard/summary`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                // store the response data (not the full axios response object)
                setSummary(response.data);
            } catch (error) {
                console.log(error.message);
                if (error.response) {
                    alert(error.response.data.error);
                }
            }
        };
        fetchSummary();
    }, []);

    if (!summary) {
        return (
            <span className="flex justify-self-center w-15  loading min-h-200 loading-spinner loading-xl"></span>
        );
    }

    return (
        <div className="m-4">
            <h3 className="font-bold text-4xl my-12">Dashboard Overview</h3>
            <div className="grid grid-col-1 md:grid-cols-3 gap mt-6">
                <SummaryCard
                    icon={<FaUsers />}
                    text="Total Employees"
                    number={summary.totalEmployees}
                    color={"bg-teal-600"}
                />
                <SummaryCard
                    icon={<FaBuilding />}
                    text="Total Departments"
                    number={summary.totalDepartments}
                    color={"bg-yellow-600"}
                />
                <SummaryCard
                    icon={<FaMoneyBill />}
                    text="Monthy Pay"
                    number={new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                    }).format(summary.totalSalaries)}
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
