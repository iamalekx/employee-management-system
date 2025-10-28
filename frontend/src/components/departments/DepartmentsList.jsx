import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const customStyles = {
    headCells: {
        style: {
            fontSize: "14px",
            fontWeight: "bold",
        },
    },
};
const DepartmentsList = () => {
    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false);

    useEffect(() => {
        const fetchDepartments = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/departments",
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
                    let sno = 1;
                    const data = await response.data.departments.map((dep) => ({
                        _id: dep._id,
                        sno: sno++,
                        dep_name: dep.dep_name,
                        action: <DepartmentButtons _id={dep._id}/>,
                    }));
                    setDepartments(data);
                }
            } catch (error) {
                console.log(error);
                if (error.response && !error.response.data.success) {
                    // alert(error.response.data.error);
                }
            } finally {
                setDepLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    return (
        <>
            {depLoading ? (
                <span className="loading loading-spinner loading-xl"></span>
            ) : (
                <div className="m-8">
                    <div className="text-center">
                        <h3 className="text-4xl font-bold mb-6">
                            Manage Departments
                        </h3>
                    </div>
                    <div className="flex justify-between items-center">
                        <input
                            type="text"
                            placeholder="Search By Dep Name"
                            className="px-5 py-1 bg-transparent border-1 border-teal-700 rounded-2xl"
                        />
                        <Link
                            to="/admin-dashboard/add-department"
                            className="px-5 py-1 bg-teal-700 rounded-xl text-white"
                        >
                            Add New Department
                        </Link>
                    </div>
                    <div className="rounded-2xl mt-6">
                        <DataTable columns={columns} data={departments} customStyles={customStyles}/>
                    </div>
                </div>
            )}
        </>
    );
};

export default DepartmentsList;
