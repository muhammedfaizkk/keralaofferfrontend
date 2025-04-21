import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLink, FaCalendarAlt, FaClock, FaStore, FaMapMarkerAlt } from "react-icons/fa";

const OfferCard = ({ offer, onCopyLink }) => {
  const navigate = useNavigate();

  // Check if offer is expired
  const isExpired = new Date(offer.endDate) < new Date();

  // Format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Calculate remaining time
  const getRemainingTime = () => {
    const now = new Date();
    const endDate = new Date(offer.endDate);
    const timeDiff = endDate - now;

    if (timeDiff <= 0) return null;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left`;
    return 'Ending soon';
  };

  const handleOfferClick = () => {
    navigate(`/offerdetails/${offer._id}`);
  };

  const remainingTime = getRemainingTime();

  if (isExpired) return null;

  return (
    <div 
      className={`group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer
        ${remainingTime === 'Ending soon' ? 'ring-2 ring-red-400' : ''}`}
      onClick={handleOfferClick}
    >
      <div className="relative">
        <div className="relative h-[200px] overflow-hidden">
          <img
            src={offer.image || offer.store?.logoUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={offer.description || 'Offer image'}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Store info overlay */}
        <div className="absolute bottom-2 left-2 right-2 text-white">
          <div className="flex items-center gap-2 mb-1">
            <FaStore className="w-3 h-3" />
            <span className="text-sm font-medium truncate">
              {offer.store?.storeName || 'Unknown Store'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs opacity-90">
            <FaMapMarkerAlt className="w-3 h-3" />
            <span className="truncate">
              {offer.store?.location}, {offer.store?.district}
            </span>
          </div>
        </div>

        {/* Copy Link Icon */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onCopyLink(offer._id);
          }}
          className="absolute top-2 right-2 z-10 transform hover:scale-110 transition-all duration-200"
        >
          <div className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white">
            <FaLink className="w-4 h-4 text-gray-700" />
          </div>
        </button>

        {/* Time remaining badge */}
        {remainingTime && (
          <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium
            ${remainingTime === 'Ending soon' 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 text-gray-700'}`}>
            <div className="flex items-center gap-1">
              <FaClock className="w-3 h-3" />
              {remainingTime}
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Offer Type and Description */}
        <div className="flex flex-col gap-2 mb-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-xs font-medium tracking-wide">
              {offer.offerType}
            </span>
            <span className="text-xs text-gray-500">
              {offer.store?.category}
            </span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {offer.description}
          </p>
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

        {/* View Details Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleOfferClick();
          }}
          className="w-full px-4 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-medium 
                   transform transition-all duration-200 hover:bg-violet-700 hover:shadow-lg 
                   active:scale-98 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default OfferCard; 