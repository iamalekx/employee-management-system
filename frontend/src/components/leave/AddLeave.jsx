import React from "react";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLeave = () => {
    const { user } = useAuth();
    const [leave, setLeave] = useState({
        userId: user._id,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:3000/api/leave/add`, leave,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            // console.log(response);
            if (response.data.success) {
                // console.log(response.data)
                navigate("/employee-dashboard/leaves");
            }
        } catch (error) {
            // console.log(error);
            if (error.response && !error.response.data.success) {
                // alert(error.response.data.error);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-mg">
            <h3 className="text-3xl font-bold mb-8">Request Leave</h3>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex flex-col space-y-2">
                    <label
                        htmlFor="leaveType"
                        className="block text-md font-medium text-gray-700"
                    >
                        Leave Type
                    </label>
                    <select
                        name="leaveType"
                        onChange={handleChange}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select Leave Type</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Annual Leave">Annual Leave</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Start Date */}
                    <div className="space-y-2">
                        <label
                            htmlFor="startDate"
                            className="block text-md font-medium text-gray-700"
                        >
                            From Date
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            onChange={handleChange}
                            placeholder="Description"
                            className="mt-1 p-4 block w-full border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* End Date */}
                    <div className="space-y-2">
                        <label
                            htmlFor="endDate"
                            className="block text-md font-medium text-gray-700"
                        >
                            To Date
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            onChange={handleChange}
                            className="mt-1 p-4 block w-full border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label
                        htmlFor="reason"
                        className="block text-md font-medium text-gray-700"
                    >
                        Description
                    </label>
                    <textarea
                        name="reason"
                        placeholder="Reason"
                        onChange={handleChange}
                        rows="3"
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 cursor-pointer bg-teal-600 text-white rounded-2xl hover:bg-teal-700"
                >
                    Add Leave
                </button>
            </form>
        </div>
    );
};

export default AddLeave;
