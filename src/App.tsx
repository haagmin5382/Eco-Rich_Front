import React, { useState } from 'react';
import Header from 'components/Header/Header';
import Router from 'components/Router';
import { authService } from 'fbase';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <Router />
    </>
  );
}

export default App;
