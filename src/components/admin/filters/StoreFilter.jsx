import React from 'react';

const StoreFilter = ({ stores, selectedStore, onStoreChange, loading }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Store
      </label>
      <select
        value={selectedStore}
        onChange={(e) => onStoreChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        disabled={loading}
      >
        <option value="">All Stores</option>
        {stores.map((store) => (
          <option key={store._id} value={store.storeName}>
            {store.storeName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StoreFilter;