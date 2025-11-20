import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Settings = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (setting.newPassword !== setting.confirmNewPassword) {
            setError("Passwords do not match");
        } else {
            try {
                const response = await axios.put(
                    "http://localhost:3000/api/settings/change-password",
                    setting,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                if (response.data.success) {
                    alert("Password changed successfully. Please login again.");
                    localStorage.removeItem("token");
                    navigate("/login");
                    setError("");
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    setError(error.response.data.error);
                }
            }
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-3xl shadow-lg w-120">
            <h2 className="text-3xl font-bold mb-6">Change Password</h2>
            <p className="text-red-500">{error}</p>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="oldPassword"
                        className="text-md font-medium text-gray-700"
                    >
                        Current Password
                    </label>
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="Current Password"
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="newPassword"
                        className="ext-md font-medium text-gray-700"
                    >
                        New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="confirmNewPassword"
                        className="ext-md font-medium text-gray-700"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmNewPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-xl"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 cursor-pointer bg-teal-600 text-white rounded-2xl hover:bg-teal-700"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default Settings;
