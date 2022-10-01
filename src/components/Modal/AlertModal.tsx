import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { reduxState } from 'App';
import { setModal } from 'redux/modal';
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

function AlertModal() {
  const dispatch = useDispatch();
  const modalState = useSelector((state: reduxState) => state.modal.value);

  return (
    <ModalContainer>
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
              onClick={() =>
                dispatch(setModal({ isOpen: false, modalMessage: '' }))
              }
              variant="contained"
            >
              확인
            </Button>
          </Typography>
        </Box>
      </Modal>
    </ModalContainer>
  );
}

export default AlertModal;
