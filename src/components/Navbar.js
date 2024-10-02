import React, {useState} from 'react'
import { RxMagicWand } from "react-icons/rx";
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-stone-950 text-white py-5 px-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="font-mono font-bold flex items-center gap-3">
                    <RxMagicWand className="text-3xl font-bold" />
                    <h1 className="text-2xl">Harry Potter</h1>
                </div>

                <div className="hidden md:flex flex-row gap-5">
                    <Link to="/" className="hover:text-gray-400 transition-colors">Spells</Link>
                    <Link to="/characters" className="hover:text-gray-400 transition-colors">Characters</Link>
                </div>

                <button className="block md:hidden text-3xl focus:outline-none" onClick={toggleMenu}>
                    &#9776;
                </button>
            </div>

            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
                <Link to="/" className="block py-2 text-center hover:bg-gray-800">Spells</Link>
                <Link to="/characters" className="block py-2 text-center hover:bg-gray-800">Characters</Link>
            </div>
        </div>

    )
}

export default Navbar
