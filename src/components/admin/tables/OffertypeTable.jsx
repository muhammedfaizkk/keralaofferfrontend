import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useDeleteOffertype } from '../../../hooks/admin/Offertypehooks';
import DeleteConfirmation from '../../common/DeleteConfirmation';
import Addoffertype from '../forms/Addoffertype';

const OffertypeTable = ({ offertypes, loading, error, refetch }) => {

  const { deleteOffertype } = useDeleteOffertype();
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // Handle the delete action
  const handleDelete = async () => {
    if (selectedId) {
      await deleteOffertype(selectedId);
      setSelectedId(null);
      refetch();
    }
  };

  // Open the edit modal
  const openEditModal = (data) => {
    setEditData(data);
    setShowModal(true);
  };

  // Loading and error states
  if (loading) return <div className="p-4 text-gray-500">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error fetching offer types.</div>;

  return (
    <div className="py-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {offertypes?.map((cat, index) => (
                <tr key={cat._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{cat.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button
                        title="Edit"
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => openEditModal(cat)}
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => setSelectedId(cat._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {offertypes.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-gray-400 py-4">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {selectedId && (
        <DeleteConfirmation
          itemName="Offer Type"
          onCancel={() => setSelectedId(null)}
          onDelete={handleDelete}
        />
      )}

      {/* Add or Edit Offer Type Modal */}
      {showModal && (
        <Addoffertype
          onClose={() => setShowModal(false)}
          refetch={refetch}
          editData={editData}
        />
      )}
    </div>
  );
};

export default OffertypeTable;
