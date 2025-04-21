import React, { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Link } from 'react-router-dom';
import SearchFilters from './SearchFilters';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Top Header with Shadow Box */}
      <header className="bg-white">
        <div className="max-w-[1450px] mx-auto mt-4 px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl shadow-sm bg-white flex justify-between items-center px-3 sm:px-6 py-2 relative">
            {/* Logo in box */}
            <div className="flex items-center gap-2 rounded-md px-3 py-2 bg-gray-50">
              <Link to="/">
                <img
                  src="/logonav.png"
                  alt="Kerala Offer Logo"
                  className="w-[120px] h-[35px] object-contain 
                    sm:w-[140px] sm:h-[40px] 
                    md:w-[160px] md:h-[45px] 
                    lg:w-[180px] lg:h-[50px] 
                    xl:w-[200px] xl:h-[55px]"
                />
              </Link>
            </div>

            {/* Mobile Search Input - visible only on mobile screens */}
            <div className="block sm:hidden flex-1 px-2">
              <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full h-[42px]">
                <Search className="min-w-[17px] min-h-[17px] text-gray-400" />
                <input
                  type="text"
                  placeholder="Search here..."
                  className="bg-transparent outline-none text-sm text-gray-600 w-full ml-2"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-2 font-medium font-mluvka sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
              <Link to="/" className="text-xs sm:text-sm md:text-sm lg:text-sm text-black hover:text-gray-700">Home</Link>
              <Link to="/aboutus" className="text-xs sm:text-sm md:text-sm lg:text-sm text-black hover:text-gray-700">About Us</Link>
              <Link to="/offers" className="text-xs sm:text-sm md:text-sm lg:text-sm text-black hover:text-gray-700">Offers</Link>
              <Link to="/contactus" className="text-xs sm:text-sm md:text-sm lg:text-sm text-black hover:text-gray-700 mr-1 sm:mr-2">Contact Us</Link>
            </div>

            {/* Mobile Menu Icon */}
            {!menuOpen && (
              <button
                className="text-black lg:hidden rounded-md p-1 bg-gray-50"
                onClick={toggleMenu}
              >
                <Menu className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Sidebar */}
        {menuOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
              onClick={toggleMenu}
            />
            <div className="lg:hidden fixed top-0 right-0 h-full w-[250px] bg-white shadow-md z-20">
              <div className="flex justify-between items-center p-4">
                <Link to="/">
                  <img
                    src="/logonav.png"
                    alt="Kerala Offer Logo"
                    className="w-[120px] h-[35px] object-contain"
                  />
                </Link>
                <button className="text-black" onClick={toggleMenu}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col font-medium font-mluvka items-start gap-4 p-4">
                <Link to="/" className="text-sm text-black hover:text-gray-700">Home</Link>
                <Link to="/aboutus" className="text-sm text-black hover:text-gray-700">About Us</Link>
                <Link to="/offers" className="text-sm text-black hover:text-gray-700">Offers</Link>
                <Link to="/contactus" className="text-sm text-black hover:text-gray-700">Contact Us</Link>
              </div>
            </div>
          </>
        )}
      </header>

      {/* Conditionally render SearchFilters based on menu state */}
      {!menuOpen && (
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* <SearchFilters /> */}
        </div>
      )}
    </>
  );
};

export default Header;
