import React, { useState, useEffect } from 'react';
import { FaWandSparkles } from "react-icons/fa6";
import axios from 'axios';
import Loading from './Loading';

const Spells = () => {
    const [spells, setSpells] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSpells = async () => {
            try {
                const response = await axios.get("https://hp-api.onrender.com/api/spells");
                setSpells(response.data);
            } catch (error) {
                setError("Error fetching spells. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSpells();
    }, []);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div>
            <h2 className='flex flex-row gap-2 my-6 text-center justify-center text-2xl'>
                <FaWandSparkles /> Spells
            </h2>
            <div className="py-8 px-4 min-h-screen">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {spells.map((spell, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-200 hover:shadow-2xl hover:scale-105">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{spell.name}</h2>
                            <p className="text-gray-600 italic">"{spell.description}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Spells;
