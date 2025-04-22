import React from 'react'
import Banner from '../../components/user/Banner'
import Categories from '../../components/user/Categories'
import OfferSection from '../../components/user/OfferSection'


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
    </>
  )
}

export default Home
