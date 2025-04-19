import React, { useState } from 'react';

function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "Images/tshirt.jpg",
    "Images/3size.jpg",
    "Images/kids.jpg",
    "Images/women.jpg",
    "Images/jewellery.jpg",
  ];

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <main className="relative w-full max-w-[1700px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] top-[35px] mx-auto">
      <div
  className="relative w-full h-full rounded overflow-hidden cursor-pointer"
  onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
>

        {/* Desktop Image */}
<img
  src={images[activeIndex]}
  alt="Fashion Banner"
  className="hidden sm:block w-full h-full object-cover cursor-pointer"
  onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
/>

{/* Mobile Image */}
<img
  src={images[activeIndex]}
  alt="Fashion Banner"
  className="block sm:hidden w-full h-full object-cover cursor-pointer"
  onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
/>



        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex flex-col justify-center px-4 sm:px-6 md:px-10 text-white">
          <p className="text-xs sm:text-sm md:text-base font-semibold animate-fade-up">#FASHION DAY</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-400 mt-1">
            80% OFF
          </h2>
          <p className="text-xs sm:text-sm md:text-base mt-1 animate-fade-up ">
            Discover fashion that suits your style
          </p>
          <button className="mt-4 px-4 sm:px-5 py-2 border border-white rounded-full text-white hover:bg-white hover:text-black transition duration-300 w-fit text-xs sm:text-sm md:text-base">
            Check this out
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer ${activeIndex === index ? 'bg-red-400' : 'bg-gray-300'}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Banner;
