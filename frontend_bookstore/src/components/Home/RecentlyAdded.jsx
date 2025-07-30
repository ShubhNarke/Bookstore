import React, { useEffect, useState } from 'react'
import axios from "axios";
import BookCard from '../BookCard/BookCard';

const RecentlyAdded = () => {
    const [Data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:1000/api/v1/get-recent-books");
                console.log(response.data);
                setData(response.data.data);  // <-- FIXED
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetch();
    }, []);

    return (
        <div className='mt-8 px-4'>
            <h4 className='text-3xl text-yellow-200'>Recently added books</h4>
            <div className='my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                {Data.map((items, i) => (
                    <div key={i}>
                        <BookCard data={items} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentlyAdded;