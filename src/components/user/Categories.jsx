import React, { useState } from 'react';
import { useGetstorecategory } from '../../hooks/user/Ctegoryhooks';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

function Categories() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();
  const { categories, loading, error } = useGetstorecategory();

  const handleSelect = (index, categoryTitle) => {
    setSelectedIndex(index);
    navigate(`/offers?category=${encodeURIComponent(categoryTitle)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 font-poppins flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
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
    <div className="w-full py-6 mt-0 md:mt-10 px-2">
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          320: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 8},
        }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={category._id}>
            <div
              onClick={() => handleSelect(index, category.title)}
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <div
                className={`overflow-hidden rounded-[16px] transition-all duration-200 
                  ${selectedIndex === index ? 'border-2 border-blue-500' : ''} 
                  w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24`}
              >
                <img
                  src={category.catPhotographs[0]}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium text-center">
                {category.title}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Categories;
