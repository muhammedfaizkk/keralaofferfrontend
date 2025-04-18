import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import StorecategoryTable from '../../components/common/StorecategoryTable';
import Addstorecategory from '../../components/admin/forms/Addstorecategory';
import { useGetstorecategory, useDeletestorecategory } from '../../hooks/admin/Storecategory';
import DeleteConfirmation from '../../components/common/DeleteConfirmation';

function Storecategory() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editData, setEditData] = useState(null);

  const { categories, loading, error, refetch } = useGetstorecategory();
  const { deleteCategory } = useDeletestorecategory();

  const handleEditClick = (category) => {
    setEditData(category);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (deleteTarget) {
      try {
        await deleteCategory(deleteTarget._id);
        toast.success('Category deleted successfully!');
        refetch();
      } catch (error) {
        toast.error('Failed to delete category.');
        console.error(error);
      } finally {
        setDeleteTarget(null);
      }
    }
  };

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const formatSegment = (segment) =>
    segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-400 mb-3">
        {pathSegments.map((segment, idx) => (
          <span key={idx}>
            {idx !== 0 && <span className="mx-2 text-gray-300">/</span>}
            <span className={idx === pathSegments.length - 1 ? 'text-blue-600 font-semibold' : 'text-gray-500'}>
              {formatSegment(segment)}
            </span>
          </span>
        ))}
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Store Category</h1>
        <p className="text-sm text-gray-500">Manage your store members and details</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative w-full md:max-w-sm">
          <input
            type="text"
            placeholder="Search stores..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition w-full sm:w-auto">
            Export Members (Excel)
          </button>
          <button
            onClick={() => {
              setEditData(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New
          </button>
        </div>
      </div>

      {isModalOpen && (
        <Addstorecategory
          onClose={() => {
            setIsModalOpen(false);
            setEditData(null);
            refetch();
          }}
          editData={editData}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmation
          itemName="category"
          onCancel={() => setDeleteTarget(null)}
          onDelete={handleDelete}
        />
      )}

      <div className="mt-4 border-t pt-4">
        <StorecategoryTable
          categories={categories}
          onDeleteClick={setDeleteTarget}
          onEditClick={handleEditClick}
        />
      </div>
    </div>
  );
}

export default Storecategory;
