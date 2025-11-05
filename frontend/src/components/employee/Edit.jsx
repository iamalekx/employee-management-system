import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const Edit = () => {
    const [employee, setEmployee] = useState({
        name: "",
        maritalStatus: "",
        designation: "",
        salary: 0,
        department: "",
    });
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/employees/${id}`,
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
                    const employee = response.data.employee;
                    setEmployee((prev) => ({
                        ...prev,
                        name: employee.userId.name,
                        maritalStatus: employee.maritalStatus,
                        designation: employee.designation,
                        salary: employee.salary,
                        department: employee.department._id,
                    }));
                }
            } catch (error) {
                // console.log(error);
                if (error.response && !error.response.data.success) {
                    // alert(error.response.data.error);
                }
            }
        };

        fetchEmployee();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const url = "http://localhost:3000"
            const response = await axios.put(
                `http://localhost:3000/api/employees/${id}`,
                employee,
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
    };

    return (
        <>
            {departments && employee ? (
                <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-xl">
                    <h2 className="text-3xl font-bold mb-6">Edit Employee</h2>
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
                                    value={employee.name}
                                    placeholder="Insert Name"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                                    required
                                />
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
                                    value={employee.maritalStatus}
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
                                    value={employee.designation}
                                    placeholder="Designation"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                                    required
                                />
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
                                    value={employee.salary}
                                    placeholder="Salary"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                                    required
                                />
                            </div>
                        </div>

                        {/* Department */}
                        <div className="pt-8 pb-4">
                            <label
                                htmlFor="department"
                                className="block text-md font-medium text-gray-700"
                            >
                                Department
                            </label>
                            <select
                                name="department"
                                onChange={handleChange}
                                value={employee.department}
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
                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full py-2 cursor-pointer mt-6 bg-teal-600 text-white rounded-2xl hover:bg-teal-700"
                        >
                            Edit Employee
                        </button>
                    </form>
                </div>
            ) : (
                <span className="flex justify-self-center w-15  loading min-h-200 loading-spinner loading-xl"></span>
            )}
        </>
    );
};

export default Edit;
