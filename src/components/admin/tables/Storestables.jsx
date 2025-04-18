import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useDeleteStore } from "../../../hooks/admin/Storehooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../common/DeleteConfirmation"; // Import the DeleteConfirmation component

const Storestables = ({ stores, refetch, onEdit }) => {
  const { deleteStore, loading: deleteLoading } = useDeleteStore();
  const navigate = useNavigate();
  const baseUrl = `http://localhost:5001`;

  // State for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState(null);

  const handleDeleteClick = (store) => {
    setStoreToDelete(store);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteStore(storeToDelete._id);
      toast.success("Store deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete store");
    } finally {
      setShowDeleteConfirm(false);
      setStoreToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setStoreToDelete(null);
  };

  if (!stores || stores.length === 0) {
    return <div className="text-center py-8">No stores found</div>;
  }

  return (
    <div className="py-6">
      
      {showDeleteConfirm && (
        <DeleteConfirmation
          itemName="store"
          onCancel={handleDeleteCancel}
          onDelete={handleDeleteConfirm}
        />
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Store Listings</h2>
        </div>

        <div className="overflow-auto" style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none', 
          overflowX: 'auto',
        }}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Store Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Store Logo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Owner Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stores.map((store) => (
                <tr key={store._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{store.storeName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <img
                      src={store.logoUrl}
                      alt={store.storeName}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{store.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{store.ownerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{store.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{store.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {store.location || 'N/A'} ({store.district})
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{store.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        title="View"
                        onClick={() => navigate(`/admin/storeads/${store._id}`)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="text-yellow-500 hover:text-yellow-700"
                        title="Edit"
                        onClick={() => onEdit(store)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                        onClick={() => handleDeleteClick(store)}
                        disabled={deleteLoading}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Storestables;