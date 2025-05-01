import React from 'react'
import Banner from '../../components/user/Banner'
import Categories from '../../components/user/Categories'
import OfferSection from '../../components/user/OfferSection'
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa'

function Home() {
  return (
    <>
      <Banner />
      <div className='bg-violet-50'>
        <div className='max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-0 md:py-8'>
          <Categories />
          <OfferSection />
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed right-4 bottom-20 flex flex-col gap-3 z-50">
        {/* WhatsApp */}
        <a
          href="https://wa.me/918921016178" // replace with actual number
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          <FaWhatsapp size={20} />
        </a>

        {/* Call */}
        <a
          href="tel:+918921016178" // replace with actual number
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
        >
          <FaPhoneAlt size={20} />
        </a>
      </div>
    </>
  )
}

export default Home
