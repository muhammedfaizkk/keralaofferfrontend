import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import Bannercard from '../../components/common/Bannercard';
import Addbanner from '../../components/admin/forms/Addbanner';
import { useFetchBanners, useDeleteBanner } from '../../hooks/admin/Bannerhooks';
import DeleteConfirmation from '../../components/common/DeleteConfirmation';

function Banners() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { banners, loading, refetch } = useFetchBanners();
  const { deleteBanner } = useDeleteBanner();
  const location = useLocation();
  const navigate = useNavigate();

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const formatSegment = (segment) =>
    segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const handleBannerAdded = () => {
    setIsModalOpen(false);
    refetch();
  };

  const handleDelete = async () => {
    if (selectedBanner) {
      await deleteBanner(selectedBanner._id);
      setIsDeleteModalOpen(false);
      refetch();
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedBanner(null);
  };

  // Display all banners by default or filter based on search term
  const filteredBanners = searchTerm
    ? banners.filter((banner) =>
        banner?.heading?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : banners;

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
      {/* Breadcrumb */}
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

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Banners</h1>
        <p className="text-sm text-gray-500">Manage your banner collection</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative w-full md:max-w-sm">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search banners..."
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

      {/* Modal */}
      {isModalOpen && <Addbanner onClose={() => setIsModalOpen(false)} onSuccess={handleBannerAdded} />}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmation
          itemName={selectedBanner?.title}
          onCancel={handleDeleteCancel}
          onDelete={handleDelete}
        />
      )}

      {/* Banner Cards */}
      <div className="mt-4 border-t pt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <p>Loading banners...</p>
        ) : filteredBanners.length > 0 ? (
          filteredBanners.map((banner) => (
            <Bannercard
              key={banner._id}
              banner={banner}
              onDelete={() => {
                setSelectedBanner(banner);
                setIsDeleteModalOpen(true);
              }}
            />
          ))
        ) : (
          <p>No banners found.</p>
        )}
      </div>
    </div>
  );
}

export default Banners;
