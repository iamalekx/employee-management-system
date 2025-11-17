import Employee from "../models/employee.js";
import Leave from "../models/leave.js";
const addLeave = async (req, res) => {
    try {
        const { userId, leaveType, startDate, endDate, reason } = req.body;

        const newLeave = new Leave({
            employeeId: userId,
            leaveType,
            startDate,
            endDate,
            reason,
        });

        await newLeave.save();

        return res
            .status(200)
            .json({ success: true, message: "Leave added successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, error: "Adding leave server error" });
    }
};

export { addLeave };
