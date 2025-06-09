import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useGetAllAdsWithStoreadmin } from '../../hooks/admin/Storeads';
import SearchFilters from '../../components/user/SearchFilters';
import { toast } from "react-toastify";
import { useSearchParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { FaFileExcel } from 'react-icons/fa';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'react-feather';

function Adsreport() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        page: parseInt(searchParams.get('page')) || 1,
        limit: parseInt(searchParams.get('limit')) || 10,
        searchQuery: searchParams.get('search') || '',
        offerType: searchParams.get('offerType') || '',
        storeName: searchParams.get('storeName') || '',
        category: searchParams.get('category') || '',
        district: searchParams.get('district') || '',
        location: searchParams.get('location') || ''
    });

    // Use ref to track if this is the initial load
    const isInitialLoad = useRef(true);
    const prevFiltersRef = useRef(filters);

    const { adsWithStore, loading, error, refetch } = useGetAllAdsWithStoreadmin(filters);

    // Export to Excel function
    const exportToExcel = useCallback(() => {
        const excelData = (adsWithStore?.data || []).map(ad => ({
            'Title': ad.title,
            'Description': ad.description,
            'Offer Type': ad.offerType,
            'Store Name': ad.storeId?.storeName,
            'Category': ad.storeId?.category,
            'Location': ad.storeId?.location,
            'District': ad.storeId?.district,
            'Start Date': new Date(ad.startDate).toLocaleDateString(),
            'End Date': new Date(ad.endDate).toLocaleDateString(),
            'Clicks': ad.clicks || 0,
            'Contact': ad.storeId?.contact,
            'Email': ad.storeId?.email,
            'Address': ad.storeId?.address
        }));

        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Ads Report");
        XLSX.writeFile(wb, "ads-report.xlsx");
    }, [adsWithStore]);

    // Function to check if filters have actually changed
    const filtersChanged = useCallback((newFilters, oldFilters) => {
        return JSON.stringify(newFilters) !== JSON.stringify(oldFilters);
    }, []);

    // Update URL and refetch only when filters actually change
    useEffect(() => {
        // Skip on initial load or if filters haven't changed
        if (isInitialLoad.current) {
            isInitialLoad.current = false;
            prevFiltersRef.current = filters;
            return;
        }

        if (!filtersChanged(filters, prevFiltersRef.current)) {
            return;
        }

        // Update URL params
        const params = new URLSearchParams();
        
        if (filters.page > 1) params.set('page', filters.page.toString());
        if (filters.limit !== 10) params.set('limit', filters.limit.toString());
        if (filters.searchQuery.trim()) params.set('search', filters.searchQuery);
        if (filters.offerType.trim()) params.set('offerType', filters.offerType);
        if (filters.storeName.trim()) params.set('storeName', filters.storeName);
        if (filters.category.trim()) params.set('category', filters.category);
        if (filters.district.trim()) params.set('district', filters.district);
        if (filters.location.trim()) params.set('location', filters.location);
        
        setSearchParams(params);
        
        // Update previous filters ref
        prevFiltersRef.current = filters;
        
        // Trigger refetch
        refetch(filters);
    }, [filters, refetch, setSearchParams, filtersChanged]);

    // Handle filter changes
    const handleFilterChange = useCallback((newFilters) => {
        console.log('Raw filters received:', newFilters);
        
        // Process the filters to extract string values
        const processedFilters = {
            page: 1, // Reset to first page when filters change
            limit: filters.limit,
            searchQuery: newFilters.searchQuery || '',
            offerType: '',
            storeName: '',
            category: '',
            district: '',
            location: ''
        };

        // Extract values from filter objects
        Object.entries(newFilters).forEach(([key, value]) => {
            if (key === 'searchQuery') {
                processedFilters.searchQuery = value || '';
                return;
            }

            // Handle filter objects with label property
            if (value && typeof value === 'object' && value.label) {
                switch (key) {
                    case 'All Offer Types':
                        processedFilters.offerType = value.label;
                        break;
                    case 'All Stores':
                        processedFilters.storeName = value.label;
                        break;
                    case 'All Categories':
                        processedFilters.category = value.label;
                        break;
                    case 'All Districts':
                        processedFilters.district = value.label;
                        break;
                    case 'All Locations':
                        processedFilters.location = value.label;
                        break;
                }
            }
        });

        console.log('Processed filters:', processedFilters);
        setFilters(processedFilters);
    }, [filters.limit]);

    // Handle sharing filters
    const handleShareFilters = useCallback(() => {
        const params = new URLSearchParams();
        
        if (filters.searchQuery.trim()) params.set('search', filters.searchQuery);
        if (filters.offerType.trim()) params.set('offerType', filters.offerType);
        if (filters.storeName.trim()) params.set('storeName', filters.storeName);
        if (filters.category.trim()) params.set('category', filters.category);
        if (filters.district.trim()) params.set('district', filters.district);
        if (filters.location.trim()) params.set('location', filters.location);
        
        const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

        navigator.clipboard.writeText(url)
            .then(() => toast.success('Link copied to clipboard!'))
            .catch(() => toast.error('Failed to copy link'));
    }, [filters]);

    // Handle page change
    const handlePageChange = useCallback((newPage) => {
        setFilters(prev => ({
            ...prev,
            page: newPage
        }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Transform filters for SearchFilters component
    const getInitialFiltersForSearchComponent = useCallback(() => {
        const initialFilters = {
            searchQuery: filters.searchQuery
        };

        // Only add filters that have values
        if (filters.offerType.trim()) {
            initialFilters['All Offer Types'] = { label: filters.offerType };
        }
        if (filters.storeName.trim()) {
            initialFilters['All Stores'] = { label: filters.storeName };
        }
        if (filters.category.trim()) {
            initialFilters['All Categories'] = { label: filters.category };
        }
        if (filters.district.trim()) {
            initialFilters['All Districts'] = { label: filters.district };
        }
        if (filters.location.trim()) {
            initialFilters['All Locations'] = { label: filters.location };
        }

        return initialFilters;
    }, [filters]);

    // Clear all filters function
    const clearAllFilters = useCallback(() => {
        setFilters({
            page: 1,
            limit: 10,
            searchQuery: '',
            offerType: '',
            storeName: '',
            category: '',
            district: '',
            location: ''
        });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center py-8">
                Error loading ads: {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Ads Report</h1>
                <button
                    onClick={exportToExcel}
                    className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded flex items-center"
                    disabled={!adsWithStore?.data || adsWithStore.data.length === 0}
                >
                    <FaFileExcel className="mr-2" /> Export to Excel
                </button>
            </div>

            <SearchFilters
                onFilterChange={handleFilterChange}
                totalResults={adsWithStore?.totalAds || 0}
                initialFilters={getInitialFiltersForSearchComponent()}
                handleShareFilters={handleShareFilters}
            />

            <div className="mt-8">
                {(!adsWithStore?.data || adsWithStore.data.length === 0) ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No ads found matching your filters</p>
                        <button
                            onClick={clearAllFilters}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Store</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offer Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {adsWithStore.data.map(ad => (
                                        <tr key={ad._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ad.storeId?.storeName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{ad.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                    {ad.offerType}
                                                </span>
                                            </td>
                                            
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ad.storeId?.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ad.storeId?.location}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ad.storeId?.district}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(ad.startDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(ad.endDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {ad.clicks || 0}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {adsWithStore.totalPages > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <div className="text-sm text-gray-500">
                                    Showing {(filters.page - 1) * filters.limit + 1} to{' '}
                                    {Math.min(filters.page * filters.limit, adsWithStore.totalAds)} of{' '}
                                    {adsWithStore.totalAds} entries
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handlePageChange(1)}
                                        disabled={filters.page === 1}
                                        className={`p-2 rounded-md ${filters.page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        <ChevronsLeft size={18} />
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(filters.page - 1)}
                                        disabled={filters.page === 1}
                                        className={`p-2 rounded-md ${filters.page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <span className="px-4 py-2 text-gray-700">
                                        Page {filters.page} of {adsWithStore.totalPages}
                                    </span>
                                    <button
                                        onClick={() => handlePageChange(filters.page + 1)}
                                        disabled={filters.page === adsWithStore.totalPages}
                                        className={`p-2 rounded-md ${filters.page === adsWithStore.totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(adsWithStore.totalPages)}
                                        disabled={filters.page === adsWithStore.totalPages}
                                        className={`p-2 rounded-md ${filters.page === adsWithStore.totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                                    >
                                        <ChevronsRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Adsreport;