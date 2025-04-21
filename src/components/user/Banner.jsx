import React, { useState, useEffect } from 'react';
import { useFetchBanners } from '../../hooks/user/Bannerhooks';

function Banner() {
  const { banners, loading } = useFetchBanners();
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle dot click
  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  // Auto-rotate banners
  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 5000); // Change every 5 seconds
      return () => clearInterval(interval);
    }
  }, [banners.length]);

  // Loading placeholder
  if (loading) {
    return <div className="w-full h-[200px] sm:h-[500px] bg-gray-200 animate-pulse"></div>;
  }

  // If no banners
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <main className="relative w-full max-w-[1700px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] top-[35px] mx-auto">
      <div
        className="relative w-full h-full rounded overflow-hidden cursor-pointer"
        onClick={() => setActiveIndex((activeIndex + 1) % banners.length)}
      >
        {/* Desktop Image */}
        <img
          src={banners[activeIndex].bannerImage[0]} // Use first image in bannerImage array
          alt="Fashion Banner"
          className="hidden sm:block w-full h-full object-cover"
        />

        {/* Mobile Image */}
        <img
          src={banners[activeIndex].bannerImage[0]} // Use same image for mobile for now
          alt="Fashion Banner"
          className="block sm:hidden w-full h-full object-cover"
        />

        {/* Navigation dots */}
        {banners.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {banners.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full cursor-pointer ${
                  activeIndex === index ? 'bg-red-400' : 'bg-gray-300'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDotClick(index);
                }}
              ></span>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Banner;
