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
