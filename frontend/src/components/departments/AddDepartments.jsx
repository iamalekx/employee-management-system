import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";

const AddDepartments = () => {
    const [department, setDepartment] = useState({
        dep_name: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const url = "http://localhost:3000"
            const response = await axios.post(
                "http://localhost:3000/api/department/add",
                department,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (response.data.success) {
                // console.log(response.data.success)
                navigate("/admin-dashboard/departments");
            }
        } catch (error) {
            // console.log(error)
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };
    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-xl w-150">
            <div>
                <h3 className="text-3xl font-bold mb-8">Add New Department</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="dep_name"
                            className="text-md font-medium text-gray-700"
                        >
                            Department Name
                        </label>
                        <input
                            type="text"
                            name="dep_name"
                            onChange={handleChange}
                            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter Dep Name"
                            required
                        />
                    </div>
                    <div className="my-6">
                        <label
                            htmlFor="description"
                            className="block text-md font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            name="description"
                            onChange={handleChange}
                            placeholder="Description"
                            className="mt-1 p-4 block w-full border border-gray-300 rounded-md"
                            rows="5"
                            id=""
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 cursor-pointer bg-teal-600 text-white rounded-2xl hover:bg-teal-700"
                    >
                        Add Department
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddDepartments;
