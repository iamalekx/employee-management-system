import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns_emp = [
    {
        name: "S No",
        selector: (row) => row.sno,
        sortable: true,
        width: "200px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "200px",
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        sortable: true,
        width: "200px",
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        sortable: true,
        width: "200px",
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "200px",
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: "true",
        width: "300px",
    },
];

export const compactTableStyles = {
    rows: { style: { minHeight: "34px" } },
    headCells: {
        style: {
            paddingTop: "4px",
            paddingBottom: "4px",
            paddingLeft: "8px",
            paddingRight: "8px",
            fontSize: "14px",
            lineHeight: 1.2,
            fontWeight: "bold",
        },
    },
    cells: {
        style: {
            paddingTop: "4px",
            paddingBottom: "4px",
            paddingLeft: "8px",
            paddingRight: "8px",
            fontSize: "0.9rem",
            lineHeight: 1.2,
        },
    },
    pagination: {
        style: { paddingTop: "2px", paddingBottom: "2px", minHeight: "30px" },
    },
};

export const fetchDepartments = async () => {
    let departments;
    try {
        const response = await axios.get(
            "http://localhost:3000/api/departments",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.data.success) {
            // console.log(response.data)
            departments = response.data.departments;
        }
    } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
            // alert(error.response.data.error);
        }
    }
    return departments;
};


// employees for salary form 
export const getEmployees = async (id) => {
    let employees;
    try {
        const response = await axios.get(
            `http://localhost:3000/api/employees/department/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        // console.log(response);
        if (response.data.success) {
            console.log(response.data)
            employees = response.data.employee;
        }
    } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
            // alert(error.response.data.error);
        }
    }
    return employees;
};

export const EmployeeButtons = ({id}) => {
    const navigate = useNavigate();

    return (
        <div className="flex space-x-2">
            <button
                className="inline-flex items-center rounded-2xl bg-teal-100 px-3 py-1 text-xs font-medium text-teal-800 inset-ring inset-ring-teal-600/20 hover:bg-teal-200 hover:text-teal-900 focus:z-10 focus:outline-offset-0 cursor-pointer"
                onClick={() => navigate(`/admin-dashboard/employees/${id}`)}
            >
                View
            </button>
            <button className="inline-flex items-center rounded-2xl bg-blue-100 px-4 py-1 text-xs font-medium text--800 inset-ring inset-ring-yellow-600/20 hover:bg-blue-200 hover:text-blue-900 focus:z-10 focus:outline-offset-0 cursor-pointer"
            onClick={()=> navigate(`/admin-dashboard/employee/edit/${id}`)}>
                Edit
            </button>
            <button className="inline-flex items-center rounded-2xl bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 inset-ring inset-ring-yellow-600/20 hover:bg-yellow-200 hover:text-yellow-900 focus:z-10 focus:outline-offset-0 cursor-pointer"
            onClick={() => navigate(`/admin-dashboard/employees/salary/${id}`)}>
                Salary
            </button>
            <button className="inline-flex items-center rounded-2xl bg-red-100 px-3 py-1 text-xs font-medium text-red-800 inset-ring inset-ring-yellow-600/20 hover:bg-red-200 hover:text-red-900 focus:z-10 focus:outline-offset-0 cursor-pointer">
                Leave
            </button>
        </div>
    );
};
