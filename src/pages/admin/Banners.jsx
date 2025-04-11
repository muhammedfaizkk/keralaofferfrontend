import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import Bannercard from '../../components/common/Bannercard';
import Addbanner from '../../components/admin/forms/Addbanner';


function Banners() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const pathSegments = location.pathname.split('/').filter(Boolean);

  const formatSegment = (segment) =>
    segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
      {/* ✅ Breadcrumb */}
      <div className="text-sm text-gray-400 mb-3">
        {pathSegments.map((segment, idx) => (
          <span key={idx}>
            {idx !== 0 && <span className="mx-2 text-gray-300">/</span>}
            <span className={idx === pathSegments.length - 1 ? 'text-blue-600 font-semibold' : 'text-gray-500'}>
              {formatSegment(segment)}
            </span>
          </span>
        ))}
      </div>

      {/* ✅ Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Banners</h1>
        <p className="text-sm text-gray-500">Manage your store members and details</p>
      </div>

      {/* ✅ Actions: Search + Buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative w-full md:max-w-sm">
          <input
            type="text"
            placeholder="Search stores..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition w-full sm:w-auto">
            Export Members (Excel)
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Addbanner 
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <div className="mt-4 border-t pt-4">
        <Bannercard/>
      </div>
    </div>
  );
}

export default Banners;
