import React from 'react';
import { FaLink, FaCalendarAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const OfferCard = ({ offer, onCopyLink }) => {
  // Format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="relative">
        <Link to="/offer" className="block overflow-hidden">
          <div className="relative h-[200px] overflow-hidden">
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>

        {/* Copy Link Icon with improved hover effect */}
        <button
          onClick={() => onCopyLink(offer.id)}
          className="absolute top-3 right-3 z-10 transform hover:scale-110 transition-all duration-200"
        >
          <div className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white">
            <FaLink className="w-4 h-4 text-gray-700" />
          </div>
        </button>
      </div>

      <div className="p-4">
        {/* Category and Title Section */}
        <div className="flex justify-between items-start space-x-2 mb-3">
          <span 
            className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-xs font-medium tracking-wide"
            style={{ fontFamily: 'Inter' }}
          >
            {offer.category}
          </span>
          <h3 
            className="text-right font-semibold text-gray-800 text-sm leading-tight"
            style={{ fontFamily: 'Inter' }}
          >
            {offer.title}
          </h3>
        </div>

        {/* Date Range Section */}
        <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
          <FaCalendarAlt className="w-3 h-3" />
          <div className="flex gap-1">
            <span>{formatDate(offer.startDate)}</span>
            <span>-</span>
            <span>{formatDate(offer.endDate)}</span>
          </div>
        </div>

        {/* Discount Button with enhanced design */}
        <div className="mt-3">
          <button
            className="w-full px-4 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-medium 
                     transform transition-all duration-200 hover:bg-violet-700 hover:shadow-lg 
                     active:scale-98 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
            style={{ fontFamily: 'Inter' }}
          >
            {offer.discountText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard; 