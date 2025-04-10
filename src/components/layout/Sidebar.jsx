import React, { useState } from 'react';
import {
  FaChartBar, FaBook, FaUsers, FaTasks, FaStore,
  FaTags, FaUser, FaLayerGroup, FaMapMarkerAlt,
  FaGift, FaThLarge, FaQuestionCircle, FaCog, FaTimes,
  FaChevronDown, FaChevronUp, FaHome
} from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleItemClick = () => {
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  return (
    <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static z-40 h-full bg-white shadow-lg w-64 transition-transform duration-300`}>
      <div className="flex flex-col h-full p-4 relative">

        {/* Close Button for mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden text-gray-500 hover:text-red-500"
        >
          <FaTimes size={20} />
        </button>

        <div className="mb-8">
          <img src="/logonav.png" className='h-25 w-50' alt="" />
        </div>

        <nav className="space-y-1">
          {/* Dashboard */}
          <div onClick={handleItemClick} className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
            <FaHome className="mr-3" />
            <span>Dashboard</span>
          </div>

          {/* Reports */}
          <div onClick={handleItemClick} className="flex items-center p-3 bg-blue-50 text-blue-600 rounded-md cursor-pointer">
            <FaChartBar className="mr-3" />
            <span>Reports</span>
          </div>

          {/* Stores */}
          <div>
            <div onClick={() => toggleDropdown('stores')} className="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
              <div className="flex items-center">
                <FaStore className="mr-3" />
                <span>Stores</span>
              </div>
              {openDropdown === 'stores' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`ml-10 overflow-hidden transition-all duration-300 ease-in-out ${openDropdown === 'stores' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div onClick={handleItemClick} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Add Stores</div>
            </div>
          </div>

          {/* Banners */}
          <div>
            <div onClick={() => toggleDropdown('banners')} className="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
              <div className="flex items-center">
                <FaTags className="mr-3" />
                <span>Banners</span>
              </div>
              {openDropdown === 'banners' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`ml-10 overflow-hidden transition-all duration-300 ease-in-out ${openDropdown === 'banners' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div onClick={handleItemClick} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Banner</div>
            </div>
          </div>

          {/* Users */}
          <div onClick={handleItemClick} className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
            <FaUser className="mr-3" />
            <span>Users</span>
          </div>

          {/* Data Manage */}
          <div>
            <div onClick={() => toggleDropdown('dataManage')} className="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
              <div className="flex items-center">
                <FaThLarge className="mr-3" />
                <span>Data Manage</span>
              </div>
              {openDropdown === 'dataManage' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`ml-10 overflow-hidden transition-all duration-300 ease-in-out ${openDropdown === 'dataManage' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div onClick={handleItemClick} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Location</div>
              <div onClick={handleItemClick} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Store Category</div>
              <div onClick={handleItemClick} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Offer Types</div>
            </div>
          </div>

        
          
        </nav>

       
        <div className="pt-8">
          <h3 className="font-medium text-gray-500 uppercase text-xs tracking-wider mb-4">Support</h3>

          <div onClick={handleItemClick} className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
            <FaQuestionCircle className="mr-3" />
            <span>FAQ / Help</span>
          </div>

          
          <div>
            <div onClick={() => toggleDropdown('settings')} className="flex items-center justify-between p-3 text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
              <div className="flex items-center">
                <FaCog className="mr-3" />
                <span>Settings</span>
              </div>
              {openDropdown === 'settings' ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <div className={`ml-10 overflow-hidden transition-all duration-300 ease-in-out ${openDropdown === 'settings' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div onClick={handleItemClick} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Account</div>
              <div onClick={handleItemClick} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Privacy</div>
              <div onClick={handleItemClick} className="text-sm py-1 text-gray-600 hover:text-blue-600 cursor-pointer">Notifications</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
