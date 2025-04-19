import { useState, useEffect } from 'react';
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
        console.log('thi is hook', id);

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


// UPDATE Hook
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

export const useGetAllAdsWithStore = () => {
    const [adsWithStore, setAdsWithStore] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAdsWithStore = async () => {
        try {
            const response = await axiosInstance.get('/storeads/adswithstore');
            setAdsWithStore(response.data);
        } catch (error) {
            setError('Error fetching ads with store information');
            console.error('Error fetching ads with store:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdsWithStore();
    }, []);

    return {
        adsWithStore,
        loading,
        error,
        refetch: fetchAdsWithStore
    };
}


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