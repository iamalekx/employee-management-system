import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import axios from "axios";

// const LeaveList = () => {
//     const { user } = useAuth();
//     const [leaves, setLeaves] = useState([]);
//     let sno = 1;

//     const fetchLeaves = async () => {
//         try {
//             const response = await axios.get(
//                 `http://localhost:3000/api/leave/${user._id}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem(
//                             "token"
//                         )}`,
//                     },
//                 }
//             );
//             console.log("Leaves response:", response);
//             if (response.data.success) {
//                 console.log("Leaves response:", response);
//                 setLeaves(response.data.leaves);
//             }
//         } catch (error) {
//             if (error.response && !error.response.data.success) {
//                 alert("Error fetching leaves: " + error.response.data.error);
//             }
//         }
//     };

//     useEffect(() => {
//         fetchLeaves();
//     }, []);

//     return (
//         <div className="m-8">
//             <div className="text-center">
//                 <h3 className="text-4xl font-bold mb-6">Manage Leaves</h3>
//             </div>
//             <div className="flex justify-between items-center">
//                 <input
//                     type="text"
//                     placeholder="Search By Employee Name"
//                     // onChange={handleFilter}
//                     className="px-5 py-1 w-60 bg-transparent border-1 border-teal-700 rounded-2xl"
//                 />
//                 <Link
//                     to="/employee-dashboard/add-leave"
//                     className="px-5 py-1 bg-teal-700 rounded-xl text-white"
//                 >
//                     Add New Leave
//                 </Link>
//             </div>
//             <div className="mt-10">
//                 <table className="w-full text-md text-left text-gray-500 ">
//                     <thead className="text-sm text-gray-700 uppercase bg-gray-50 border-gray-200">
//                         <tr>
//                             <th className="px-6 py-3">SNO</th>
//                             <th className="px-6 py-3">Leave Type</th>
//                             <th className="px-6 py-3">From</th>
//                             <th className="px-6 py-3">To</th>
//                             <th className="px-6 py-3">Description</th>
//                             <th className="px-6 py-3">Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {leaves.map(leave => (
//                             <tr
//                                 key={leave._id}
//                                 className="bg-white text-black border-b-0 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-500 dark:hover:bg-gray-600"
//                             >
//                                 <td className="px-6 py-3">{sno++}</td>
//                                 <td className="px-6 py-3">{leave.leaveType}</td>
//                                 <td className="px-6 py-3">
//                                     {
//                                         new Date(leave.startDate)
//                                             .toLocaleDateString()
//                                     }
//                                 </td>
//                                 <td className="px-6 py-3">
//                                     {new Date(leave.endDate).toLocaleDateString()}
//                                 </td>
//                                 <td className="px-6 py-3">{leave.reason}</td>
//                                 <td className="px-6 py-3">{leave.status}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

const LeaveList = () => {
    const { user } = useAuth();
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLeaves = async () => {
        if (!user?._id) return;
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:3000/api/leave/${user._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            console.log("Leaves response.data:", response.data);
            // adapt to your API shape
            const list = response.data?.leaves ?? response.data?.data ?? [];
            setLeaves(Array.isArray(list) ? list : list ? [list] : []);
        } catch (error) {
            console.error("Error fetching leaves:", error?.response ?? error);
            setLeaves([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, [user?._id]);

    return (
        <div className="m-8">
            <div className="text-center">
                <h3 className="text-4xl font-bold mb-6">Manage Leaves</h3>
            </div>
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search By Employee Name"
                    className="px-5 py-1 w-60 bg-transparent border-1 border-teal-700 rounded-2xl"
                />
                <Link
                    to="/employee-dashboard/add-leave"
                    className="px-5 py-1 bg-teal-700 rounded-xl text-white"
                >
                    Add New Leave
                </Link>
            </div>
            <div className="mt-10">
                {loading ? (
                    <span className="flex justify-self-center w-15 loading min-h-200 loading-spinner loading-xl">
                        Loading...
                    </span>
                ) : !Array.isArray(leaves) || leaves.length === 0 ? (
                    <div className="text-center py-8">No leaves found.</div>
                ) : (
                    <table className="w-full text-md text-left text-gray-500">
                        <thead className="text-sm text-gray-700 uppercase bg-gray-50 border-gray-200">
                            <tr>
                                <th className="px-6 py-3">SNO</th>
                                <th className="px-6 py-3">Leave Type</th>
                                <th className="px-6 py-3">From</th>
                                <th className="px-6 py-3">To</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaves.map((lv, idx) => (
                                <tr
                                    key={lv._id ?? idx}
                                    className="bg-white text-black border-b-0 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="px-6 py-3">{idx + 1}</td>
                                    <td className="px-6 py-3">
                                        {lv.leaveType ?? "—"}
                                    </td>
                                    <td className="px-6 py-3">
                                        {lv.startDate
                                            ? new Date(
                                                  lv.startDate
                                              ).toLocaleDateString()
                                            : "—"}
                                    </td>
                                    <td className="px-6 py-3">
                                        {lv.endDate
                                            ? new Date(
                                                  lv.endDate
                                              ).toLocaleDateString()
                                            : "—"}
                                    </td>
                                    <td className="px-6 py-3">
                                        {lv.reason ?? "—"}
                                    </td>
                                    <td className="px-6 py-3">
                                        {lv.status ?? "Pending"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default LeaveList;
