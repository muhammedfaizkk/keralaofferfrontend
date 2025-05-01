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
// Create Location Hook
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

// Update Location Hook
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

// Delete Location Hook
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