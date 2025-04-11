import React, { useState } from 'react';
import { X } from 'lucide-react';

const districtOptions = {
  "Ernakulam": ["Kochi", "Aluva", "Perumbavoor"],
  "Thiruvananthapuram": ["Kazhakoottam", "Neyyattinkara", "Attingal"],
  "Kozhikode": ["Calicut", "Vadakara", "Koyilandy"]
  // Add more districts and locations if needed
};

const Addlocations = ({ onClose }) => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDistrict || !selectedLocation) {
      alert('Please select both district and location.');
      return;
    }

    console.log('Selected District:', selectedDistrict);
    console.log('Entered Location:', selectedLocation);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Add Location</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">

          {/* District Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select District --</option>
              {Object.keys(districtOptions).map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          {/* Location Text Input */}
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
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Addlocations;
