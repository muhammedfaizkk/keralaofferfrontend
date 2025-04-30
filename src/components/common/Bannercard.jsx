import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

function Bannercard({ banner, onDelete }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  
  return (
    <div className="relative group w-full max-w-sm rounded overflow-hidden shadow hover:shadow-lg transition duration-300">
      {/* Display banner image */}
      <img
        src={`${BASE_URL}${banner.bannerImage[0]}`} // Full path to the image
        alt={banner.title || 'Banner'}
        className="w-full h-48 object-cover"
      />

      <h3 className="text-lg font-semibold p-3">{banner.title || 'No Title'}</h3>

      <button
        onClick={onDelete}
        className="absolute top-2 right-2 p-2 bg-white rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        title="Delete Banner"
      >
        <RiDeleteBin6Line size={20} />
      </button>
    </div>
  );
}

export default Bannercard;
