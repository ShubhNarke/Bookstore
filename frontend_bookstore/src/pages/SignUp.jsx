import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        address: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("http://localhost:5000/api/v1/sign-up", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Signup failed ❌");
            }

            // ✅ If success, show message briefly and navigate
            setMessage("✅ Sign Up Successful 🎉");
            setFormData({ username: "", email: "", password: "", address: "" });

            // Navigate to login page after 1.5s
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-zinc-800">
            <div className="bg-zinc-900 shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-zinc-100">
                    Sign Up
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

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username */}
                    <div>
                        <label className="block text-zinc-100 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            required
                        />
                    </div>

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

                    {/* Address */}
                    <div>
                        <label className="block text-zinc-100 mb-1">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            rows="3"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200 disabled:opacity-50"
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-400 mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
