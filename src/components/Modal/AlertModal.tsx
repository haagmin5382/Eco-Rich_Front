import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

interface modalProps {
  isModalOpen: boolean;
  modalMessage: string;
  setIsModalOpen: (params: boolean) => void;
}
function AlertModal({ isModalOpen, modalMessage, setIsModalOpen }: modalProps) {
  return (
    <ModalContainer>
      <Modal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
      >
        <Box sx={style}>
          <Typography
            component="h2"
            id="modal-modal-title"
            sx={{ textAlign: 'center' }}
            variant="h6"
          >
            {modalMessage}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: 'center' }}
          >
            <Button onClick={() => setIsModalOpen(false)} variant="contained">
              확인
            </Button>
          </Typography>
        </Box>
      </Modal>
    </ModalContainer>
  );
}

export default AlertModal;
