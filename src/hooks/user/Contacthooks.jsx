import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

export const useContactSubmit = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitContact = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post('/contact/submit', formData);
            return response.data;
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to send message');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { submitContact, loading, error };
}; 