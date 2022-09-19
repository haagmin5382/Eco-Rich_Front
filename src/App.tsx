import React, { useState } from 'react';
import Router from 'components/Router';
import { useSelector } from 'react-redux';

export interface reduxState {
  menu: {
    value: {
      sideMenu: boolean;
    };
  };
  pomo: {
    value: {
      pomoNum: Array<number>;
    };
  };
  user: {
    value: {
      displayName: string;
      email: string;
      photoURL: string;
      uid: string;
    };
  };
}
function App() {
  return (
    <>
      <Router />
    </>
  );
}

export default App;
