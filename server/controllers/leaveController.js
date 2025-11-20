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

const getLeaves = async (req, res) => {
    try {
        const { userId } = req.params;
        const leaves = await Leave.find({ userId });

        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        console.log(error.message);
        return res
            .status(500)
            .json({ success: false, error: "Getting leave server error" });
    }
};

export { addLeave, getLeaves };
