import Leave from "../models/leave.js";
import Employee from "../models/employee.js";
const addLeave = async (req, res) => {
    try {
        const { userId, leaveType, startDate, endDate, reason } = req.body;

        // Convert provided userId (User._id) to the corresponding Employee._id
        const employee = await Employee.findOne({ userId });
        if (!employee) {
            return res
                .status(404)
                .json({ success: false, error: "Employee not found for user" });
        }

        const newLeave = new Leave({
            employeeId: employee._id,
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
        console.error("addLeave ERROR:", error);
        return res
            .status(500)
            .json({ success: false, error: "Adding leave server error" });
    }
};

const getLeave = async (req, res) => {
    try {
        const { id } = req.params; 

       
        let employee = await Employee.findOne({ userId: id }).select("_id");

        
        if (!employee) {
            const possibleEmployee = await Employee.findById(id).select("_id");
            if (possibleEmployee) employee = possibleEmployee;
        }

        if (!employee) {
            return res.status(200).json({ success: true, leaves: [] });
        }

        const leaves = await Leave.find({ employeeId: employee._id }).populate({
            path: "employeeId",
            populate: [
                { path: "department", select: "dep_name" },
                { path: "userId", select: "name" },
            ],
        });

        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        console.error("getLeave ERROR:", error);
        return res
            .status(500)
            .json({ success: false, error: "Getting leave server error" });
    }
};

const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [
                { path: "department", select: "dep_name" },
                { path: "userId", select: "name" },
            ],
        });

        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        console.log(error.message);
        return res
            .status(500)
            .json({ success: false, error: "Getting leave server error" });
    }
};

export { addLeave, getLeaves, getLeave };
