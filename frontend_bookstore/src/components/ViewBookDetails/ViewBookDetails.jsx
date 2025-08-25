import React, { useEffect, useState } from "react";
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import { useParams } from 'react-router-dom'

const ViewBookDetails = () => {
    const { id } = useParams();
    console.log(id)

    const [Data, setData] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/get-book-by-id/${id}`);
                setData(response.data.data);  // <-- FIXED
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetch();
    }, []);
    return (
        <div className='px-12 p[y-8 bg-zinc-800 flex gap-8'>
            <div className='bg-zinc-800 rounded p-4 h-screen'></div>
            <div className='p-4'></div>
        </div>
    )
}

export default ViewBookDetails