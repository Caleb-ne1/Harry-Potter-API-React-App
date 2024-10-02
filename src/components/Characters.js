import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get("https://hp-api.onrender.com/api/characters");
                setCharacters(response.data);
                setTotalPages(Math.ceil(response.data.length / ITEMS_PER_PAGE));
                console.log("Fetched Characters:", response.data);
            } catch (error) {
                setError("Error fetching characters.");
                console.error("Error fetching characters:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);



    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const displayedCharacters = characters.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    const getPaginationRange = () => {
        const range = [];
        let start = Math.max(1, currentPage - 1);
        let end = Math.min(totalPages, start + 2);

        if (end - start < 2) {
            start = Math.max(1, end - 2);
        }

        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    };

    const paginationRange = getPaginationRange();

    return (
        <div>
            <h2 className='flex flex-row gap-2 my-6 text-center justify-center text-2xl'>Characters</h2>
            <div className="py-10 px-5 min-h-screen flex justify-center flex-wrap">
                {displayedCharacters.map((character) => (
                    <div className="relative bg-white border-2 border-gray-200 shadow-xl rounded-lg max-w-md m-4 overflow-hidden" key={character.id}>

                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-red-500"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-yellow-400"></div>

                        {/* Character Image */}
                        <img
                            className="w-full h-96 object-cover"
                            src={character.image}
                            alt={character.name}
                        />

                        {/* Character Info */}
                        <div className="p-6">
                            <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-2">{character.name}</h2>
                            <p className="text-md text-gray-500 italic text-center mb-4">"{character.alternate_names.join(', ')}"</p>

                            {/* House Info  */}
                            <div className="flex items-center justify-center mb-4">
                                <span className={`px-4 py-1 rounded-full font-medium text-sm ${character.house === "Gryffindor" ? "bg-red-600 text-white" : character.house === "Slytherin" ? "bg-green-600 text-white" : character.house === "Hufflepuff" ? "bg-yellow-600 text-white" : "bg-blue-600 text-white"}`}>
                                    {character.house}
                                </span>
                            </div>

                            {/* Wand Details */}
                            <div className="mt-5">
                                <p className="text-lg font-semibold text-gray-800">Wand:</p>
                                <p className="text-gray-600 mt-1">Wood: {character.wand?.wood || "N/A"}, Core: {character.wand?.core || "N/A"}, Length: {character.wand?.length || "N/A"} inches</p>
                            </div>

                            {/* Patronus */}
                            <div className="mt-4">
                                <p className="text-lg font-semibold text-gray-800">Patronus:</p>
                                <p className="text-gray-600 mt-1">{character.patronus || "N/A"}</p>
                            </div>

                            {/*  Info container */}
                            <div className="mt-6">
                                <p className="text-lg font-semibold text-gray-800">Ancestry:</p>
                                <p className="text-gray-600 mt-1">{character.ancestry || "N/A"}</p>
                                <p className="text-lg font-semibold text-gray-800 mt-4">Actor:</p>
                                <p className="text-gray-600 mt-1">{character.actor || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center my-5 flex-wrap">
                <button
                    onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)}
                    className={`mx-1 px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {paginationRange.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`mx-1 px-3 py-2 rounded-md ${currentPage === page ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white'}`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : currentPage)}
                    className={`mx-1 px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Characters;
