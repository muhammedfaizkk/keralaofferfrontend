import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import Profile from '../pages/admin/Profile';
import Stores from '../pages/admin/Stores';
import Banners from '../pages/admin/Banners';
import Locations from '../pages/admin/Locations';
import Storecategory from '../pages/admin/Storecategory';
import Offertype from '../pages/admin/Offertype';
import StoreDisplay from '../pages/admin/StoreDisplay';
import Login from '../pages/common/Login';
import Protected from '../components/protected/Protected';
import AddStores from '../components/admin/forms/Addstores';
import Adsreport from '../pages/admin/Adsreport';
import Storereport from '../pages/admin/Storereport';

const Admin = () => (
  <Routes>
    {/* ✅ Public login route — not protected */}
    <Route path="/login" element={<Login />} />

    {/* ✅ Protected admin routes */}
    <Route
      path="/"
      element={
        <Protected>
          <AdminLayout />
        </Protected>
      }
    >
      <Route index element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="store" element={<Stores />} />
      <Route path="banners" element={<Banners />} />
      <Route path="locations" element={<Locations />} />
      <Route path="store-category" element={<Storecategory />} />
      <Route path="offer-types" element={<Offertype />} />
      <Route path="storeads/:id" element={<StoreDisplay />} />
      <Route path="addstore" element={<AddStores />} />
      <Route path="adsreport" element={<Adsreport />} />
      <Route path="storereports" element={<Storereport />} />
    </Route>
  </Routes>
);

export default Admin;
