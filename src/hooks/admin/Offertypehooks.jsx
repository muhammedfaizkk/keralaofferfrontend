import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';




export const useGetOffertypes = () => {
  const [offertypes, setOffertypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalItems: 0,
  });
  const [search, setSearch] = useState('');

  const fetchOffertypes = async (page = 1, limit = 10, searchQuery = '') => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/offertype', {
        params: {
          page,
          limit,
          search: searchQuery,
        },
      });
      setOffertypes(response?.data?.data);
      setPagination({
        page: response?.data?.currentPage,
        limit: parseInt(limit),
        totalPages: response?.data?.totalPages,
        totalItems: response?.data?.totalItems,
      });
    } catch (error) {
      setError('Error fetching offertypes');
      console.error('Error fetching offertypes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffertypes();
  }, []);

  return { 
    offertypes, 
    loading, 
    error, 
    pagination,
    refetch: fetchOffertypes,
    setSearch,
    search,
  };
};



export const useCreateOffertype = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOffertype = async (offertypeData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/offertype', offertypeData);
      return response.data;
    } catch (err) {
      setError('Failed to create offertype');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { createOffertype, loading, error };
};


export const useUpdateOffertype = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateOffertype = async (id, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/offertype/${id}`, updatedData);
      return response.data;
    } catch (err) {
      setError('Failed to update offertype');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateOffertype, loading, error };
};


export const useDeleteOffertype = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteOffertype = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/offertype/${id}`);
      return id;
    } catch (err) {
      setError('Failed to delete offertype');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteOffertype, loading, error };
};
