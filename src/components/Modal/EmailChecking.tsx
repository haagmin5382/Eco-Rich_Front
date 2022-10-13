import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getAuth, reload } from 'firebase/auth';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalContainer = styled.div`
  position: 'absolute';
  text-align: center;
  left: '50vw';
`;

function EmailChecking({
  checkingModal,
  setCheckingModal,
}: {
  checkingModal: boolean;
  setCheckingModal: (state: boolean) => void;
}) {
  const auth = getAuth();
  const user = auth.currentUser;
  const VerifyEmail = async () => {
    if (user) {
      await reload(user); // 계정 정보 새로 받아옴
    }
    setCheckingModal(false);
  };
  return (
    <ModalContainer>
      <Modal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        onClose={() => setCheckingModal(false)}
        open={checkingModal}
      >
        <Box sx={style}>
          <Typography
            component="h2"
            id="modal-modal-title"
            sx={{ textAlign: 'center' }}
            variant="h6"
          >
            이메일로 인증링크를 보냈습니다. 링크를 클릭하시고 아래{' '}
            <span style={{ color: 'green' }}>이메일 인증완료</span> 버튼을
            클릭하세요
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: 'center' }}
          >
            <Button
              onClick={VerifyEmail}
              sx={{ backgroundColor: 'green' }}
              variant="contained"
            >
              이메일 인증완료
            </Button>
          </Typography>
        </Box>
      </Modal>
    </ModalContainer>
  );
}

export default EmailChecking;
