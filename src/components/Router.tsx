import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Home from 'pages/Home';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Mypage from 'pages/Mypage';
import Side from './Menu/Side';
import { useEffect } from 'react';
import { authService } from 'fbase';
import { userReducer } from 'redux/user';
import { useDispatch } from 'react-redux';
import Board from 'pages/Board';
function Router() {
  const dispatch = useDispatch();
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      dispatch(
        userReducer({
          email: user?.email,
          displayName: user?.displayName || '익명',
          photoURL: user?.photoURL,
          uid: user?.uid,
        }),
      );
    }); // 사용자 로그인 상태의 변화를 관찰한다.
  }, []);
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
          <Route element={<Board />} path="/board" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
