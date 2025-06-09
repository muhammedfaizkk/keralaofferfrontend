import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OfferCard from './OfferCard';
import { useFetchAds } from '../../hooks/user/Userads';
import { toast } from 'react-toastify';
import { FiArrowRight } from 'react-icons/fi';

function OfferSection() {
  const { ads, loading, error } = useFetchAds();
  const navigate = useNavigate();
  const [likedOffers, setLikedOffers] = useState({});
  const [filteredAds, setFilteredAds] = useState([]);

useEffect(() => {
  if (ads) {
    const sortedAds = [...ads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Newest first
    setFilteredAds(sortedAds);
  }
}, [ads]);


  const handleOfferClick = (adId) => {
    navigate(`/offer/${adId}`);
  };

  const toggleLike = (adId) => {
    setLikedOffers(prev => ({
      ...prev,
      [adId]: !prev[adId]
    }));
  };

  const handleCopyLink = (adId) => {
    const offerUrl = `${window.location.origin}/offerdetails/${adId}`;
    navigator.clipboard.writeText(offerUrl)
      .then(() => {
        toast.success('Offer link copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy link:', error);
        toast.error('Failed to copy link. Please try again.');
      });
  };

  return (
    <div className="px-0 md:px-6 py-8 font-poppins">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] sm:text-[24px] md:text-[28px] font-semibold text-gray-900">
          Latest Offers
        </h2>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="animate-pulse text-[16px] text-gray-500">Loading offers...</div>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center h-40">
          <div className="text-[16px] text-red-500">{error}</div>
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredAds.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <div className="text-[16px] text-gray-500 text-center">No active offers available.</div>
            </div>
          ) : (
            <>
              <div className="text-[14px] text-gray-600 mb-4 text-right">
                Showing {Math.min(filteredAds.length, 8)} of {filteredAds.length} Offers
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-10">
                {filteredAds.slice(0, 8).map((ad) => (
                  <OfferCard
                    key={ad._id}
                    offer={{
                      ...ad,
                      image: ad.adsImages?.[0],
                      store: ad.storeId
                    }}
                    isLiked={likedOffers[ad._id]}
                    onLikeToggle={() => toggleLike(ad._id)}
                    onClick={() => handleOfferClick(ad._id)}
                    onCopyLink={() => handleCopyLink(ad._id)}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
      <button
        onClick={() => navigate('/offers')}
        className="flex items-center gap-2 mx-auto px-4 py-2 text-sm sm:text-base font-semibold text-violet-700 rounded-md hover:text-violet-400 transition-colors duration-300"
      >
        View All <FiArrowRight className="text-lg" />
      </button>
    </div>
  );
}

export default OfferSection;