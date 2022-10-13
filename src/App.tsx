import React from 'react';
import Router from 'components/Router';

interface dayPomoType {
  Date: string;
  TotalPomo: number;
}
export interface reduxState {
  menu: {
    value: {
      sideMenu: boolean;
    };
  };
  pomo: {
    value: {
      pomoNum: Array<number>;
      dayPomo: Array<dayPomoType>;
    };
  };
  user: {
    value: {
      displayName: string;
      email: string;
      photoURL: string;
      uid: string;
      isOauth: boolean;
      emailVerifed: boolean;
    };
  };
  modal: {
    value: {
      isOpen: boolean;
      modalMessage: string;
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
