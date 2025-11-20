import React from "react";

const LeaveTable = () => {
    return (
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
        </div>
    );
};

export default LeaveTable;
