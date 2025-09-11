import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/v1/get-book-by-id/${id}`
                );
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching book:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    if (loading) return <Loader />;

    if (!data) {
        return (
            <div className="h-screen bg-zinc-900 flex items-center justify-center text-zinc-300">
                Book not found.
            </div>
        );
    }

    return (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start">
            {/* Image & Action Buttons */}
            <div className="w-full lg:w-1/2">
                <div className="bg-zinc-800 flex flex-col sm:flex-row sm:justify-around items-center py-8 rounded-lg">
                    <img
                        src={data.url}
                        alt={data.title}
                        className="h-[45vh] sm:h-[55vh] lg:h-[70vh] rounded mb-6 sm:mb-0"
                    />
                    {isLoggedIn && role === "user" && (
                        <div className="flex sm:flex-col gap-4">
                            <button className="bg-white rounded-full text-3xl p-2 text-red-500 hover:scale-105 transition">
                                <MdFavorite />
                            </button>
                            <button className="bg-white rounded-full text-3xl p-2 text-blue-500 hover:scale-105 transition">
                                <FaShoppingCart />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Book Details */}
            <div className="p-4 w-full lg:w-1/2">
                <h1 className="text-3xl md:text-4xl text-zinc-300 font-semibold">
                    {data.title}
                </h1>
                <p className="text-zinc-400 mt-2 text-lg md:text-xl">by {data.author}</p>
                <p className="text-zinc-500 mt-4 text-base md:text-lg leading-relaxed">
                    {data.desc}
                </p>

                <p className="flex mt-4 items-center text-zinc-400 text-lg">
                    <GrLanguage className="mr-2" /> {data.language}
                </p>

                <p className="mt-4 text-zinc-100 text-2xl md:text-3xl font-semibold">
                    Price: ₹ {data.price}
                </p>
            </div>
        </div>
    );
};

export default ViewBookDetails;
