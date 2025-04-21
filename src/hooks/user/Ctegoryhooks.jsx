
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