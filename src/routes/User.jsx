import React from 'react';
import { Route } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import Home from '../pages/user/Home';

const User = () => (
  <>
    <Route path="/" element={<UserLayout />}>
      <Route index element={<Home />} />
    </Route>
  </>
);

export default User;
