import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useFetchDistricts, useCreateLocation, useUpdateLocation } from '../../../hooks/admin/ManageDatahooks';
import { toast } from 'react-toastify'; // Import toast

const Addlocations = ({ onClose, locationToEdit,refetch }) => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const { districts, loading: districtsLoading } = useFetchDistricts();
  const { createLocation, loading: createLoading, error: createError } = useCreateLocation();
  const { updateLocation, loading: updateLoading, error: updateError } = useUpdateLocation();

  // Set the form for editing when locationToEdit is provided
  useEffect(() => {
    if (locationToEdit) {
      setSelectedDistrict(locationToEdit.district);
      setSelectedLocation(locationToEdit.location);
    }
  }, [locationToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDistrict || !selectedLocation) {
      toast.error('Please select both district and location.'); // Toast error if fields are empty
      return;
    }

    try {
      if (locationToEdit) {
        // If editing, call updateLocation API
        await updateLocation(locationToEdit._id, selectedDistrict, selectedLocation);
        toast.success('Location updated successfully!');
      } else {
        // If creating, call createLocation API
        await createLocation(selectedDistrict, selectedLocation);
        refetch()
        toast.success('Location created successfully!');
      }
      onClose(); // Close the modal after successful operation
    } catch (err) {
      // Handle error if needed
      toast.error('Failed to process the location');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{locationToEdit ? 'Edit Location' : 'Add Location'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* District Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select District --</option>
              {districtsLoading ? (
                <option disabled>Loading...</option>
              ) : (
                districts?.map((district) => (
                  <option key={district} value={district}>
                    {district.title}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Location Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter Location</label>
            <input
              type="text"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              placeholder="Type location name"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={createLoading || updateLoading} // Disable submit button while loading
            >
              {createLoading || updateLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Submit'}
            </button>
          </div>

          {/* Error Message */}
          {(createError || updateError) && (
            <p className="text-red-500 text-sm mt-2">{createError || updateError}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Addlocations;
