import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState([]);
    const [depLoading, setDepLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/departments/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                if (response.data.success) {
                    // console.log(response.data)
                    setDepartment(response.data.department);
                }
            } catch (error) {
                // console.log(error);
                if (error.response && !error.response.data.success) {
                    // alert(error.response.data.error);
                }
            } finally {
                setDepLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const url = "http://localhost:3000"
            const response = await axios.put(
                `http://localhost:3000/api/departments/${id}`,
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
        <>
            {depLoading ? (
                <span className="flex justify-self-center w-15  loading min-h-200 loading-spinner loading-xl"></span>
            ) : (
                <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-xl w-150">
                    <div>
                        <h3 className="text-3xl font-bold mb-8">
                            Edit Department
                        </h3>
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
                                    value={department.dep_name}
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
                                    value={department.description}
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
                                Edit Department
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditDepartment;
