import React from "react";
import { Link } from "react-router-dom";

const LeaveList = () => {
    return (
        <div className="m-8">
            <div className="text-center">
                <h3 className="text-4xl font-bold mb-6">Manage Leaves</h3>
            </div>
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search By Employee Name"
                    // onChange={handleFilter}
                    className="px-5 py-1 w-60 bg-transparent border-1 border-teal-700 rounded-2xl"
                />
                <Link
                    to="/employee-dashboard/add-leave"
                    className="px-5 py-1 bg-teal-700 rounded-xl text-white"
                >
                    Add New Leave
                </Link>
            </div>
            {/* <div className="mt-10">
                <DataTable
                    columns={columns_emp}
                    data={filteredEmployees}
                    customStyles={compactTableStyles}
                    pagination
                />
            </div> */}
        </div>
    );
};

export default LeaveList;
