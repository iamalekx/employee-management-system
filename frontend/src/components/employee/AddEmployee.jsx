import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";

const AddEmployee = () => {
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Add New Employee</h2>
            <form>
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
