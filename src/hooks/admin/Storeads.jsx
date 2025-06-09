import { useState, useEffect ,useRef ,useCallback } from 'react';
import axiosInstance from '../../api/axiosInstance';


export const useGetStoreads = (id) => {
    const [storeads, setStoreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStoreads = async () => {
        try {
            const response = await axiosInstance.get(`/storeads/${id}`);
            setStoreads(response?.data);
        } catch (error) {
            setError('Error fetching store ads');
            console.error('Error fetching store ads:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchStoreads();
    }, [id]);

    return { storeads, loading, error, refetch: fetchStoreads };
}

export const useCreateStoreads = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createStoreads = async (storeadsData, id) => {
        

        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post(`/storeads/${id}`, storeadsData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Let axios handle multipart encoding
                },
            });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create store ad');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { createStoreads, loading, error };
};


export const useUpdateStoreads = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateStoreads = async (id, updatedData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.put(`/storeads/${id}`, updatedData);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update store ad');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateStoreads, loading, error };
};


export const useGetTotalAdImagesCount = () => {
    const [totalImages, setTotalImages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTotalAdImages = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.get('/storeads/getTotalAdImagesCount');
            setTotalImages(response.data.totalImages);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch image count');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTotalAdImages();
    }, []);

    return { totalImages, loading, error, refetch: fetchTotalAdImages };
};


export const useGetAllAdsWithStore = (filters = {}) => {
    const [adsWithStore, setAdsWithStore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const prevFiltersRef = useRef(null);
    const isInitialMount = useRef(true);

    const fetchAdsWithStore = useCallback(async (filterParams) => {
        try {
            setLoading(true);
            setError(null);
            
            const {
                page = 1,
                limit = 16,
                searchQuery = '',
                offerType = '',
                storeName = '',
                category = '',
                district = '',
                location = ''
            } = filterParams || {};

            const params = new URLSearchParams();
            params.set('page', page.toString());
            params.set('limit', limit.toString());

            // Only add parameters if they have values
            if (searchQuery && searchQuery.trim()) {
                params.set('searchQuery', searchQuery.trim());
            }
            if (offerType && offerType.trim()) {
                params.set('offerType', offerType.trim());
            }
            if (storeName && storeName.trim()) {
                params.set('storeName', storeName.trim());
            }
            if (category && category.trim()) {
                params.set('category', category.trim());
            }
            if (district && district.trim()) {
                params.set('district', district.trim());
            }
            if (location && location.trim()) {
                params.set('location', location.trim());
            }

            console.log('API Request URL:', `/storeads/adswithstoreadmin?${params.toString()}`);
            console.log('Filters being sent:', filterParams);

            const response = await axiosInstance.get(`/storeads/adswithstoreadmin?${params.toString()}`);
            setAdsWithStore(response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error fetching ads with store information';
            setError(errorMessage);
            console.error('Error fetching ads with store:', error);
            console.error('Error response:', error.response?.data);
        } finally {
            setLoading(false);
        }
    }, []);

    // Compare filters to prevent unnecessary API calls
    const filtersEqual = useCallback((filters1, filters2) => {
        if (!filters1 || !filters2) return false;
        
        const keys = ['page', 'limit', 'searchQuery', 'offerType', 'storeName', 'category', 'district', 'location'];
        
        return keys.every(key => {
            const val1 = filters1[key] || '';
            const val2 = filters2[key] || '';
            return val1 === val2;
        });
    }, []);

    // Effect to handle filter changes
    useEffect(() => {
        // Skip initial mount comparison
        if (isInitialMount.current) {
            isInitialMount.current = false;
            prevFiltersRef.current = filters;
            fetchAdsWithStore(filters);
            return;
        }

        // Only fetch if filters have actually changed
        if (!filtersEqual(filters, prevFiltersRef.current)) {
            prevFiltersRef.current = { ...filters };
            fetchAdsWithStore(filters);
        }
    }, [
        filters.page,
        filters.limit,
        filters.searchQuery,
        filters.offerType,
        filters.storeName,
        filters.category,
        filters.district,
        filters.location,
        fetchAdsWithStore,
        filtersEqual
    ]);

    return {
        adsWithStore,
        loading,
        error,
        refetch: fetchAdsWithStore
    };
};

export const useGetAllAdsWithStoreadmin = (filters = {}) => {
    const [adsWithStore, setAdsWithStore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Use ref to track previous filters to prevent unnecessary calls
    const prevFiltersRef = useRef(null);
    const isInitialMount = useRef(true);

    const fetchAdsWithStore = useCallback(async (filterParams) => {
        try {
            setLoading(true);
            setError(null);
            
            const {
                page = 1,
                limit = 10,
                searchQuery = '',
                offerType = '',
                storeName = '',
                category = '',
                district = '',
                location = ''
            } = filterParams || {};

            const params = new URLSearchParams();
            params.set('page', page.toString());
            params.set('limit', limit.toString());

            // Only add parameters if they have values
            if (searchQuery && searchQuery.trim()) {
                params.set('searchQuery', searchQuery.trim());
            }
            if (offerType && offerType.trim()) {
                params.set('offerType', offerType.trim());
            }
            if (storeName && storeName.trim()) {
                params.set('storeName', storeName.trim());
            }
            if (category && category.trim()) {
                params.set('category', category.trim());
            }
            if (district && district.trim()) {
                params.set('district', district.trim());
            }
            if (location && location.trim()) {
                params.set('location', location.trim());
            }

            console.log('API Request URL:', `/storeads/adswithstoreadmin?${params.toString()}`);
            console.log('Filters being sent:', filterParams);

            const response = await axiosInstance.get(`/storeads/adswithstoreadmin?${params.toString()}`);
            setAdsWithStore(response.data);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error fetching ads with store information';
            setError(errorMessage);
            console.error('Error fetching ads with store:', error);
            console.error('Error response:', error.response?.data);
        } finally {
            setLoading(false);
        }
    }, []);

    // Compare filters to prevent unnecessary API calls
    const filtersEqual = useCallback((filters1, filters2) => {
        if (!filters1 || !filters2) return false;
        
        const keys = ['page', 'limit', 'searchQuery', 'offerType', 'storeName', 'category', 'district', 'location'];
        
        return keys.every(key => {
            const val1 = filters1[key] || '';
            const val2 = filters2[key] || '';
            return val1 === val2;
        });
    }, []);

    // Effect to handle filter changes
    useEffect(() => {
        // Skip initial mount comparison
        if (isInitialMount.current) {
            isInitialMount.current = false;
            prevFiltersRef.current = filters;
            fetchAdsWithStore(filters);
            return;
        }

        // Only fetch if filters have actually changed
        if (!filtersEqual(filters, prevFiltersRef.current)) {
            prevFiltersRef.current = { ...filters };
            fetchAdsWithStore(filters);
        }
    }, [
        filters.page,
        filters.limit,
        filters.searchQuery,
        filters.offerType,
        filters.storeName,
        filters.category,
        filters.district,
        filters.location,
        fetchAdsWithStore,
        filtersEqual
    ]);

    return {
        adsWithStore,
        loading,
        error,
        refetch: fetchAdsWithStore
    };
};
export const useDeleteStoreads = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteStoreads = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.delete(`/storeads/${id}`);
            return id;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete store ad');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteStoreads, loading, error };
};
