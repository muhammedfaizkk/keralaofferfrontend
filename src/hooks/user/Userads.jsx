import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

export const useFetchAds = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAdsWithStore = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get('/storeads/adswithstore');
            setAds(response.data);
        } catch (error) {
            console.error('Error fetching ads:', error);
            setError(error.response?.data?.message || 'Failed to fetch ads');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdsWithStore();
    }, []);

    return { ads, loading, error, refetch: fetchAdsWithStore };
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