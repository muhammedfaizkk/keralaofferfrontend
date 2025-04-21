import React, { useState, useRef, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useGetstorecategory } from '../../hooks/user/Ctegoryhooks';

function Categories() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const scrollRef = useRef(null);

  const { categories, loading, error } = useGetstorecategory();

  useEffect(() => {
    checkScrollButtons();
  }, [categories]);

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      checkScrollButtons();
    }
  };

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollWidth = scrollRef.current.scrollWidth;
      const clientWidth = scrollRef.current.clientWidth;

      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth);
    }
  };

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
        {/* Left scroll button */}
        {showLeftButton && (
          <button
            className="absolute left-0 -translate-y-1/2 z-10 bg-gray-700 text-white p-2 rounded-full opacity-50 hover:opacity-100"
            onClick={() => handleScroll('left')}
          >
            <FaArrowLeft size={16} />
          </button>
        )}

        {/* Scrollable Categories */}
        <div
          ref={scrollRef}
          className="flex gap-6 sm:gap-8 md:gap-12 overflow-x-auto scroll-smooth w-full hide-scrollbar"
        >
          {loading ? (
            <p className="text-gray-600 text-center">Loading categories...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            categories.map((category, index) => (
              <div
                key={category._id}
                onClick={() => handleSelect(index)}
                className="flex flex-col items-center gap-2 cursor-pointer"
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
            ))
          )}
        </div>

        {/* Right scroll button */}
        {showRightButton && (
          <button
            className="absolute right-0 -translate-y-1/2 z-10 bg-gray-700 text-white p-2 rounded-full opacity-50 hover:opacity-100"
            onClick={() => handleScroll('right')}
          >
            <FaArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Categories;
