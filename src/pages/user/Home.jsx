import React from 'react'
import Header from '../../components/user/Header'
import Banner from '../../components/user/Banner'
import Categories from '../../components/user/Categories'
import OfferSection from '../../components/user/OfferSection'
import Navbar from '../../components/user/Navbar'

function Home() {
  return (
    <>
      <Header />
      <Banner />
      <div className='bg-[#F4F4F5]'>
        <div className='max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <Categories />
          <OfferSection />
          <Navbar />
        </div>
      </div>
    </>
  )
}

export default Home
