import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { toFormData } from "axios";

const AddEmployee = () => {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value}));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key])
        })

        try {
            // const url = "http://localhost:3000"
            const response = await axios.post(
                "http://localhost:3000/api/employee/add",
                formDataObj,
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
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            // console.log(error)
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Add New Employee</h2>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                {/* Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-md font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            placeholder="Insert Name"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-md font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Insert Email"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                            required
                        />
                    </div>

                    {/* Employee ID */}
                    <div>
                        <label
                            htmlFor="employeeId"
                            className="block text-md font-medium text-gray-700"
                        >
                            Employee ID
                        </label>
                        <input
                            type="text"
                            name="employeeId"
                            onChange={handleChange}
                            placeholder="Employee ID"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                            required
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label
                            htmlFor="dob"
                            className="block text-md font-medium text-gray-700"
                        >
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            name="dob"
                            onChange={handleChange}
                            placeholder="DOB"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label
                            htmlFor="gender"
                            className="block text-md font-medium text-gray-700"
                        >
                            Gender
                        </label>
                        <select
                            name="gender"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    {/* Marital Status */}
                    <div>
                        <label
                            htmlFor="maritalStatus"
                            className="block text-md font-medium text-gray-700"
                        >
                            Marital Status
                        </label>
                        <select
                            name="maritalStatus"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </div>

                    {/* Designation */}
                    <div>
                        <label
                            htmlFor="designation"
                            className="block text-md font-medium text-gray-700"
                        >
                            Designation
                        </label>
                        <input
                            type="text"
                            name="designation"
                            onChange={handleChange}
                            placeholder="Designation"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                            required
                        />
                    </div>

                    {/* Department */}
                    <div>
                        <label
                            htmlFor="department"
                            className="block text-md font-medium text-gray-700"
                        >
                            Department
                        </label>
                        <select
                            name="department"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                            required
                        >
                            <option value="">Select Department</option>
                            {departments.map((dep) => (
                                <option key={dep._id} value={dep._id}>
                                    {dep.dep_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Salary */}
                    <div>
                        <label
                            htmlFor="salary"
                            className="block text-md font-medium text-gray-700"
                        >
                            Salary
                        </label>
                        <input
                            type="number"
                            name="salary"
                            onChange={handleChange}
                            placeholder="Salary"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-md font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            placeholder="********"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                            required
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label
                            htmlFor="role"
                            className="block text-md font-medium text-gray-700"
                        >
                            Role
                        </label>
                        <select
                            name="role"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>

                    {/* Image */}
                    <div>
                        <label
                            htmlFor="image"
                            className="block text-md font-medium text-gray-700"
                        >
                            Upload Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            placeholder="Upload Image"
                            accept="image/*"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                        />
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-2 cursor-pointer mt-6 bg-teal-600 text-white rounded-2xl hover:bg-teal-700"
                >
                    Add Employee
                </button>
            </form>
        </div>
    );
};

export default AddEmployee;
