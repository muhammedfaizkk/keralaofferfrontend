import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';




export const useGetallstorenames = () => {
    const [storeNames, setStoreNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStoreNames = async () => {
        try {
            const response = await axiosInstance.get('/store/names');
            setStoreNames(response?.data);
            console.log('response?.data?.data',response?.data);
            
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
export const useGetOffertypes = () => {
    const [offertypes, setOffertypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchOffertypes = async () => {
        try {
            const response = await axiosInstance.get('/offertype');
            setOffertypes(response?.data?.data);
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

    return { offertypes, loading, error, refetch: fetchOffertypes };
};

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


export const useFetchDistricts = () => {
    const [districts, setDistricts] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchDistricts = async () => {
        try {
            const response = await axiosInstance.get('/districts');
            setDistricts(response.data);
            console.log('districts',response.data);
            
        } catch (error) {
            console.error('Error fetching districts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDistricts();
    }, []);

    return { districts, loading, refetch: fetchDistricts };
};


export const useGetLocations = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchLocations = async () => {
        try {
            const response = await axiosInstance.get('/locations'); // Make sure this matches your API route
            setLocations(response.data);
        } catch (error) {
            setError('Error fetching locations');
            console.error('Error fetching locations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    return { locations, loading, error, refetch: fetchLocations };
};
