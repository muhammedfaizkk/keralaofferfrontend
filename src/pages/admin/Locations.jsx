import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Plus, List, Grid } from 'lucide-react';
import LocationTable from '../../components/admin/tables/LocationTable';
import Addlocations from '../../components/admin/forms/Addlocations';
import { useGetLocations } from '../../hooks/admin/ManageDatahooks';

function Locations() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for pagination preference
  const [paginationEnabled, setPaginationEnabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { 
    locations, 
    totalPages,
    totalCount,
    loading,
    isPaginated,
    refetch,
    togglePagination,
    fetchAllLocations,
    fetchPaginatedLocations 
  } = useGetLocations({
    page: currentPage,
    limit: itemsPerPage,
    paginated: paginationEnabled
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const pathSegments = location.pathname.split('/').filter(Boolean);

  const formatSegment = (segment) =>
    segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  // Handle pagination toggle
  const handlePaginationToggle = () => {
    const newPaginationState = !paginationEnabled;
    setPaginationEnabled(newPaginationState);
    togglePagination(newPaginationState);
    
    if (!newPaginationState) {
      setCurrentPage(1); // Reset to first page when switching to non-paginated
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchPaginatedLocations(page, itemsPerPage);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (newLimit) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1);
    fetchPaginatedLocations(1, newLimit);
  };

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
        <h1 className="text-3xl font-bold text-gray-800">Locations</h1>
        <p className="text-sm text-gray-500">
          Manage your store locations and details
          {isPaginated && ` (${totalCount} total locations)`}
        </p>
      </div>

      {/* Actions: Search + Controls + Buttons */}
      <div className="flex flex-col gap-4 mb-6">
        {/* First Row: Search and Pagination Toggle */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:max-w-sm">
            <input
              type="text"
              placeholder="Search locations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>

  
        </div>

       
        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">
  
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Location
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="text-gray-500">Loading locations...</div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <Addlocations
          refetch={refetch}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Table */}
      <div className="mt-4 border-t pt-4">
        <LocationTable 
          locations={locations} 
          refetch={refetch}
          isPaginated={isPaginated}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Pagination Controls at Bottom (only for paginated view) */}
      {paginationEnabled && totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 px-4 py-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} locations
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Previous
            </button>
            
            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 text-sm border rounded ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Locations;