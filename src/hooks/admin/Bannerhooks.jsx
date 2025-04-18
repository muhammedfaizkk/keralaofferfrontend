import { useState, useEffect } from 'react';  
import axiosInstance from '../../api/axiosInstance';

// Fetch Banners Hook
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
  
  // Create Banner Hook
  export const useCreateBanner = () => {
    const createBanner = async (formData) => {
      try {
        const response = await axiosInstance.post('/banners', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    };
  
    return { createBanner };
  };
  
  // Delete Banner Hook
  export const useDeleteBanner = () => {
    const deleteBanner = async (id) => {
      try {
        await axiosInstance.delete(`/banners/${id}`);
      } catch (error) {
        throw error;
      }
    };
  
    return { deleteBanner };
  };
  
  // Update Banner Hook
  export const useUpdateBanner = () => {
    const updateBanner = async (id, formData) => {
      try {
        const response = await axiosInstance.put(`/banners/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } catch (error) {
        throw error;
      }
    };
  
    return { updateBanner };
  };
  