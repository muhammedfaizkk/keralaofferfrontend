import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  useDeleteLocation,
  useUpdateLocation,
} from "../../../hooks/admin/ManageDatahooks";
import DeleteConfirmation from "../../common/DeleteConfirmation";
import Addlocations from "../../admin/forms/Addlocations";

const LocationTable = ({ 
  refetch, 
  locations, 
  isPaginated = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange 
}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { deleteLocation } = useDeleteLocation();
  const { updateLocation } = useUpdateLocation();

  const handleDelete = async (id) => {
    try {
      await deleteLocation(id);
      toast.success("Location deleted successfully");
      setShowDeleteModal(false);
      refetch();
    } catch (err) {
      toast.error("Failed to delete location");
    }
  };

  const handleEdit = async (id, updatedLocation) => {
    try {
      await updateLocation(id, updatedLocation.district, updatedLocation.locationName);
      toast.success("Location updated successfully");
      setShowEditModal(false);
      refetch();
    } catch (err) {
      toast.error("Failed to update location");
    }
  };

  return (
    <div className="py-6">
      {/* Table Header Info */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {isPaginated ? (
            <span>Showing paginated results</span>
          ) : (
            <span>Showing all {locations?.length || 0} locations</span>
          )}
        </div>
        
        {/* Optional: Add sorting controls here */}
        <div className="text-sm text-gray-500">
          {isPaginated ? `Page ${currentPage} of ${totalPages}` : 'All data loaded'}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  District
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {locations?.length > 0 ? (
                locations.map((loc, index) => (
                  <tr key={loc._id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {loc.district}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {loc.locationName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <button
                          title="Edit"
                          onClick={() => {
                            setSelectedLocation(loc);
                            setShowEditModal(true);
                          }}
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => {
                            setSelectedLocation(loc);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <div className="text-lg font-medium mb-2">No locations found</div>
                      <div className="text-sm">Add your first location to get started</div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {showDeleteModal && selectedLocation && (
        <DeleteConfirmation
          itemName={selectedLocation.locationName}
          onCancel={() => setShowDeleteModal(false)}
          onDelete={() => handleDelete(selectedLocation._id)}
        />
      )}

      {showEditModal && (
        <Addlocations
          locationToEdit={selectedLocation}
          onClose={() => {
            setShowEditModal(false);
            refetch(); 
          }}
        />
      )}
    </div>
  );
};

export default LocationTable;