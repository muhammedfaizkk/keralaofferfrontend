import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, X, ChevronDown } from 'lucide-react';
import Storestables from '../../components/admin/tables/Storestables';
import Addstores from '../../components/admin/forms/Addstores';
import { useGetStore } from '../../hooks/admin/Storehooks';

function Stores() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const { stores, loading, error, refetch } = useGetStore();

  // Extract unique locations for filter dropdown
  const locations = [...new Set(stores?.map(store => store.location?.name).filter(Boolean))];

  // Filter stores based on search and location
  const filteredStores = stores?.filter(store => {
    const matchesSearch = 
      searchTerm === '' ||
      store.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.location?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = 
      selectedLocation === '' || 
      store.location?.name === selectedLocation;

    return matchesSearch && matchesLocation;
  });

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
    setSelectedLocation('');
  };

  return (
    <div className="md:p-6 bg-white rounded-xl shadow-sm max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Store Management</h1>
        <p className="text-gray-500 mt-1">Manage your store locations and details</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search stores..."
              className="w-full pl-10 py-2 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Location Filter */}
          <div className="relative min-w-[200px]">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">All Locations</option>
              {locations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
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
        {(searchTerm || selectedLocation) && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-500">Filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-lg border border-blue-100">
                "{searchTerm}"
                <button 
                  onClick={() => setSearchTerm('')} 
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedLocation && (
              <span className="inline-flex items-center bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-lg border border-blue-100">
                {selectedLocation}
                <button 
                  onClick={() => setSelectedLocation('')} 
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
          Showing <span className="font-medium">{filteredStores?.length || 0}</span> of <span className="font-medium">{stores?.length || 0}</span> stores
        </p>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center">
          Export Data
        </button>
      </div>

      {/* Stores Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-500">Loading stores...</p>
          </div>
        ) : filteredStores?.length > 0 ? (
          <Storestables
            stores={filteredStores || []}
            refetch={refetch}
            onEdit={handleEdit}
            loading={loading}
          />
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">No stores found matching your criteria</p>
            {(searchTerm || selectedLocation) && (
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

      {/* Add/Edit Store Modal */}
      {isModalOpen && (
        <Addstores
          mode={currentStore ? 'edit' : 'add'}
          store={currentStore}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentStore(null);
          }}
          refetch={refetch}
        />
      )}
    </div>
  );
}

export default Stores;