import React, { useState } from 'react';
import { X } from 'lucide-react';

const Addoffertype = ({ onClose }) => {
  const [offertype, setoffertype] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!storeCategory.trim()) {
      alert('Please enter a store category.');
      return;
    }

    // TODO: Handle submission logic (e.g. send to API or state)
    console.log('Submitted Store Category:', storeCategory);

    // Close modal or reset field
    setStoreCategory('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Add offertype</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter offertype</label>
            <input
              type="text"
              value={offertype}
              onChange={(e) => setoffertype(e.target.value)}
              placeholder="Type category name"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addoffertype;
 
