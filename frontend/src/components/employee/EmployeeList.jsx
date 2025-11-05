import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import { EmployeeButtons } from "../../utils/EmployeeHelper";
import {
    columns_emp,
    compactTableStyles,
} from "../../utils/EmployeeHelper";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/employees",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                console.log(response);
                if (response.data.success) {
                    let sno = 1;
                    const data = await response.data.employees.map((emp) => ({
                        _id: emp._id,
                        sno: sno++,
                        dep_name: emp.department?.dep_name,
                        name: emp.userId?.name,
                        dob: new Date(emp.dob).toDateString(),
                        profileImage: (
                            <img
                                className="rounded-full"
                                src={`http://localhost:3000/${emp.userId.profileImage}`}
                                alt={emp.userId?.name || "Employee"}
                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                        ),
                        action: <EmployeeButtons Id={emp._id} />,
                    }));
                    setEmployees(data);
                }
            } catch (error) {
                console.log(error);
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setEmpLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div className="m-8">
            <div className="text-center">
                <h3 className="text-4xl font-bold mb-6">Manage Employees</h3>
            </div>
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search By Employee Name"
                    // onChange={filterDepartments}
                    className="px-5 py-1 w-60 bg-transparent border-1 border-teal-700 rounded-2xl"
                />
                <Link
                    to="/admin-dashboard/add-employee"
                    className="px-5 py-1 bg-teal-700 rounded-xl text-white"
                >
                    Add New Employee
                </Link>
            </div>
            <div className="mt-10">
                <DataTable
                    columns={columns_emp}
                    data={employees}
                    customStyles={(compactTableStyles)}
                    pagination
                />
            </div>
        </div>
    );
};

export default EmployeeList;
