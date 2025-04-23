import React, { useState, useEffect } from 'react';
import { useFetchBanners } from '../../hooks/user/Bannerhooks';

function Banner() {
  const { banners, loading } = useFetchBanners();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Filter banners by type
  const desktopBanners = banners.filter((b) => b.title === 'desktop');
  const mobileBanners = banners.filter((b) => b.title === 'mobile');

  // Calculate max length between the two to sync indexes
  const maxLength = Math.max(desktopBanners.length, mobileBanners.length);

  // Auto-rotate only if more than one banner
  useEffect(() => {
    if (maxLength > 1) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000); // rotate every 5 seconds

      return () => clearInterval(interval);
    }
  }, [maxLength, activeIndex]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % maxLength);
      setIsTransitioning(false);
    }, 300); // Match this with transition duration
  };

  const goToIndex = (index) => {
    if (index !== activeIndex) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsTransitioning(false);
      }, 300);
    }
  };

  if (loading) {
    return (
      <div 
        className="w-full h-[200px] sm:h-[500px] bg-gray-200 animate-pulse"
        style={{ animationDuration: '2s' }}
      ></div>
    );
  }

  if (maxLength === 0) return null;

  const desktopBannerImage = desktopBanners[activeIndex]?.bannerImage?.[0] || desktopBanners[0]?.bannerImage?.[0] || '';
  const mobileBannerImage = mobileBanners[activeIndex]?.bannerImage?.[0] || mobileBanners[0]?.bannerImage?.[0] || '';

  return (
    <main className="relative w-full overflow-hidden" style={{ perspective: '1000px' }}>
      <div
        className={`relative w-full h-full rounded-lg overflow-hidden cursor-pointer ${isTransitioning ? 'opacity-80' : 'opacity-100'}`}
        style={{
          transition: 'opacity 300ms ease-in-out',
          transformStyle: 'preserve-3d'
        }}
        onClick={handleNext}
      >
        {/* Desktop Image */}
        {desktopBannerImage && (
          <div className="hidden sm:block w-full h-[500px] overflow-hidden">
            <img
              src={desktopBannerImage}
              alt="Desktop Banner"
              className={`w-full h-full object-cover ${isTransitioning ? 'scale-105' : 'scale-100'}`}
              style={{
                transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'transform',
                backfaceVisibility: 'hidden'
              }}
            />
          </div>
        )}

        {/* Mobile Image */}
        {mobileBannerImage && (
          <div className="block sm:hidden w-full h-[70vh] overflow-hidden">
            <img
              src={mobileBannerImage}
              alt="Mobile Banner"
              className={`w-full h-full object-cover ${isTransitioning ? 'scale-105' : 'scale-100'}`}
              style={{
                transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: 'transform',
                backfaceVisibility: 'hidden'
              }}
            />
          </div>
        )}

        {/* Navigation Dots */}
        {maxLength > 1 && (
          <div 
            className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10"
            style={{ transform: 'translateX(-50%)' }}
          >
            {Array.from({ length: maxLength }).map((_, index) => (
              <button
                key={index}
                className={`rounded-full cursor-pointer transition-all duration-300 ${activeIndex === index ? 'bg-red-500' : 'bg-gray-300 bg-opacity-50'}`}
                style={{
                  width: activeIndex === index ? '24px' : '12px',
                  height: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToIndex(index);
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Banner;