import React, { useEffect, useState } from "react";
import { LeaveButtons, columns } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const LeaveTable = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLeaves = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "http://localhost:3000/api/leave",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            console.log("Leave GET response:", response.data);
            if (
                response.data &&
                response.data.success &&
                Array.isArray(response.data.leaves)
            ) {
                let sno = 1;
                const data = response.data.leaves.map((leave) => ({
                    _id: leave._id,
                    sno: sno++,
                    employeeId: leave.employeeId?.employeeId ?? "—",
                    name: leave.employeeId?.userId?.name ?? "—",
                    leaveType: leave.leaveType,
                    department: leave.employeeId?.department?.dep_name ?? "—",
                    days:
                        new Date(leave.endDate).getDate() -
                        new Date(leave.startDate).getDate(),
                    status: leave.status,
                    action: <LeaveButtons Id={leave._id} />,
                }));
                setLeaves(data);
            } else {
                setLeaves([]);
            }
        } catch (error) {
            console.error("Error fetching leaves:", error?.response ?? error);
            setLeaves([]);
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchLeaves();
    }, []);

    return (
        <>
            <div className="p-6">
                <div className="text-center">
                    <h3 className="text-4xl font-bold mb-6">Manage Leaves</h3>
                </div>
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        placeholder="Search By Employee Name"
                        className="px-5 py-1 w-60 bg-transparent border-1 border-teal-700 rounded-2xl"
                    />
                    <div className="flex gap-4">
                        <button className="inline-flex items-center rounded-2xl bg-yellow-100 px-3 py-1 text-md font-medium text-yellow-800 inset-ring inset-ring-yellow-600/20 hover:bg-yellow-200 hover:text-yellow-900 focus:z-10 focus:outline-offset-0 cursor-pointer">
                            Pending
                        </button>
                        <button className="inline-flex items-center rounded-2xl bg-green-100 px-3 py-1 text-md font-medium text-green-800 inset-ring inset-ring-teal-600/20 hover:bg-green-200 hover:text-green-900 focus:z-10 focus:outline-offset-0 cursor-pointer">
                            Approved
                        </button>
                        <button className="inline-flex items-center rounded-2xl bg-red-100 px-3 py-1 text-md font-medium text-red-800 inset-ring inset-ring-yellow-600/20 hover:bg-red-200 hover:text-red-900 focus:z-10 focus:outline-offset-0 cursor-pointer">
                            Rejected
                        </button>
                    </div>
                </div>
                {loading ? (
                    <span className="flex justify-self-center w-15  loading min-h-200 loading-spinner loading-xl"></span>
                ) : Array.isArray(leaves) && leaves.length > 0 ? (
                    <DataTable columns={columns} data={leaves} pagination />
                ) : (
                    <div className="text-center py-8">
                        No leave records found.
                    </div>
                )}
            </div>
        </>
    );
};

export default LeaveTable;
