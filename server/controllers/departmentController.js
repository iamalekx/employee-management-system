import Department from "../models/department.js";

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({ success: true, departments });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, error: "Getting department server error" });
    }
};
const addDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body;
        const newDepartment = new Department({
            dep_name,
            description,
        });
        await newDepartment.save();
        return res
            .status(200)
            .json({ success: true, department: newDepartment });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, error: "Adding department server error" });
    }
};

const editDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById({ _id: id });
        return res.status(200).json({ success: true, department: department });
    } catch (error) {
        // console.log(error);
        return res
            .status(500)
            .json({ success: false, error: "Getting department server error" });
    }
};

export { addDepartment, getDepartments, editDepartment };
