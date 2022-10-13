import React, { useState } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { reduxState } from 'App';
import { setModal } from 'redux/modal';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import EmailChecking from './EmailChecking';
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

function EmailVerifying() {
  const dispatch = useDispatch();
  const modalState = useSelector((state: reduxState) => state.modal.value);
  const [checkingModal, setCheckingModal] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  const verfiyEmail = async () => {
    if (user) {
      await sendEmailVerification(user);
      setCheckingModal(true);
    }
    dispatch(setModal({ isOpen: false, modalMessage: '' }));
  };

  return (
    <ModalContainer>
      <EmailChecking
        checkingModal={checkingModal}
        setCheckingModal={setCheckingModal}
      />
      <Modal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        onClose={() => dispatch(setModal({ isOpen: false, modalMessage: '' }))}
        open={modalState.isOpen}
      >
        <Box sx={style}>
          <Typography
            component="h2"
            id="modal-modal-title"
            sx={{ textAlign: 'center' }}
            variant="h6"
          >
            {modalState.modalMessage}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: 'center' }}
          >
            <Button
              onClick={verfiyEmail}
              sx={{ backgroundColor: 'green' }}
              variant="contained"
            >
              이메일 인증하기
            </Button>
            <Button
              onClick={() =>
                dispatch(setModal({ isOpen: false, modalMessage: '' }))
              }
              sx={{ backgroundColor: 'red', marginLeft: '1vw' }}
              variant="contained"
            >
              아직은 안할래요
            </Button>
          </Typography>
        </Box>
      </Modal>
    </ModalContainer>
  );
}

export default EmailVerifying;
