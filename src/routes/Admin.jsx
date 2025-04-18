import React from 'react';
import { Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import Profile from '../pages/admin/Profile';
import Stores from '../pages/admin/Stores';
import Banners from '../pages/admin/Banners';
import Locations from '../pages/admin/Locations';
import Storecategory from '../pages/admin/Storecategory';
import Offertype from '../pages/admin/Offertype';
import StoreDisplay from '../pages/admin/StoreDisplay';

const Admin = () => (
    <>
    
        <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="store" element={<Stores />} />
            <Route path="banners" element={<Banners/>} />
            <Route path="locations" element={<Locations/>} />
            <Route path="store-category" element={<Storecategory/>} />
            <Route path="offer-types" element={<Offertype/>} />
            <Route path="storeads/:id" element={<StoreDisplay/>} />
        </Route>
    </>
);

export default Admin;
