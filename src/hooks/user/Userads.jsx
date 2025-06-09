import { useState, useEffect,useMemo } from 'react';
import axiosInstance from '../../api/axiosInstance';

export const useFetchAds = (page = 1, filters = {}) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(page);

  const stableFilters = useMemo(() => filters, [
    filters.storeName, 
    filters.category, 
    filters.district, 
    filters.location, 
    filters.offerType, 
    filters.searchQuery 
  ]);

  const fetchAdsWithStore = async (pageNumber = 1, filtersObj = stableFilters) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({ page: pageNumber });
      if (filtersObj.storeName) params.append('storeName', filtersObj.storeName);
      if (filtersObj.category) params.append('category', filtersObj.category);
      if (filtersObj.district) params.append('district', filtersObj.district);
      if (filtersObj.location) params.append('location', filtersObj.location);
      if (filtersObj.offerType) params.append('offerType', filtersObj.offerType);
      if (filtersObj.searchQuery) params.append('searchQuery', filtersObj.searchQuery); // Changed from search to searchQuery

      const response = await axiosInstance.get(`/storeads/adswithstore?${params.toString()}`);

      setAds(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(response.data.currentPage || 1);
    } catch (err) {
      console.error('Error fetching ads:', err);
      setError(err.response?.data?.message || 'Failed to fetch ads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdsWithStore(page, stableFilters);
  }, [page, stableFilters]);

  return {
    ads,
    loading,
    error,
    totalPages,
    currentPage,
    setPage: (p) => fetchAdsWithStore(p, stableFilters),
  };
};
export const useFetchStoreAds = (storeId) => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStoreAds = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get(`/storeads/store/${storeId}`);
            setAds(response.data);
        } catch (error) {
            console.error('Error fetching store ads:', error);
            setError(error.response?.data?.message || 'Failed to fetch store ads');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (storeId) {
            fetchStoreAds();
        }
    }, [storeId]);

    return { ads, loading, error, refetch: fetchStoreAds };
};

export const useFetchAdById = (adId) => {
    const [ad, setAd] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAd = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get(`/storeads/ad/${adId}`);
            setAd(response.data);
        } catch (error) {
            console.error('Error fetching ad:', error);
            setError(error.response?.data?.message || 'Failed to fetch ad');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (adId) {
            fetchAd();
        }
    }, [adId]);

    return { ad, loading, error, refetch: fetchAd };
};

export const useGetallstorenames = () => {
    const [storeNames, setStoreNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchStoreNames = async () => {
      try {
        const response = await axiosInstance.get('/store/names');
        setStoreNames(response?.data?.data);
      } catch (error) {
        setError('Error fetching store names');
        console.error('Error fetching store names:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchStoreNames();
    }, []);
  
    return { storeNames, loading, error, refetch: fetchStoreNames };
  };