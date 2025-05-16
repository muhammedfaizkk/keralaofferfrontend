import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../api/axiosInstance';


export const useGetStore = (page = 1, filters = {}) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(page);

  const fetchStores = useCallback(async () => {
    try {
      setLoading(true);
      // Build query parameters
      const params = new URLSearchParams({
        page: page,
        limit: 10, // Items per page
      });

      // Add filters if they exist and are not empty
      if (filters.searchTerm?.trim()) params.append('search', filters.searchTerm);
      if (filters.category?.trim()) params.append('category', filters.category);
      if (filters.district?.trim()) params.append('district', filters.district);

    
      const response = await axiosInstance.get(`/Store?${params.toString()}`);
     
      
      setStores(response.data.stores || []);
      setTotalPages(response.data.totalPages || 1);
      setCurrentPage(response.data.currentPage || 1);
      setError(null);
    } catch (error) {
      console.error('Error fetching stores:', error.response || error);
      setError(error.response?.data?.message || 'Error fetching stores');
      setStores([]);
    } finally {
      setLoading(false);
    }
  }, [page, filters.searchTerm, filters.category, filters.district]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  return { 
    stores, 
    loading, 
    error, 
    refetch: fetchStores,
    totalPages,
    currentPage,
    setPage: (newPage) => setCurrentPage(newPage)
  };
};


export const useCreateStore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createStore = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/Store', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create store');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createStore, loading, error };
};

export const useUpdateStore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateStore = async (id, formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/Store/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update store');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateStore, loading, error };
};

// Delete Store Location
export const useDeleteStore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteStore = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/Store/${id}`);
      return id; // Return deleted store ID
    } catch (err) {
      setError('Failed to delete store');
      console.error('Error deleting store:', err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteStore, loading, error };
};
