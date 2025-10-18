import React, { useNavigate, useState } from "react";
import logo from "../assets/ems-logo.png";
import loginImage from "../assets/login-image3.png";
import "./login.css";
import axios from "axios";
import Alert from "../components/Alert";
import { useAuth } from "../context/authContext.jsx";

const login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:3000/api/auth/login";
        try {
            const response = await axios.post(url, { email, password });
            if (response.data.success) {
                // console.log("Login successful", response.data);
                // alert("Login successful");
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                if (response.data.user.role === "admin") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/employee-dashboard");
                }
            }
        } catch (error) {
            console.log(error);
            // if (error.response) {
            //     console.error(
            //         `Login failed [${error.response.status} ${error.response.statusText}] at ${url}`,
            //         error.response.data
            //     );
            // } else if (error.request) {
            //     console.error(
            //         `Login request made but no response from ${url}`,
            //         error.request
            //     );
            // } else {
            //     console.error("Login setup error:", error.message);
            // }

            if (!error.response.data.success) {
                setError(error.response.data.message);
            } else {
                setError("Server error. Please try again later.");
            }
        }
    };

    return (
        <div className="login1">
            <div className=" flex h-full w-full bg-gray-100">
                <div className="hidden md:flex md:w-3/2 h-screen items-center justify-center">
                    <img
                        className="max-w-full max-h-full object-contain"
                        src={loginImage}
                        alt="leftSideImage"
                    />
                </div>

                <div className="w-full h-screen flex items-center justify-center bg-white">
                    <form
                        onSubmit={handleSubmit}
                        className="md:w-96 w-80 flex flex-col items-center justify-center"
                    >
                        <img className="w-64" src={logo} alt="logo" />
                        <p className="text-lg my-4 text-gray-500/90 mt-3">
                            Welcome back! Please sign in to continue
                        </p>
                        {error && (
                            <p className="text-red-500 flex justify-items-start">
                                {error}
                            </p>
                        )}
                        <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <svg
                                width="16"
                                height="11"
                                viewBox="0 0 16 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                                    fill="#6B7280"
                                />
                            </svg>
                            <input
                                type="email"
                                placeholder="Email"
                                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <svg
                                width="13"
                                height="17"
                                viewBox="0 0 13 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                                    fill="#6B7280"
                                />
                            </svg>
                            <input
                                type="password"
                                placeholder="Password"
                                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
                            <div className="flex items-center gap-2">
                                <input
                                    className="cursor-pointer h-5"
                                    type="checkbox"
                                    id="checkbox"
                                />
                                <label
                                    className="cursor-pointer text-sm"
                                    htmlFor="checkbox"
                                >
                                    Remember me
                                </label>
                            </div>
                            <a className="text-sm underline" href="#">
                                Forgot password?
                            </a>
                        </div>
                        {/* <Alert /> */}
                        <button
                            type="submit"
                            className="cursor-pointer mt-8 w-full h-11 rounded-full text-white bg-lime-600 hover:opacity-90 transition-opacity"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default login;
