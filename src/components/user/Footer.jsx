import { Link } from 'react-router-dom';
import React from 'react';
import { FaYoutube, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { Twitter } from 'lucide-react'; 



const Footer = () => {
    return (
        <div className="bg-white text-black w-full">
            {/* Navbar */}
            <nav className="py-4 px-4 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                {/* Logo */}
                <Link to="/" className="flex-shrink-0">
                    <img
                        src="/logonav.png"
                        alt="Kerala Offer Logo"
                        className="h-8 w-auto sm:h-10 md:h-12 lg:h-14"
                    />
                </Link>

                {/* Nav Links */}
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-6 lg:gap-8 font-medium text-black text-sm md:text-base lg:text-lg">
                    <Link to="/" className="hover:text-gray-300 transition-colors text-xs sm:text-sm">Home</Link>
                    <Link to="/about" className="hover:text-gray-300 transition-colors text-xs sm:text-sm">About</Link>
                    <Link to="/offers" className="hover:text-gray-300 transition-colors text-xs sm:text-sm">Offers</Link>
                    <Link to="/contact" className="hover:text-gray-300 transition-colors text-xs sm:text-sm">Contact</Link>
                </div>

                {/* Social Icons */}
                <div className="flex gap-3 md:gap-4">
                    <a href="#" className="bg-violet-300 text-black rounded-full p-2 hover:bg-violet-200 transition-colors" aria-label="Facebook">
                        <FaFacebookF className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                    <a href="#" className="bg-violet-300 text-black rounded-full p-2 hover:bg-violet-200 transition-colors" aria-label="Instagram">
                        <FaInstagram className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                    <a href="#" className="bg-violet-300 text-black rounded-full p-2 hover:bg-violet-200 transition-colors" aria-label="Twitter">
                        <FaYoutube className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                    <a href="#" className="bg-violet-300 text-black rounded-full p-2 hover:bg-violet-200 transition-colors" aria-label="Twitter">
                        <Twitter className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                </div>
            </nav>

            {/* Bottom border under the menu */}
            <div className="border-t border-gray-200 mx-4 md:mx-8 lg:mx-12"></div>

            {/* Footer Text */}
            <div className="w-full py-3 px-4">
                <div className="text-center text-xs sm:text-sm text-black max-w-screen-sm mx-auto">
                    © 2025 KeralaOffers. Powered by Willowy Infotech Pvt Ltd.
                </div>
            </div>
        </div>
    );
};

export default Footer;
