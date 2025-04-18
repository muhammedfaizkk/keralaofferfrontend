import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const StorecategoryTable = ({ categories = [], onDeleteClick, onEditClick }) => {
  return (
    <div className="py-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {categories?.map((cat, index) => (
                <tr key={cat._id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <img className="w-20" src={cat.catPhotographs} alt="" />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{cat.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => onEditClick(cat)}
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => onDeleteClick(cat)}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
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
    </div>
  );
};

export default StorecategoryTable;
