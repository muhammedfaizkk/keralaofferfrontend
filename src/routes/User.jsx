import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import Home from '../pages/user/Home';
import InnerPage from '../pages/user/InnerPage';
import ContactUs from '../pages/user/ContactUs';
import AboutUs from '../pages/user/AboutUs';
import Offers from '../pages/user/Offers';

const User = () => (
  <Routes>
    <Route element={<UserLayout />}>
      <Route index element={<Home />} />
      <Route path="offers" element={<Offers />} />
      <Route path="offerdetails/:id" element={<InnerPage />} />
      <Route path="contactus" element={<ContactUs />} />
      <Route path="aboutus" element={<AboutUs />} />
    </Route>
  </Routes>
);

export default User;