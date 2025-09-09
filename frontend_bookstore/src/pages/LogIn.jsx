import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import axios from "axios";

const LogIn = () => {
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const change = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            if (values.username === "" || values.password === "") {
                setMessage("❌ All fields are required");
                return;
            }

            const response = await axios.post(
                "http://localhost:5000/api/v1/sign-in", // ✅ fixed typo (was sing-in)
                values
            );

            dispatch(authActions.login());
            dispatch(authActions.changeRole(response.data.role));
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            navigate("/profile");

            const data = response.data;
            console.log("Login Response:", data);

            // ✅ Save token & userId in localStorage
            if (data.token) {
                localStorage.setItem("token", data.token);
            }
            if (data.userId) {
                localStorage.setItem("userId", data.userId);
            }

            if (data.token) {
                setMessage("✅ Login Successful 🎉");

            } else {
                setMessage("❌ No token received from server");
            }
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || "Login failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-zinc-800">
            <div className="bg-zinc-900 shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-zinc-100">
                    Log In
                </h2>

                {message && (
                    <p
                        className={`text-center mb-4 ${message.startsWith("✅")
                            ? "text-green-400"
                            : "text-red-400"
                            }`}
                    >
                        {message}
                    </p>
                )}

                <form onSubmit={submit} className="space-y-4">
                    {/* Username */}
                    <div>
                        <label className="block text-zinc-100 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={values.username}
                            onChange={change}
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-zinc-100 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={change}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200 disabled:opacity-50"
                    >
                        {loading ? "Logging In..." : "Log In"}
                    </button>
                </form>

                {/* Don't have account */}
                <p className="text-sm text-center text-zinc-300 mt-4">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-400 hover:underline">
                        Create here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LogIn;
