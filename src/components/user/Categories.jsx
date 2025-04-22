import React, { useState, useRef, useEffect } from 'react';
import { useGetstorecategory } from '../../hooks/user/Ctegoryhooks';
import { useNavigate } from 'react-router-dom';

function Categories() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const { categories, loading, error } = useGetstorecategory();

  useEffect(() => {
    if (!categories?.length) return;

    const autoSlideInterval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        // Check if we've reached (or passed) the end
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          // Instant scroll to start (no animation) for seamless loop
          scrollRef.current.scrollTo({ left: 0, behavior: 'auto' });
        } else {
          // Smooth scroll to next position
          scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(autoSlideInterval);
  }, [categories]);

  const handleSelect = (index, categoryTitle) => {
    setSelectedIndex(index);
    navigate(`/offers?category=${encodeURIComponent(categoryTitle)}`);
  };

  if (loading) {
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

  if (error) {
    return (
      <div className="w-full py-6 mt-10 px-2">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full py-6 mt-10 px-2">
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <div className="relative flex justify-center items-center">
        <div
          ref={scrollRef}
          className="flex gap-6 sm:gap-8 md:gap-12 overflow-x-auto scroll-smooth w-full hide-scrollbar"
        >
          {categories.map((category, index) => (
            <div
              key={category._id}
              onClick={() => handleSelect(index, category.title)}
              className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0"
            >
              <div
                className={`overflow-hidden rounded-[16px] 
                  ${selectedIndex === index ? 'border-2 border-blue-500' : ''} 
                  w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24`}
              >
                <img
                  src={category.catPhotographs[0]}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">
                {category.title}
              </p>
            </div>
          ))}
          {/* Add duplicate items for seamless looping */}
          {categories.map((category, index) => (
            <div
              key={`duplicate-${category._id}`}
              onClick={() => handleSelect(index, category.title)}
              className="flex flex-col items-center gap-2 cursor-pointer flex-shrink-0"
            >
              <div
                className={`overflow-hidden rounded-[16px] 
                  ${selectedIndex === index ? 'border-2 border-blue-500' : ''} 
                  w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24`}
              >
                <img
                  src={category.catPhotographs[0]}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">
                {category.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;