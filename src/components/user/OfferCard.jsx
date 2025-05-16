import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLink, FaCalendarAlt, FaClock, FaStore, FaMapMarkerAlt } from "react-icons/fa";
import { incrementadsClickCount, incrementAdsClickseparateLy } from '../../hooks/common/Adscount';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OfferCard = ({ offer, onCopyLink, relatedAds }) => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const sliderRef = React.useRef(null);

  if (!offer) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getOfferStatus = () => {
    if (!offer.endDate) return 'No expiration';

    const end = new Date(offer.endDate);
    end.setHours(23, 59, 59, 999);
    const now = new Date();
    
    if (end < now) return 'Expired';
    
    const days = Math.floor((end - now) / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} day${days > 1 ? 's' : ''} left` : 'Ending soon';
  };

  const handleOfferClick = async (offerId) => {
    await incrementadsClickCount();
    await incrementAdsClickseparateLy(offerId)
    navigate(`/offerdetails/${offerId}`);
  };

  const offerStatus = getOfferStatus();
  const offerImage = offer.adsImages && offer.adsImages.length > 0 ? offer.adsImages[0] : null;

  return (
    <>
      <div
        className={`group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer`}
        onClick={() => handleOfferClick(offer._id)}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <div className="relative flex-grow">
          <div className="relative w-full" style={{ paddingBottom: '75%' }}>
            <img
              src={`${BASE_URL}${offerImage || offer.store?.logoUrl || 'https://via.placeholder.com/400x300?text=No+Image'}`}
              alt={offer.description || 'Offer image'}
              className="absolute inset-0 w-full h-full object-cover bg-gray-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          <div className="absolute bottom-2 left-2 right-2 text-white">
            <div className="flex items-center gap-2 mb-1">
              <FaStore className="w-3 h-3" />
              <span className="text-sm font-medium truncate">
                {offer.storeId?.storeName || 'Unknown Store'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs opacity-90">
              <FaMapMarkerAlt className="w-3 h-3" />
              <span className="truncate">
                {offer.storeId?.location || 'Unknown Location'}, {offer.storeId?.district || ''}
              </span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCopyLink?.(offer._id);
            }}
            className="absolute top-2 right-2 z-10 transform hover:scale-110 transition-all duration-200"
          >
            <div className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white">
              <FaLink className="w-4 h-4 text-gray-700" />
            </div>
          </button>

          {offerStatus && (
            <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium
              ${offerStatus.includes('Expired') 
                ? 'bg-gray-500 text-white'
                : offerStatus.includes('Ending soon') 
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 text-gray-700'}`}>
              <div className="flex items-center gap-1">
                <FaClock className="w-3 h-3" />
                {offerStatus}
              </div>
            </div>
          )}
        </div>

        <div className="px-4 pt-4 flex-grow-0">
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-xs font-medium tracking-wide">
                {offer.offerType || 'Special Offer'}
              </span>
              <span className="text-xs text-gray-500">
                {offer.storeId?.category || ''}
              </span>
            </div>
            {/* <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
              {offer.description || 'No description available'}
            </h3> */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <FaCalendarAlt className="w-3 h-3" />
              <span>Valid until: {formatDate(offer.endDate)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleOfferClick(offer._id);
          }}
          className="w-full px-4 py-2.5 bg-violet-600 text-white text-sm font-medium 
                     transform transition-all duration-200 hover:bg-violet-700 hover:shadow-lg 
                     active:scale-98 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
        >
          View Details
        </button>
      </div>

      <style jsx>{`
        .related-offers-slider {
          margin: 0 -8px;
        }
        .related-offers-slider .slick-track {
          display: flex !important;
          gap: 1rem;
        }
        .related-offers-slider .slick-slide {
          height: inherit !important;
        }
        .related-offers-slider .slick-slide > div {
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default OfferCard;