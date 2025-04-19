import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaFilter } from 'react-icons/fa';
import Header from '../../components/user/Header';
import OfferCard from '../../components/user/OfferCard';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [likedOffers, setLikedOffers] = useState({});

  const categories = ['All', 'Fashion', 'Electronics', 'Home', 'Beauty', 'Kids', 'Jewellery'];

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/user/offers`);
      setOffers(response.data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  const handleOfferClick = (offerId) => {
    navigate(`/offer/${offerId}`);
  };

  const toggleLike = (offerId) => {
    setLikedOffers(prev => ({
      ...prev,
      [offerId]: !prev[offerId]
    }));
  };

  const filteredOffers = selectedCategory === 'All' 
    ? offers 
    : offers.filter(offer => offer.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title and Filter Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Latest Offers
          </h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-lg hover:bg-violet-200 transition-colors"
          >
            <FaFilter />
            <span>Filters</span>
          </button>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${selectedCategory === category 
                      ? 'bg-violet-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-violet-50'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOffers.map((offer) => (
            <OfferCard
              key={offer._id}
              offer={offer}
              isLiked={likedOffers[offer._id]}
              onLikeToggle={toggleLike}
              onClick={() => handleOfferClick(offer._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers; 