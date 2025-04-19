import React, { useState } from 'react';
import {
  FaStore, FaThLarge, FaUser, FaCog, FaChevronDown,
  FaChevronUp, FaTimes, FaHome, FaSignOutAlt, FaImages
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const [dropdowns, setDropdowns] = useState({
    stores: false,
    banners: false,
    dataManage: false,
    settings: false
  });

  const navigate = useNavigate();

  const closeAllDropdowns = () => {
    setDropdowns({
      stores: false,
      banners: false,
      dataManage: false,
      settings: false
    });
  };

  const navigateTo = (path) => {
    // For mobile
    if (window.innerWidth < 768) {
      closeAllDropdowns();
      if (onClose) onClose(); // Close sidebar

      // Delay navigation to allow sidebar to close first
      setTimeout(() => {
        navigate(path);
      }, 300); // Make sure this matches your sidebar transition duration
    } else {
      navigate(path);
    }
  };

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('keralaoffertoken');
    navigate('/admin/login');
  };

  return (
    <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static z-40 h-full bg-white shadow-lg w-64 transition-transform duration-300`}>
      <div className="flex flex-col h-full p-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden text-gray-500 hover:text-red-500"
        >
          <FaTimes size={20} />
        </button>

        {/* Logo */}
        <div className="mt-12 md:mt-0 mb-4 flex justify-center">
          <img src="/logonav.png" className="h-16 w-auto" alt="Logo" />
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          <div onClick={() => navigateTo('/admin')} className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
            <FaHome className="mr-3" />
            <span>Dashboard</span>
          </div>

          {/* Stores */}
          <div>
            <div onClick={() => toggleDropdown('stores')} className="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
              <div className="flex items-center">
                <FaStore className="mr-3" />
                <span>Stores</span>
              </div>
              {dropdowns.stores ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {dropdowns.stores && (
              <div className="ml-10 transition-all duration-300 ease-in-out">
                <div onClick={() => navigateTo('/admin/store')} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Stores</div>
              </div>
            )}
          </div>

          {/* Banners */}
          <div>
            <div onClick={() => toggleDropdown('banners')} className="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
              <div className="flex items-center">
                <FaImages className="mr-3" />
                <span>Banners</span>
              </div>
              {dropdowns.banners ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {dropdowns.banners && (
              <div className="ml-10 transition-all duration-300 ease-in-out">
                <div onClick={() => navigateTo('/admin/banners')} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">All Banners</div>
                
              </div>
            )}
          </div>

          {/* Data Manage */}
          <div>
            <div onClick={() => toggleDropdown('dataManage')} className="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
              <div className="flex items-center">
                <FaThLarge className="mr-3" />
                <span>Data Manage</span>
              </div>
              {dropdowns.dataManage ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {dropdowns.dataManage && (
              <div className="ml-10 transition-all duration-300 ease-in-out">
                <div onClick={() => navigateTo('/admin/locations')} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Location</div>
                <div onClick={() => navigateTo('/admin/store-category')} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Store Category</div>
                <div onClick={() => navigateTo('/admin/offer-types')} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Offer Types</div>
              </div>
            )}
          </div>
        </nav>

        {/* Support */}
        <div className="pt-8">
          <h3 className="font-medium text-gray-500 uppercase text-xs tracking-wider mb-4">Support</h3>
          <div className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
            <FaUser className="mr-3" />
            <span>Users</span>
          </div>

          {/* Settings */}
          <div>
            <div onClick={() => toggleDropdown('settings')} className="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
              <div className="flex items-center">
                <FaCog className="mr-3" />
                <span>Settings</span>
              </div>
              {dropdowns.settings ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {dropdowns.settings && (
              <div className="ml-10 transition-all duration-300 ease-in-out">
                <div onClick={() => navigateTo('/admin/profile')} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Profile</div>
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        <div onClick={handleLogout} className="flex items-center p-3 text-gray-700 hover:bg-red-50 rounded-md cursor-pointer mt-auto">
          <FaSignOutAlt className="mr-3 text-red-500" />
          <span className="text-red-500">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
