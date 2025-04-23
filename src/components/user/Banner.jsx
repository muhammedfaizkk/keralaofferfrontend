import React, { useState, useEffect } from 'react';
import { useFetchBanners } from '../../hooks/user/Bannerhooks';

function Banner() {
  const { banners, loading } = useFetchBanners();
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter banners by type
  const desktopBanners = banners.filter((b) => b.title === 'desktop');
  const mobileBanners = banners.filter((b) => b.title === 'mobile');

  // Calculate max length between the two to sync indexes
  const maxLength = Math.max(desktopBanners.length, mobileBanners.length);

  // Auto-rotate only if more than one banner
  useEffect(() => {
    if (maxLength > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % maxLength);
      }, 5000); // rotate every 5 seconds

      return () => clearInterval(interval);
    }
  }, [maxLength]);

  if (loading) {
    return <div className="w-full h-[200px] sm:h-[500px] bg-gray-200 animate-pulse"></div>;
  }

  if (maxLength === 0) return null;

  const desktopBannerImage = desktopBanners[activeIndex]?.bannerImage?.[0] || desktopBanners[0]?.bannerImage?.[0] || '';
  const mobileBannerImage = mobileBanners[activeIndex]?.bannerImage?.[0] || mobileBanners[0]?.bannerImage?.[0] || '';

  return (
    <main className="relative w-full">
      <div
        className="relative w-full h-full rounded overflow-hidden cursor-pointer"
        onClick={() => {
          if (maxLength > 1) {
            setActiveIndex((prevIndex) => (prevIndex + 1) % maxLength);
          }
        }}
      >
        {/* Desktop Image */}
        {desktopBannerImage && (
          <img
            src={desktopBannerImage}
            alt="Desktop Banner"
            className="hidden sm:block w-full h-full object-cover"
          />
        )}

        {/* Mobile Image */}
        {mobileBannerImage && (
          <img
            src={mobileBannerImage}
            alt="Mobile Banner"
            className="block sm:hidden w-full h-[70vh] object-cover"
          />
        )}

        {/* Navigation Dots */}
        {maxLength > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
            {Array.from({ length: maxLength }).map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full cursor-pointer ${
                  activeIndex === index ? 'bg-red-400' : 'bg-gray-300'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(index);
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
