import axios from "axios";

export const fetchDepartments = async () => {
    let departments 
    try {
        const response = await axios.get(
            "http://localhost:3000/api/departments",
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.data.success) {
            // console.log(response.data)
            departments = response.data.departments
        }
    } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
            // alert(error.response.data.error);
        }
    }
    return departments
};
