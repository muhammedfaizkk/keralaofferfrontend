import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';


export const useGetstorecategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/category');
      console.log(response?.data);
      setCategories(response?.data);
    } catch (error) {
      setError('Error fetching categories');
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, refetch: fetchCategories };
};

export const useCreatestorecategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCategory = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/category', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (err) {
      setError('Failed to create category');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createCategory, loading, error };
};

export const useUpdatestorecategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCategory = async (id, formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/category/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (err) {
      setError('Failed to update category');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateCategory, loading, error };
};

// DELETE Hook
export const useDeletestorecategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCategory = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/category/${id}`);
      return id;
    } catch (err) {
      setError('Failed to delete category');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteCategory, loading, error };
};
