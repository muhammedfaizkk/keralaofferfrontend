import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaShareAlt, FaWhatsapp, FaPhone, FaRegHeart, FaHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from '../../components/user/Header';

const InnerPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false);

  const offers = [
    {
      id: 1,
      src: 'Images/women.jpg',
      title: "Women's Collection Sale",
      description: "Explore our latest Women's Collection – trendy styles and unbeatable offers.",
      discount: '50% OFF',
      originalPrice: '₹2,999',
      offerPrice: '₹1,499',
      phone: '919111111111',
      message: "Hi! I'm interested in the Women's Collection.",
      published: '2025-04-15',
      ends: '2025-05-15',
      category: 'Fashion'
    },
    {
      id: 2,
      src: 'Images/men.jpg',
      title: "Men's Fashion Deal",
      description: "Check out stylish and affordable options in our Men's Fashion range.",
      discount: '40% OFF',
      originalPrice: '₹3,999',
      offerPrice: '₹2,399',
      phone: '919222222222',
      message: "Hi! I'm interested in the Men's Collection.",
      published: '2025-04-10',
      ends: '2025-05-10',
      category: 'Fashion'
    },
    {
      id: 3,
      src: 'Images/kids.jpg',
      title: "Kids' Special Offer",
      description: "Cute, comfy, and colorful – explore Kids' Wear for all ages.",
      discount: '30% OFF',
      originalPrice: '₹1,999',
      offerPrice: '₹1,399',
      phone: '919333333333',
      message: "Hi! I'm interested in the Kids' Collection.",
      published: '2025-04-20',
      ends: '2025-06-20',
      category: 'Kids'
    },
    {
      id: 4,
      src: 'Images/jewellery.jpg',
      title: "Exclusive Jewellery Sale",
      description: "Shine bright with our exclusive Jewellery selection at amazing prices.",
      discount: '25% OFF',
      originalPrice: '₹9,999',
      offerPrice: '₹7,499',
      phone: '919444444444',
      message: "Hi! I'm interested in the Jewellery Collection.",
      published: '2025-04-25',
      ends: '2025-05-25',
      category: 'Jewellery'
    }
  ];

  const imageRef = useRef(null);
  const queryParams = new URLSearchParams(location.search);
  const selectedOfferIndex = queryParams.get('offer') ? parseInt(queryParams.get('offer')) : 0;
  const [offer, setOffer] = useState(offers[selectedOfferIndex]);
  const [currentImage, setCurrentImage] = useState(0);

  const sliderRef = useRef(null);

  useEffect(() => {
    setOffer(offers[selectedOfferIndex]);
    imageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedOfferIndex]);

  const handleWhatsApp = () => {
    const phoneNumber = offer.phone;
    const message = offer.message;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:+${offer.phone}`;
  };

  const handleShare = () => {
    const shareMessage = `Check out this amazing offer: ${offer.description}`;
    if (navigator.share) {
      navigator.share({
        title: 'Exclusive Offer',
        text: shareMessage,
        url: window.location.href
      });
    } else {
      alert('Sharing not supported in this browser.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            {offer.category}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Section */}
          <div className="space-y-4" ref={imageRef}>
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={offer.src}
                alt={offer.title}
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
              >
                {isLiked ? (
                  <FaHeart className="text-red-500 w-5 h-5" />
                ) : (
                  <FaRegHeart className="text-gray-600 w-5 h-5" />
                )}
              </button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center gap-2">
              {offers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => navigate(`?offer=${index}`)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all
                    ${index === selectedOfferIndex ? 'border-violet-500 shadow-lg' : 'border-transparent opacity-60'}`}
                >
                  <img
                    src={offers[index].src}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Content Section */}
          <div className="space-y-6">
            {/* Title and Price Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {offer.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full font-semibold">
                  {offer.discount}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 line-through text-sm">
                    {offer.originalPrice}
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    {offer.offerPrice}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-base leading-relaxed">
                {offer.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaWhatsapp className="text-xl" />
                  <span className="font-medium">WhatsApp</span>
                </button>
                <button
                  onClick={handleCall}
                  className="flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <FaPhone className="text-xl" />
                  <span className="font-medium">Call Now</span>
                </button>
              </div>
              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-2 bg-violet-600 text-white py-3 px-6 rounded-lg hover:bg-violet-700 transition-colors"
              >
                <FaShareAlt />
                <span className="font-medium">Share Offer</span>
              </button>
            </div>

            {/* Offer Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Offer Details</h3>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between">
                  <span className="text-gray-600">Published on:</span>
                  <span className="font-medium">{offer.published}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Ends on:</span>
                  <span className="font-medium">{offer.ends}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* More Offers Section */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">More Offers</h2>
            <div className="flex gap-2">
              <button
                className="prev-arrow p-2 rounded-full bg-violet-100 text-violet-600 hover:bg-violet-200 transition-colors"
                onClick={() => sliderRef.current.slickPrev()}
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="next-arrow p-2 rounded-full bg-violet-100 text-violet-600 hover:bg-violet-200 transition-colors"
                onClick={() => sliderRef.current.slickNext()}
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="offer-slider-container">
            <Slider
              ref={sliderRef}
              dots={false}
              infinite={true}
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                }
              ]}
              className="offer-slider"
            >
              {offers.map((item, index) => (
                <div key={item.id} className="px-2">
                  <div
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    onClick={() => navigate(`?offer=${index}`)}
                  >
                    <div className="relative h-48">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                          {item.discount}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-violet-600 font-semibold">
                          {item.offerPrice}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {item.originalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

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
        `}</style>
      </div>
    </div>
  );
};

export default InnerPage;
