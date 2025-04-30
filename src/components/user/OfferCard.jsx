import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLink, FaCalendarAlt, FaClock, FaStore, FaMapMarkerAlt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OfferCard = ({ offer, onCopyLink, relatedAds }) => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const sliderRef = React.useRef(null);

  if (!offer || !offer.endDate) return null;

  // ✅ Check if offer is expired
  const isExpired = new Date(offer.endDate) < new Date();

  // ✅ Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // ✅ Get remaining time
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

  const handleOfferClick = (offerId) => {
    navigate(`/offerdetails/${offerId}`);
  };

  const remainingTime = getRemainingTime();

  // ✅ Don't render if offer is expired
  if (isExpired) return null;

  // Slider settings for related ads
  const sliderSettings = {
    dots: false,
    infinite: relatedAds?.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: '20px',
        }
      }
    ]
  };

  return (
    <>
      <div
        className={`group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer
          ${remainingTime === 'Ending soon' ? 'ring-2 ring-red-400' : ''}`}
        onClick={() => handleOfferClick(offer._id)}
      >
        <div className="relative">
          {/* Image Container with Aspect Ratio */}
          <div className="relative w-full" style={{ paddingBottom: '75%' }}>
            <img
              src={`${BASE_URL}/${offer.image}` || offer.store?.logoUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
              alt={offer.description || 'Offer image'}
              className="absolute inset-0 w-full h-full object-cover bg-gray-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Store Info */}
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
                {offer.store?.location || 'Unknown Location'}, {offer.store?.district || ''}
              </span>
            </div>
          </div>

          {/* Copy Link */}
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

          {/* Remaining Time */}
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

        <div className="px-4 pt-4">
          {/* Offer Details */}
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-xs font-medium tracking-wide">
                {offer.offerType}
              </span>
              <span className="text-xs text-gray-500">
                {offer.store?.category || ''}
              </span>
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

      {/* Related Ads Section */}
      {relatedAds?.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Offers</h3>
          <div className="relative">
            <Slider ref={sliderRef} {...sliderSettings} className="related-offers-slider">
              {relatedAds.map((relatedOffer) => (
                <div key={relatedOffer._id} className="px-2">
                  <div
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    onClick={() => handleOfferClick(relatedOffer._id)}
                  >
                    <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                      <img
                        src={`${BASE_URL}/${relatedOffer.image}` || relatedOffer.store?.logoUrl || '/placeholder-image.jpg'}
                        alt={relatedOffer.description}
                        className="absolute inset-0 w-full h-full object-cover bg-gray-50"
                      />
                      {relatedOffer.offerType && (
                        <div className="absolute top-2 right-2 z-10">
                          <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                            {relatedOffer.offerType}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2">
                        {relatedOffer.description}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-violet-600 text-xs font-medium">
                          {relatedOffer.store?.storeName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(relatedOffer.endDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      {/* Add custom styles */}
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
