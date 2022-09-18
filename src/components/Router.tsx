import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Home from 'pages/Home';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Mypage from 'pages/Mypage';
import Side from './Menu/Side';
function Router() {
  return (
    <div>
      <BrowserRouter>
        <Side />
        <Header />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/signup" />
          <Route element={<Mypage />} path="/mypage" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
