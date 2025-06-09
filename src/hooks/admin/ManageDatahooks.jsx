import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';


export const useFetchDistricts = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDistricts = async () => {
    try {
      const response = await axiosInstance.get('/districts');
      setDistricts(response.data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching districts:', error);
      setError('Error fetching districts');
      setDistricts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistricts();
  }, []);

  return { districts, loading, error, refetch: fetchDistricts };
};


export const useGetLocations = (options = {}) => {
  const {
    page = 1,
    limit = 10,
    paginated = true, 
  } = options;

  const [locations, setLocations] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaginated, setIsPaginated] = useState(paginated);

  const fetchLocations = async (currentPage = page, currentLimit = limit, shouldPaginate = paginated) => {
    try {
      setLoading(true);

      // Build query parameters based on pagination preference
      let queryParams = `?paginated=${shouldPaginate}`;

      if (shouldPaginate) {
        queryParams += `&page=${currentPage}&limit=${currentLimit}`;
      }

      const response = await axiosInstance.get(`/locations${queryParams}`);

      setLocations(response.data.data);
      setTotalCount(response.data.totalCount);
      setIsPaginated(response.data.paginated);

      // Only set pagination data if response is paginated
      if (response.data.paginated) {
        setTotalPages(response.data.totalPages);
      } else {
        setTotalPages(1); // Reset to 1 for non-paginated
      }

    } catch (err) {
      setError("Error fetching locations");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [page, limit, paginated]);

  // Method to switch between paginated and non-paginated
  const togglePagination = (shouldPaginate) => {
    fetchLocations(1, limit, shouldPaginate);
  };

  // Method to fetch all data (non-paginated)
  const fetchAllLocations = () => {
    fetchLocations(1, limit, false);
  };

  // Method to fetch paginated data
  const fetchPaginatedLocations = (currentPage = 1, currentLimit = limit) => {
    fetchLocations(currentPage, currentLimit, true);
  };

  return {
    locations,
    totalPages,
    totalCount,
    loading,
    error,
    isPaginated,
    refetch: fetchLocations,
    togglePagination,
    fetchAllLocations,
    fetchPaginatedLocations,
  };
};

export const useGetLocationByDistrict = (district) => {
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/locations/getBydistrict`, {
        params: { district }, // 👈 Pass as query param
      });
      setLocation(response.data);
    } catch (err) {
      setError('Failed to fetch location');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (district) {
      fetchLocation();
    }
  }, [district]);

  return { location, loading, error, refetch: fetchLocation };
};

export const useCreateLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createLocation = async (district, locationName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/locations', { district, locationName });
      return response.data; // Return the created location
    } catch (err) {
      setError('Failed to create location');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { createLocation, loading, error };
};


export const useUpdateLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateLocation = async (id, district, locationName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/locations/${id}`, { district, locationName });
      return response.data; // Return the updated location
    } catch (err) {
      setError('Failed to update location');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { updateLocation, loading, error };
};


export const useDeleteLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteLocation = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`/locations/${id}`);
      return id; // Return deleted location ID
    } catch (err) {
      setError('Failed to delete location');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteLocation, loading, error };
};