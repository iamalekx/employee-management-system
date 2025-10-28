import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
    },
    {
        name: "Action",
        selector: (row) => row.action,
    },
];

export const customStyles = {
    headCells: {
        styles: {
            fontSize: '14px',
            fontWeight: 'bold'
        }
    }
}

export const DepartmentButtons = ({_id}) => {
    const navigate = useNavigate()
    return (
        <div className="flex space-x-2">
            <button className="btn bg-teal-600 hover:bg-teal-700 rounded-full text-white" onClick={()=> navigate(`/admin-dashboard/department/${_id}`)}>Edit</button>
            <button className="btn bg-red-600 hover:bg-red-700 rounded-full text-white">Delete</button>
        </div>
    );
};
