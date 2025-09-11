import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");

        if (!token || !id) {
            navigate("/login");
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/v1/get-user-information",
                    {
                        headers: {
                            id,
                            Authorization: `Bearer ${token}`, // Capital A is required
                        },
                    }
                );
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
                if (error.response && [401, 403].includes(error.response.status)) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("id");
                    navigate("/login");
                }
            }
        };

        fetchProfile();
    }, [navigate]);

    return (
        <div className="bg-zinc-900 text-white flex flex-col md:flex-row gap-4 px-4 md:px-8 py-6 md:py-8 min-h-screen">
            {/* Loader for full height center */}
            {!profile && (
                <div className="w-full flex items-center justify-center">
                    <Loader />
                </div>
            )}

            {profile && (
                <>
                    {/* Sidebar */}
                    <aside className="w-full md:w-1/5 lg:w-1/6">
                        <Sidebar data={profile} />
                    </aside>

                    {/* Main Content */}
                    <main className="w-full md:w-4/5 lg:w-5/6">
                        <Outlet />
                    </main>
                </>
            )}
        </div>
    );
};

export default Profile;
