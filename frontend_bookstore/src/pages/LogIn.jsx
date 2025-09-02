import React, { useState } from "react";
import { Link } from "react-router-dom"; // only if you're using react-router

const LogIn = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert("LogIn Successful 🎉");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-zinc-800">
            <div className="bg-zinc-900 shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-zinc-100">
                    Log In
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-zinc-100 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="xyz@example.com"
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
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
                    >
                        Log In
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
