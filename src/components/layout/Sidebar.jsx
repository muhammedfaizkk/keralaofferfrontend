// Sidebar.jsx
import React from 'react';
import {
  FaChartBar, FaBook, FaUsers, FaTasks,
  FaQuestionCircle, FaCog, FaTimes
} from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  const handleItemClick = () => {
    if (window.innerWidth < 768 && onClose) {
      onClose(); // Closes sidebar on item click (for mobile)
    }
  };

  return (
    <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static z-30 h-full bg-white shadow-lg w-64 transition-transform duration-300`}>
      <div className="flex flex-col h-full p-4 relative">

        {/* Close Button for mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden text-gray-500 hover:text-red-500"
        >
          <FaTimes size={20} />
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-red-500">TESLA</h1>
        </div>

        <nav className="space-y-1">
          <div onClick={handleItemClick} className="flex items-center p-3 bg-blue-50 text-blue-600 rounded-md cursor-pointer">
            <FaChartBar className="mr-3" />
            <span>Reports</span>
          </div>
          <div onClick={handleItemClick} className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
            <FaBook className="mr-3" />
            <span>Library</span>
          </div>
          <div onClick={handleItemClick} className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
            <FaUsers className="mr-3" />
            <span>People</span>
          </div>
          <div onClick={handleItemClick} className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
            <FaTasks className="mr-3" />
            <span>Activities</span>
          </div>
        </nav>

        <div className="pt-8">
          <h3 className="font-medium text-gray-500 uppercase text-xs tracking-wider mb-4">Support</h3>

          <div onClick={handleItemClick} className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
            <FaQuestionCircle className="mr-3" />
            <span>FAQ / Help</span>
          </div>

          <div onClick={handleItemClick} className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
            <FaCog className="mr-3" />
            <span>Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
