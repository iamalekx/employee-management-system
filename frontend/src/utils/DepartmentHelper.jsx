import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action,
    },
];

export const customStyles = {
    headCells: {
        styles: {
            fontSize: "14px",
            fontWeight: "bold",
        },
    },
};

export const DepartmentButtons = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete?");
        if (confirm) {
            try {
                const response = await axios.delete(
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
                    onDepartmentDelete(id);
                }
            } catch (error) {
                console.log(error);
                if (error.response && !error.response.data.success) {
                    // alert(error.response.data.error);
                }
            }
        }
    };
    return (
        <div className="flex space-x-2">
            <button
                className="btn bg-teal-600 hover:bg-teal-700 rounded-full text-white"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >
                Edit
            </button>
            <button
                className="btn bg-red-600 hover:bg-red-700 rounded-full text-white"
                onClick={() => handleDelete(_id)}
            >
                Delete
            </button>
        </div>
    );
};
