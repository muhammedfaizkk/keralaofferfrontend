import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OfferCard from './OfferCard';

const initialOffers = [
  {
    id: 1,
    image: "Images/offer1.png",
    category: "Fashion",
    title: "CMR OFFER",
    liked: true,
    discountText: "25% OFF Premium Spa Hair"
  },
  {
    id: 2,
    image: "Images/offer2.png",
    category: "Home",
    title: "50% OFFER",
    liked: true,
    discountText: "50% OFF Home Decor items"
  },
  {
    id: 3,
    image: "Images/offer3.png",
    category: "Women",
    title: "SARI COLECTION",
    liked: true,
    discountText: "20% OFF on Sari Collections"
  },
  {
    id: 4,
    image: "Images/offer4.png",
    category: "Women",
    title: "HOLI OFFER",
    liked: false,
    discountText: "30% OFF on Holi Special"
  },
  {
    id: 5,
    image: "Images/offer1.png",
    category: "Men",
    title: "SUMMER DEAL",
    liked: false,
    discountText: "15% OFF Summer Apparel"
  },
  {
    id: 6,
    image: "Images/offer2.png",
    category: "Kids",
    title: "TRENDY OFFER",
    liked: true,
    discountText: "10% OFF Trendy Kidswear"
  },
  {
    id: 7,
    image: "Images/offer1.png",
    category: "Men",
    title: "SUMMER DEAL",
    liked: false,
    discountText: "15% OFF Summer Apparel"
  },
  {
    id: 8,
    image: "Images/offer2.png",
    category: "Kids",
    title: "TRENDY OFFER",
    liked: true,
    discountText: "10% OFF Trendy Kidswear"
  },
];

function OfferSection() {
  const [offers] = useState(initialOffers);
  const navigate = useNavigate();

  const copyLink = (id) => {
    const url = `${window.location.origin}/offer/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy link", err);
    });
  };

  return (
    <div className="px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[16px] sm:text-[18px] md:text-[20px] font-medium text-[#231F20]" style={{ fontFamily: 'Inter' }}>
          Offers Now!
        </h2>
        <button
          onClick={() => navigate('/offer')}
          className="text-[14px] sm:text-[16px] font-semibold text-[#EE5F73]"
          style={{ fontFamily: 'Inter', textAlign: 'right' }}
        >
          See More
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pb-10">
        {offers.map((offer) => (
          <OfferCard 
            key={offer.id} 
            offer={offer} 
            onCopyLink={copyLink}
          />
        ))}
      </div>
    </div>
  );
}

export default OfferSection;
