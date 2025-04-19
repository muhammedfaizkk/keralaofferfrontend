import React, { useState, useRef, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const categories = [
  { label: "Men", image: "Images/men.jpg" },
  { label: "Women", image: "Images/women.jpg" },
  { label: "Kids", image: "Images/kids.jpg" },
  { label: "Jewellery", image: "Images/jewellery.jpg" },
  { label: "Jewellery", image: "Images/jewellery.jpg" },
  { label: "Jewellery", image: "Images/jewellery.jpg" },
  { label: "Jewellery", image: "Images/jewellery.jpg" },
  { label: "Jewellery", image: "Images/jewellery.jpg" },
  { label: "Jewellery", image: "Images/jewellery.jpg" },
  { label: "Jewellery", image: "Images/jewellery.jpg" },
  { label: "Jewellery", image: "Images/jewellery.jpg" },
  { label: "Jewellery", image: "Images/jewellery.jpg" },
];

function Categories() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true); // Initially show right button
  const scrollRef = useRef(null);

  useEffect(() => {
    checkScrollButtons();
  }, []);

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      checkScrollButtons(); // Check visibility of buttons after scrolling
    }
  };

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollWidth = scrollRef.current.scrollWidth;
      const clientWidth = scrollRef.current.clientWidth;

      // Check if there's enough content to scroll left or right
      setShowLeftButton(scrollLeft > 0); // Show left button if scrolled away from the left
      setShowRightButton(scrollLeft < scrollWidth - clientWidth); // Show right button if content overflows on the right
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
            -ms-overflow-style: none; /* Internet Explorer 10+ */
            scrollbar-width: none; /* Firefox */
          }
        `}
      </style>

      <div className="relative flex justify-center items-center">
        {/* Left scroll button */}
        {showLeftButton && (
  <button
    className="absolute left-0   -translate-y-1/2 z-10 bg-gray-700 text-white p-2 rounded-full opacity-50 hover:opacity-100"
    onClick={() => handleScroll('left')}
  >
    <FaArrowLeft size={16} />
  </button>
)}



        {/* Categories container with horizontal scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 sm:gap-8 md:gap-12 overflow-x-auto scroll-smooth w-full hide-scrollbar"
        >
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleSelect(index)}
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <div
                className={`overflow-hidden rounded-[16px] 
                  ${selectedIndex === index ? "border-2 border-blue-500" : ""} 
                  w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24`}
              >
                <img
                  src={category.image}
                  alt={category.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">
                {category.label}
              </p>
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        {showRightButton && (
  <button
    className="absolute right-0   -translate-y-1/2 z-10 bg-gray-700 text-white p-2 rounded-full opacity-50 hover:opacity-100"
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
