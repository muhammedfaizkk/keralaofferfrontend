import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

export const useFetchBanners = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBanners = async () => {
        try {
            const response = await axiosInstance.get('/banners');
            setBanners(response.data);
        } catch (error) {
            console.error('Error fetching banners:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    return { banners, loading, refetch: fetchBanners };
};