import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaShareAlt, FaWhatsapp, FaPhone, FaRegHeart, FaHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetchAdById, useFetchAds } from '../../hooks/user/Userads';
import { toast } from 'react-toastify';

const InnerPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const imageRef = useRef(null);
  const sliderRef = useRef(null);
  const thumbnailSliderRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoSwipe, setAutoSwipe] = useState(true);
  const autoSwipeIntervalRef = useRef(null);

  // Fetch current ad details
  const { ad, loading: adLoading, error: adError } = useFetchAdById(id);
  
  // Fetch related ads
  const { ads: allAds, loading: relatedLoading } = useFetchAds();
  const relatedAds = allAds?.filter(item => 
    item._id !== id && 
    item.storeId?.category === ad?.storeId?.category
  ) || [];

  // Auto swipe for main image
  useEffect(() => {
    if (ad?.adsImages?.length > 1 && autoSwipe) {
      autoSwipeIntervalRef.current = setInterval(() => {
        setCurrentImageIndex(prevIndex => 
          prevIndex === ad.adsImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);
    }

    return () => {
      if (autoSwipeIntervalRef.current) {
        clearInterval(autoSwipeIntervalRef.current);
      }
    };
  }, [ad?.adsImages, autoSwipe]);

  // Reset autoswipe when ad changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [id]);

  // Settings for thumbnail slider on mobile
  const thumbnailSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const handleWhatsApp = () => {
    if (!ad?.storeId?.contact) {
      toast.error('Store phone number not available');
      return;
    }
    const phoneNumber = ad.storeId.contact.replace(/\D/g, '');
    const message = `Hi! I'm interested in your offer: ${ad.description}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    if (!ad?.storeId?.contact) {
      toast.error('Store phone number not available');
      return;
    }
    const phoneNumber = ad.storeId.contact.replace(/\D/g, '');
    window.location.href = `tel:+${phoneNumber}`;
  };

  const handleShare = async () => {
    const shareMessage = `Check out this amazing offer: ${ad?.description}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: ad?.title || 'Exclusive Offer',
          text: shareMessage,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(`${shareMessage}\n${window.location.href}`);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Date not available';
      
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date not available';
    }
  };

  const handleOfferClick = (offerId) => {
    navigate(`/offerdetails/${offerId}`);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
    // Pause auto-swipe for a moment when manually selecting
    setAutoSwipe(false);
    setTimeout(() => setAutoSwipe(true), 5000);
  };

  if (adLoading) {
    return (
      <div className="min-h-screen bg-gray-100 font-poppins">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (adError || !ad) {
    return (
      <div className="min-h-screen bg-gray-100 font-poppins">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-red-500 text-lg mb-4">
              {adError || 'Offer not found. Please check the URL and try again.'}
            </div>
            <button
              onClick={() => navigate('/offers')}
              className="flex items-center text-violet-600 hover:text-violet-700"
            >
              <FaArrowLeft className="mr-2" />
              <span className="text-base">Back to Offers</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-poppins">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Back Button and Category */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <FaArrowLeft className="mr-2" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
            {ad.storeId?.category || 'General'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Image Section */}
          <div className="space-y-4" ref={imageRef}>
            <div className="relative rounded-xl overflow-hidden bg-white shadow-md">
              {/* Main Image with Auto-swipe */}
              <div className="relative aspect-square">
                {ad.adsImages?.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <img
                      src={image || '/placeholder-image.jpg'}
                      alt={`${ad.description} - image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                
                {/* Side navigation arrows for desktop */}
                {ad.adsImages?.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between z-20 px-4 lg:px-6 opacity-0 hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => {
                        setCurrentImageIndex(prev => prev === 0 ? ad.adsImages.length - 1 : prev - 1);
                        setAutoSwipe(false);
                        setTimeout(() => setAutoSwipe(true), 5000);
                      }}
                      className="h-10 w-10 rounded-full bg-white/70 flex items-center justify-center shadow-md hover:bg-white transition-colors"
                    >
                      <FaChevronLeft className="text-gray-800" />
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentImageIndex(prev => prev === ad.adsImages.length - 1 ? 0 : prev + 1);
                        setAutoSwipe(false);
                        setTimeout(() => setAutoSwipe(true), 5000);
                      }}
                      className="h-10 w-10 rounded-full bg-white/70 flex items-center justify-center shadow-md hover:bg-white transition-colors"
                    >
                      <FaChevronRight className="text-gray-800" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Indicators at bottom for mobile */}
              {ad.adsImages?.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 lg:hidden">
                  {ad.adsImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
              
              <div className="absolute top-4 right-4 flex space-x-2">
                <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                  {ad.offerType}
                </span>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                >
                  {isLiked ? (
                    <FaHeart className="text-red-500 w-5 h-5" />
                  ) : (
                    <FaRegHeart className="text-gray-600 w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Thumbnail Navigation - Desktop Version */}
            {ad.adsImages?.length > 1 && (
              <div className="hidden md:flex justify-center gap-2">
                {ad.adsImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all
                      ${index === currentImageIndex ? 'border-violet-500 shadow-lg' : 'border-transparent opacity-60'}`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Thumbnail Navigation - Mobile Version (Sliding) */}
            {ad.adsImages?.length > 1 && (
              <div className="md:hidden">
                <Slider
                  ref={thumbnailSliderRef}
                  {...thumbnailSettings}
                  className="thumbnail-slider"
                  initialSlide={currentImageIndex}
                >
                  {ad.adsImages.map((image, index) => (
                    <div key={index} className="px-1">
                      <button
                        onClick={() => handleThumbnailClick(index)}
                        className={`w-full rounded-lg overflow-hidden border-2 transition-all aspect-square
                          ${index === currentImageIndex ? 'border-violet-500 shadow-lg' : 'border-transparent opacity-60'}`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </div>

          {/* Right Column - Content Section */}
          <div className="space-y-6">
            {/* Title and Store Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={ad.storeId?.logoUrl || '/store-placeholder.png'}
                  alt={ad.storeId?.storeName}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <span className="font-medium text-base text-gray-900">{ad.storeId?.storeName}</span>
                  <p className="text-xs text-gray-500">{ad.storeId?.location}, {ad.storeId?.district}</p>
                </div>
              </div>
              
              <h1 className="text-xl font-bold text-gray-900 mb-3">
                {ad.description}
              </h1>
              
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {ad.offerType} discount available for a limited period.
              </p>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-xs">Category:</span>
                  <span className="font-medium text-xs">{ad.storeId?.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-xs">Offer:</span>
                  <span className="font-bold text-red-600 text-sm">{ad.offerType}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors text-sm"
                >
                  <FaWhatsapp className="text-lg" />
                  <span className="font-medium">WhatsApp</span>
                </button>
                <button
                  onClick={handleCall}
                  className="flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  <FaPhone className="text-lg" />
                  <span className="font-medium">Call Now</span>
                </button>
              </div>
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 bg-violet-600 text-white py-3 px-6 rounded-lg hover:bg-violet-700 transition-colors text-sm"
              >
                <FaShareAlt />
                <span className="font-medium">Share Offer</span>
              </button>
            </div>

            {/* Offer Period */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Offer Period</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 mb-1">From</p>
                  <p className="font-semibold">{formatDate(ad.startDate)}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 mb-1">To</p>
                  <p className="font-semibold">{formatDate(ad.endDate)}</p>
                </div>
              </div>
            </div>
            
            {/* Store Contact */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Store Details</h3>
              <div className="space-y-3 text-sm">
                <p className="flex items-start gap-2">
                  <span className="text-gray-600 min-w-16">Address:</span>
                  <span className="font-medium">{ad.storeId?.address || 'Not available'}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-gray-600 min-w-16">Contact:</span>
                  <span className="font-medium">{ad.storeId?.contact || 'Not available'}</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-gray-600 min-w-16">Email:</span>
                  <span className="font-medium">{ad.storeId?.email || 'Not available'}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* More Offers Section */}
        {relatedAds?.length > 0 && (
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">More Offers</h2>
              <div className="flex gap-2">
                <button
                  className="p-2 rounded-full bg-violet-100 text-violet-600 hover:bg-violet-200 transition-colors"
                  onClick={() => sliderRef.current?.slickPrev()}
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded-full bg-violet-100 text-violet-600 hover:bg-violet-200 transition-colors"
                  onClick={() => sliderRef.current?.slickNext()}
                >
                  <FaChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="offer-slider-container">
              <Slider
                ref={sliderRef}
                dots={false}
                infinite={relatedAds.length > 4}
                speed={500}
                slidesToShow={4}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={3000}
                pauseOnHover={true}
                responsive={[
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
                ]}
                className="offer-slider"
              >
                {relatedAds.map((item) => (
                  <div key={item._id} className="px-2">
                    <div
                      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                      onClick={() => handleOfferClick(item._id)}
                    >
                      <div className="relative h-40">
                        <img
                          src={item.adsImages?.[0] || '/placeholder-image.jpg'}
                          alt={item.description}
                          className="w-full h-full object-cover"
                        />
                        {item.offerType && (
                          <div className="absolute top-2 right-2">
                            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                              {item.offerType}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-1">
                          {item.description}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-violet-600 font-semibold text-xs">
                            {item.storeId?.storeName}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(item.endDate)}
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
          .offer-slider-container {
            margin: 0 -8px;
          }
          .offer-slider {
            position: relative;
          }
          .offer-slider .slick-track {
            display: flex !important;
            gap: 1rem;
          }
          .offer-slider .slick-slide {
            height: inherit !important;
          }
          .offer-slider .slick-slide > div {
            height: 100%;
          }
          .thumbnail-slider .slick-track {
            display: flex !important;
            margin-left: 0;
          }
          .thumbnail-slider .slick-slide {
            height: inherit !important;
            padding: 0 4px;
          }
          @media (max-width: 768px) {
            .thumbnail-slider {
              margin: 0 -4px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default InnerPage;