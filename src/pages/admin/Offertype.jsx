import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Plus, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import OffertypeTable from '../../components/admin/tables/OffertypeTable';
import Addoffertype from '../../components/admin/forms/Addoffertype';
import { useGetOffertypes } from '../../hooks/admin/Offertypehooks';

function Offertype() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const { 
    offertypes, 
    loading, 
    error, 
    refetch, 
    pagination, 
    setSearch,
    search 
  } = useGetOffertypes({ paginated: true }); 

  
  const [searchInput, setSearchInput] = useState('');

  const formatSegment = (segment) =>
    segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    refetch(1, pagination.limit, searchInput);
  };

  const handlePageChange = (newPage) => {
    refetch(newPage, pagination.limit, search);
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
      {loading ? (
        <div className="p-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-500">Loading offer types...</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative w-full md:max-w-sm">
              <input
                type="text"
                placeholder="Search offer types..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </form>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={() => {}}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition w-full sm:w-auto"
              >
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
            <Addoffertype
              onClose={() => setIsModalOpen(false)}
              refetch={() => refetch(pagination.page, pagination.limit, search)}
            />
          )}

          <div className="mt-4 border-t pt-4">
            <OffertypeTable 
              offertypes={offertypes} 
              refetch={() => refetch(pagination.page, pagination.limit, search)} 
              loading={loading} 
              error={error} 
            />
          </div>

    
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.totalItems)} of{' '}
                {pagination.totalItems} entries
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={pagination.page === 1}
                  className={`p-2 rounded-md ${pagination.page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <ChevronsLeft size={18} />
                </button>
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className={`p-2 rounded-md ${pagination.page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="px-4 py-2 text-gray-700">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className={`p-2 rounded-md ${pagination.page === pagination.totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <ChevronRight size={18} />
                </button>
                <button
                  onClick={() => handlePageChange(pagination.totalPages)}
                  disabled={pagination.page === pagination.totalPages}
                  className={`p-2 rounded-md ${pagination.page === pagination.totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <ChevronsRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Offertype;