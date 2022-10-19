import React, { useState } from 'react';
import styled from 'styled-components';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { Button } from '@mui/material';
import ChatForm from './ChatForm';

const SupportChatContainer = styled.div`
  position: fixed;
  bottom: 5vh;
  right: 5vw;
  z-index: 99999;
`;
function SupportChat() {
  const [isChatting, setIsChatting] = useState(false);
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
    <SupportChatContainer>
      {isChatting ? (
        <ChatForm setIsChatting={setIsChatting} />
      ) : (
        <>
          <Button onClick={() => setIsChatting(true)} sx={{ padding: '0' }}>
            <ContactSupportIcon
              color="primary"
              fontSize="large"
              sx={{ fontSize: isMobile ? '20vw' : '5vw' }}
            />
          </Button>
        </>
      )}
    </SupportChatContainer>
  );
}

export default SupportChat;
