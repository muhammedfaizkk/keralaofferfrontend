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

export const useGetOffertypes = ({ paginated = true } = {}) => {
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
                    paginated: paginated.toString(), // 'true' or 'false'
                },
            });

            setOffertypes(response?.data?.data || []);

            if (paginated) {
                setPagination({
                    page: response?.data?.currentPage,
                    limit: parseInt(limit),
                    totalPages: response?.data?.totalPages,
                    totalItems: response?.data?.totalItems,
                });
            }
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

}

export const useGetstorecategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('/category');
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
