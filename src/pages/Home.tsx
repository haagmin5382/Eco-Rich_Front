import PomoList from 'components/Pomo/PomoList';
import Timer from 'components/Timer/Timer';
import React from 'react';
import styled from 'styled-components';
import { Card } from '@mui/material';
const HomeContainer = styled.main`
  /* width: 100vw; */
`;
const HomeImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  z-index: -100;
  margin-bottom: 5vw;
`;
function Home() {
  const detectMobileDevice = (agent: string) => {
    const mobileRegex = [
      /Android/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return mobileRegex.some((mobile) => agent.match(mobile));
  };

  const isMobile = detectMobileDevice(window.navigator.userAgent); // 모바일 감지
  return (
    <HomeContainer>
      <HomeImg
        src={
          process.env.PUBLIC_URL +
          `./Images/kenny-eliason-KYxXMTpTzek-unsplash.jpg`
        }
      />
      <br />
      <br />
      <Card
        sx={{
          margin: '0vw auto',
          // justifyContent: 'center',
          textAlign: 'center',
          width: '80vw',
          height: isMobile ? '40vh' : '50vh',
          // border: '1px solid tomato',
        }}
      >
        <Timer />
        <PomoList />
      </Card>
    </HomeContainer>
  );
}

export default Home;
