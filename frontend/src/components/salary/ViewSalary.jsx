// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";

// const ViewSalary = () => {
//     const [salaries, setSalaries] = useState(null);
//     const [filteredSalaries, setFilteredSalaries] = useState(null);
//     const { id } = useParams();
//     let sno = 1;

//     const fetchSalaries = async () => {
//         try {
//             const response = await axios.get(
//                 `http://localhost:3000/api/salary/${id}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem(
//                             "token"
//                         )}`,
//                     },
//                 }
//             );
//             console.log(response.data);
//             if (response.data.success) {
//                 setSalaries(response.data.salary);
//                 setFilteredSalaries(response.data.salary);
//             }
//         } catch (error) {
//             console.log(error);
//             if (error.response && !error.response.data.success) {
//                 alert(error.message);
//             }
//         }
//     };

//     useEffect(() => {
//         fetchSalaries();
//     }, []);

//     const filterSalaries = (q) => {
//         const filteredRecords = salaries.filter((leave) => {
//             leave.employeeId.toLowerCase().includes(q.toLowerCase());
//         });
//         setFilteredSalaries(filteredRecords);
//     };

//     //     const q = (e.target?.value || "").toLowerCase();
//     //     const list = Array.isArray(salaries)
//     //         ? salaries
//     //         : salaries
//     //         ? [salaries]
//     //         : [];
//     //     const filteredRecords = list.filter((rec) => {
//     //         const empIdStr =
//     //             (rec.employeeId &&
//     //                 (rec.employeeId.employeeId ?? rec.employeeId)) ||
//     //             "";
//     //         return empIdStr.toString().toLowerCase().includes(q);
//     //     });
//     //     setFilteredSalaries(filteredRecords);
//     // };

//     return (
//         <>
//             {filteredSalaries === null ? (
//                 <span className="flex justify-self-center w-15  loading min-h-200 loading-spinner loading-xl"></span>
//             ) : (
//                 <div className="overflow-x-auto p-5">
//                     <div className="text-center">
//                         <h2 className="text-3xl font-bold mb-6">
//                             Salary History
//                         </h2>
//                     </div>
//                     <div className="flex justify-end my-3">
//                         <input
//                             type="text"
//                             placeholder="Search By Emp ID"
//                             className="px-5 py-1 w-60 bg-transparent border-1 border-teal-700 rounded-2xl"
//                             onChange={filterSalaries}
//                         />
//                     </div>

//                     {filteredSalaries.length > 0 ? (
//                         <table className="w-full text-md text-left text-gray-500">
//                             <thead className="text-sm text-gray-700 uppercase bg-gray-50 border-gray-200">
//                                 <tr>
//                                     <th className="px-6 py-3">SNO</th>
//                                     <th className="px-6 py-3">Emp ID</th>
//                                     <th className="px-6 py-3">Salary</th>
//                                     <th className="px-6 py-3">Allowance</th>
//                                     <th className="px-6 py-3">Deduction</th>
//                                     <th className="px-6 py-3">Total</th>
//                                     <th className="px-6 py-3">Pay Date</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredSalaries.map((salary) => {
//                                     <tr
//                                         key={salary.id}
//                                         className="bg-white
//                                         text-black border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-500 dark:hover:bg-gray-600"
//                                     >
//                                         <td className="px-6 py-3">{sno++}</td>
//                                         <td className="px-6 py-3">
//                                             {salary.employeeId?.employeeId}
//                                         </td>
//                                         <td className="px-6 py-3">
//                                             {salary.basicSalary}
//                                         </td>
//                                         <td className="px-6 py-3">
//                                             {salary.allowances}
//                                         </td>
//                                         <td className="px-6 py-3">
//                                             {salary.deductions}
//                                         </td>
//                                         <td className="px-6 py-3">
//                                             {salary.netSalary}
//                                         </td>
//                                         <td className="px-6 py-3">
//                                             {new Date(
//                                                 salary.payDate
//                                             ).toLocaleDateString()}
//                                         </td>
//                                     </tr>;
//                                 })}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <div>No Records of Salary Found</div>
//                     )}
//                 </div>
//             )}
//         </>
//     );
// };

// export default ViewSalary;

// ...existing code...
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewSalary = () => {
    const [salaries, setSalaries] = useState([]);
    const [filteredSalaries, setFilteredSalaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const fetchSalaries = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:3000/api/salary/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (response.data?.success) {
                const salaryData = Array.isArray(response.data.salary)
                    ? response.data.salary
                    : response.data.salary
                    ? [response.data.salary]
                    : [];
                setSalaries(salaryData);
                setFilteredSalaries(salaryData);
            } else {
                setSalaries([]);
                setFilteredSalaries([]);
            }
        } catch (error) {
            console.error("Fetch salaries error:", error);
            setSalaries([]);
            setFilteredSalaries([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, [id]);

    const handleFilter = (e) => {
        const q = (e.target?.value || "").toLowerCase();
        const filtered = (salaries || []).filter((rec) => {
            const empIdStr =
                (rec.employeeId &&
                    (rec.employeeId.employeeId ?? rec.employeeId)) ||
                "";
            return empIdStr.toString().toLowerCase().includes(q);
        });
        setFilteredSalaries(filtered);
    };

    return (
        <>
            {loading ? (
                <span className="flex justify-self-center w-15 loading min-h-200 loading-spinner loading-xl">
                    Loading...
                </span>
            ) : (
                <div className="overflow-x-auto p-5">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-6">
                            Salary History
                        </h2>
                    </div>
                    <div className="flex justify-end my-3">
                        <input
                            type="text"
                            placeholder="Search By Emp ID"
                            className="px-5 py-1 w-60 bg-transparent border-1 border-teal-700 rounded-2xl"
                            onChange={handleFilter}
                        />
                    </div>

                    {Array.isArray(filteredSalaries) &&
                    filteredSalaries.length > 0 ? (
                        <table className="w-full text-md text-left text-gray-500 ">
                            <thead className="text-sm text-gray-700 uppercase bg-gray-50 border-gray-200">
                                <tr>
                                    <th className="px-6 py-3">SNO</th>
                                    <th className="px-6 py-3">Emp ID</th>
                                    <th className="px-6 py-3">Salary</th>
                                    <th className="px-6 py-3">Allowance</th>
                                    <th className="px-6 py-3">Deduction</th>
                                    <th className="px-6 py-3">Total</th>
                                    <th className="px-6 py-3">Pay Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSalaries.map((salary, idx) => (
                                    <tr
                                        key={salary._id ?? idx}
                                        className="bg-white text-black border-b-0 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-500 dark:hover:bg-gray-600"
                                    >
                                        <td className="px-6 py-3">{idx + 1}</td>
                                        <td className="px-6 py-3">
                                            {salary.employeeId?.employeeId ??
                                                "N/A"}
                                        </td>
                                        <td className="px-6 py-3">
                                            {salary.basicSalary}
                                        </td>
                                        <td className="px-6 py-3">
                                            {salary.allowances}
                                        </td>
                                        <td className="px-6 py-3">
                                            {salary.deductions}
                                        </td>
                                        <td className="px-6 py-3">
                                            {salary.netSalary}
                                        </td>
                                        <td className="px-6 py-3">
                                            {salary.payDate
                                                ? new Date(
                                                      salary.payDate
                                                  ).toLocaleDateString()
                                                : "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>No Records of Salary Found</div>
                    )}
                </div>
            )}
        </>
    );
};

export default ViewSalary;
// ...existing code...
