import React, { useEffect, useState } from "react";
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';


const AllBooks = () => {
    const [Data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/get-all-book");
                console.log(response.data);
                setData(response.data.data);  // <-- FIXED
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetch();
    }, []);
    return (
        <div className='bg-zinc-900 px-12 py-8'>
            {" "}
            <h4 className='text-3xl text-yellow-200'>All Books</h4>
            {!Data && (
                <div className='flex items-center justify-center my-8'>
                    <Loader /> {" "}
                </div>
            )}
            <div className='my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>

                {Data.map((items, i) => (
                    <div key={i}>
                        <BookCard data={items} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllBooks