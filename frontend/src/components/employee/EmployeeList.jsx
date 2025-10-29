import React from "react";
import { Link } from "react-router-dom";

const EmployeeList = () => {
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
        </div>
    );
};

export default EmployeeList;
