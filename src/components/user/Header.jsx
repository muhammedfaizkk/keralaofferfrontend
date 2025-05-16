import React, { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <header className="bg-white">
        <div className="max-w-[1450px] mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl shadow-sm flex justify-between items-center px-3 sm:px-6 py-2 relative">
            <div className="flex items-center gap-2 rounded-md px-3 py-2">
              <Link to="/">
                <img
                  src="/keralaofferlogo.svg"
                  alt="Kerala Offer Logo"
                  className="h-[50px] sm:h-[60px] xl:h-[70px] w-auto object-contain"
                />

              </Link>
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
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  <img
                    src="/keralaofferlogo.svgn"
                    alt="Kerala Offer Logo"
                    className="w-[120px] h-[35px] object-contain"
                  />
                </Link>
                <button className="text-black" onClick={toggleMenu}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col font-medium font-mluvka items-start gap-4 p-4">
                <Link to="/" onClick={() => setMenuOpen(false)} className="text-sm text-black hover:text-gray-700">Home</Link>
                <Link to="/aboutus" onClick={() => setMenuOpen(false)} className="text-sm text-black hover:text-gray-700">About Us</Link>
                <Link to="/offers" onClick={() => setMenuOpen(false)} className="text-sm text-black hover:text-gray-700">Offers</Link>
                <Link to="/contactus" onClick={() => setMenuOpen(false)} className="text-sm text-black hover:text-gray-700">Contact Us</Link>
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
