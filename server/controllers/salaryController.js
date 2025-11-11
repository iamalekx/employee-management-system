import Salary from "../models/salary.js";

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

const getSalary = async (req, res) => {
    try {
        const { id } = req.params;
        const salary = await Salary.find
            ({ employeeId: id }).populate("employeeId", "employeeId"
        );
        return res.status(200).json({ success: true, salary });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, error: "Getting salary server error" });
    }
};

export { addSalary, getSalary };
