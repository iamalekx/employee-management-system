import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddSalary = () => {
    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null,
    });
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    // const { id } = useParams();

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments();
            setDepartments(departments);
        };
        getDepartments();
    }, []);

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value) || [];
        setEmployees(emps);
    };

    // useEffect(() => {
    //     const fetchEmployee = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `http://localhost:3000/api/employees/${id}`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${localStorage.getItem(
    //                             "token"
    //                         )}`,
    //                     },
    //                 }
    //             );
    //             // console.log(response);
    //             if (response.data.success) {
    //                 // console.log(response.data)
    //                 const employee = response.data.employee;
    //                 setEmployees((prev) => ({
    //                     ...prev,
    //                     name: employee.userId.name,
    //                     maritalStatus: employee.maritalStatus,
    //                     designation: employee.designation,
    //                     salary: employee.salary,
    //                     department: employee.department._id,
    //                 }));
    //             }
    //         } catch (error) {
    //             // console.log(error);
    //             if (error.response && !error.response.data.success) {
    //                 // alert(error.response.data.error);
    //             }
    //         }
    //     };

    //     fetchEmployee();
    // }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // const url = "http://localhost:3000"
            const response = await axios.post(
                `http://localhost:3000/api/salary/add`,
                salary,
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
            {departments && employees ? (
                <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-xl">
                    <h2 className="text-3xl font-bold mb-6">Add Salary</h2>
                    <form onChange={handleChange} onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Department */}
                            <div className="pt-8">
                                <label
                                    htmlFor="department"
                                    className="block text-md font-medium text-gray-700"
                                >
                                    Department
                                </label>
                                <select
                                    name="department"
                                    onChange={handleDepartment}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {(departments || []).map((dep) => (
                                        <option key={dep._id} value={dep._id}>
                                            {dep.dep_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Employee */}
                            <div className="pt-8 pb-4">
                                <label
                                    htmlFor="employeeId"
                                    className="block text-md font-medium text-gray-700"
                                >
                                    Employee
                                </label>
                                <select
                                    name="employeeId"
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                                    required
                                >
                                    <option value="">Select Employee</option>
                                    {(employees || []).map((emp) => (
                                        <option key={emp._id} value={emp._id}>
                                            {emp.employeeId}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Basic Salary */}
                            <div>
                                <label
                                    htmlFor="basicSalary"
                                    className="block text-md font-medium text-gray-700"
                                >
                                    Basic Salary
                                </label>
                                <input
                                    type="number"
                                    name="basicSalary"
                                    onChange={handleChange}
                                    placeholder="basic salary"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                                    required
                                />
                            </div>

                            {/* Allowances */}
                            <div>
                                <label
                                    htmlFor="allowances"
                                    className="block text-md font-medium text-gray-700"
                                >
                                    Allowances
                                </label>
                                <input
                                    type="number"
                                    name="allowances"
                                    onChange={handleChange}
                                    placeholder="allowances"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                                    required
                                />
                            </div>

                            {/* Deductions */}
                            <div>
                                <label
                                    htmlFor="deductions"
                                    className="block text-md font-medium text-gray-700"
                                >
                                    Deductions
                                </label>
                                <input
                                    type="number"
                                    name="deductions"
                                    onChange={handleChange}
                                    placeholder="deductions"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                                    required
                                />
                            </div>
                            
                            {/* Pay Date */}
                            <div>
                                <label
                                    htmlFor="payDate"
                                    className="block text-md font-medium text-gray-700"
                                >
                                    Pay Date
                                </label>
                                <input
                                    type="date"
                                    name="payDate"
                                    onChange={handleChange}
                                    placeholder="pay date"
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full  py-2 cursor-pointer mt-10 bg-teal-600 text-white rounded-2xl hover:bg-teal-700"
                        >
                            Add Salary
                        </button>
                    </form>
                </div>
            ) : (
                <span className="flex justify-self-center w-15  loading min-h-200 loading-spinner loading-xl"></span>
            )}
        </>
    );
};

export default AddSalary;
