import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Storestables from '../../components/admin/tables/Storestables';
import Addstores from '../../components/admin/forms/Addstores';
import { useGetStore } from '../../hooks/admin/Storehooks';
import { useGetstorecategory } from '../../hooks/admin/Storecategory';
import { useFetchDistricts } from '../../hooks/admin/ManageDatahooks';
import { toast } from 'react-toastify';

function Stores() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all required data with memoized filters
  const filters = {
    searchTerm,
    category: selectedCategory,
    district: selectedDistrict
  };

  const { 
    stores, 
    loading, 
    error, 
    refetch, 
    totalPages,
    currentPage: serverPage,
    setPage 
  } = useGetStore(currentPage, filters);

  const { categories, loading: categoriesLoading } = useGetstorecategory();
  const { districts, loading: districtsLoading } = useFetchDistricts();

  // Handle error from API
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedDistrict]);

  const handlePageChange = useCallback((newPage) => {
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  }, [currentPage]);

  const handleEdit = (store) => {
    setCurrentStore(store);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setCurrentStore(null);
    setIsModalOpen(true);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedDistrict('');
    setCurrentPage(1);
  };

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setCurrentStore(null);
    refetch();
  }, [refetch]);

  const isLoading = loading || categoriesLoading || districtsLoading;

  return (
    <div className="md:p-6 bg-white rounded-xl shadow-sm max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Store Management</h1>
        <p className="text-gray-500 mt-1">Manage your store locations and details</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search store names..."
              className="w-full pl-10 py-2 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="relative min-w-[200px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
              disabled={categoriesLoading}
            >
              <option value="">All Categories</option>
              {categories?.map((category) => (
                <option key={category._id} value={category.title} className="text-gray-900">
                  {category.title}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* District Filter */}
          <div className="relative min-w-[200px]">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
              disabled={districtsLoading}
            >
              <option value="">All Districts</option>
              {Array.isArray(districts) && districts.map((district) => (
                <option key={district.id} value={district.title} className="text-gray-900">
                  {district.title}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>

          {/* Add New Button */}
          <button
            onClick={handleAdd}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Store
          </button>
        </div>
        
        {/* Active Filters */}
        {(searchTerm || selectedCategory || selectedDistrict) && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-500">Filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-lg border border-blue-100">
                Search: "{searchTerm}"
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-lg border border-blue-100">
                Category: {selectedCategory}
                <button 
                  onClick={() => setSelectedCategory('')} 
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedDistrict && (
              <span className="inline-flex items-center bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-lg border border-blue-100">
                District: {selectedDistrict}
                <button 
                  onClick={() => setSelectedDistrict('')} 
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button 
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800 ml-auto"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-500">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Stores Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-500">Loading stores...</p>
          </div>
        ) : stores?.length > 0 ? (
          <Storestables
            stores={stores}
            refetch={refetch}
            onEdit={handleEdit}
            loading={loading}
          />
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">No stores found matching your criteria</p>
            {(searchTerm || selectedCategory || selectedDistrict) && (
              <button 
                onClick={resetFilters}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className={`p-2 rounded-lg border ${
              currentPage === 1 || isLoading
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                disabled={isLoading}
                className={`w-8 h-8 rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className={`p-2 rounded-lg border ${
              currentPage === totalPages || isLoading
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Add/Edit Store Modal */}
      {isModalOpen && (
        <Addstores
          mode={currentStore ? 'edit' : 'add'}
          store={currentStore}
          onClose={handleModalClose}
          refetch={refetch}
        />
      )}
    </div>
  );
}

export default Stores;