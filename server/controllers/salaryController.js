import Salary from "../models/salary.js";
import Employee from "../models/employee.js";

const addSalary = async (req, res) => {
    try {
        const { employeeId, basicSalary, allowances, deductions, payDate } =
            req.body;

        const totalSalary =
            parseInt(basicSalary) +
            parseInt(allowances || 0) -
            parseInt(deductions || 0);

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate,
        });

        await newSalary.save();

        return res
            .status(200)
            .json({ success: true, message: "Salary added successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, error: "Adding salary server error" });
    }
};

// const getSalary = async (req, res) => {
//     try {
//         const { id } = req.params;
//         let salary = await Salary.find({ employeeId: id }).populate(
//             "employeeId",
//             "employeeId"
//         );
//         if (!salary || salary.length < 0) {
//             const employee = await Employee.findOne({ userId: id });
//             salary = await Salary.find({ employeeId: employee._id }).populate(
//                 "employeeId",
//                 "employeeId"
//             );
//         }
//         return res.status(200).json({ success: true, salary });
//     } catch (error) {
//         console.log(error);
//         return res
//             .status(500)
//             .json({ success: false, error: "Getting salary server error" });
//     }
// };

const getSalary = async (req, res) => {
    try {
        // console.log("getSalary called, params:", req.params);
        const { id } = req.params;
        if (!id) {
            console.warn("Missing id param");
            return res
                .status(400)
                .json({ success: false, error: "Missing id param" });
        }

        // console.log("Mongoose readyState:", require("mongoose").connection.readyState);

        let salaries = await Salary.find({ employeeId: id })
            .populate("employeeId")
            .lean();

        if (!Array.isArray(salaries) || salaries.length === 0) {
            const employee = await Employee.findOne({ userId: id }).select(
                "_id"
            );
            if (employee && employee._id) {
                salaries = await Salary.find({ employeeId: employee._id })
                    .populate("employeeId")
                    .lean();
            }
        }

        console.log(
            "salaries result length:",
            Array.isArray(salaries) ? salaries.length : typeof salaries
        );

        return res.status(200).json({
            success: true,
            salary: Array.isArray(salaries) ? salaries : [],
        });
    } catch (error) {
        console.error("getSalary ERROR:", error);
        return res
            .status(500)
            .json({ success: false, error: error.message || "Server Error" });
    }
};

export { addSalary, getSalary };
