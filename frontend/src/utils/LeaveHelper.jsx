import { useNavigate } from "react-router-dom";

export const columns = [
    { name: "S No", selector: (row) => row.sno, width: "70px" },

    { name: "Emp ID", selector: (row) => row.employeeId, width: "120px" },

    { name: "Name", selector: (row) => row.name, width: "120px" },

    { name: "Leave Type", selector: (row) => row.leaveType, width: "140px" },

    { name: "Department", selector: (row) => row.department, width: "170px" },

    { name: "Days", selector: (row) => row.days, width: "80px" },

    { name: "Status", selector: (row) => row.status, width: "120px" },

    { name: "Action", selector: (row) => row.action, center: true },
];

export const LeaveButtons = ({ Id }) => {
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/admin-dashboard/leaves/${Id}`);
    };

    return (
        <button
            className="inline-flex items-center rounded-2xl bg-teal-100 px-3 py-1 text-xs font-medium text-teal-800 inset-ring inset-ring-teal-600/20 hover:bg-teal-200 hover:text-teal-900 focus:z-10 focus:outline-offset-0 cursor-pointer"
            onClick={() => handleView(Id)}
        >
            View
        </button>
    );
};
