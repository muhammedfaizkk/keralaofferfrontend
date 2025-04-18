import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';


export const useGetStore = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStores = async () => {
    try {
      const response = await axiosInstance.get('/Store');
      setStores(response.data);
    } catch (error) {
      setError('Error fetching stores');
      console.error('Error fetching stores:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return { stores, loading, error, refetch: fetchStores };
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
