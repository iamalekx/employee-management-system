import Department from "../models/department.js";
import Employee from "../models/employee.js";

const getSummary = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();

        const totalDepartments = await Department.countDocuments();

        const totalSalaries = await Employee.aggregate([
            { $group: { _id: null, totalSalary: { $sum: "$salary" } } },
        ]);

        return res.status(200).json({
            success: true,
            totalEmployees,
            totalDepartments,
            totalSalaries: totalSalaries[0]?.totalSalary || 0,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, error: "dashboard summary error" });
    }
};

export { getSummary };
