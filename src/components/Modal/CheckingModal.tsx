import React, { useState } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { reduxState } from 'App';
import {
  AuthCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
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

interface CheckingModalProps {
  isCheckingModalOpen: boolean;
  isEditing: boolean;
  setIsCheckingModalOpen: (state: boolean) => void;
}

function CheckingModal({
  isCheckingModalOpen,
  isEditing,
  setIsCheckingModalOpen,
}: CheckingModalProps) {
  const [password, setPassword] = useState('');
  const inputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setPassword(value);
  };
  const clickYes = () => {
    // reauthenticateWithCredential(user,AuthCredential)
  };

  return (
    <ModalContainer>
      <Modal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        onClose={() => setIsCheckingModalOpen(false)}
        open={isCheckingModalOpen}
      >
        <Box sx={style}>
          <Typography
            component="h2"
            id="modal-modal-title"
            sx={{ textAlign: 'center' }}
            variant="h6"
          >
            {isEditing ? '회원정보를 수정 하시려면' : '탈퇴 하시려면'} 기존의
            비밀번호를 입력해주세요
          </Typography>
          <TextField
            autoComplete="passwordCheck"
            fullWidth
            id="passwordCheck"
            label={'비밀번호 확인'}
            margin="normal"
            name="passwordCheck"
            onChange={inputPassword}
            required
            sx={{
              fontSize: 'small',
              backgroundColor: '#ffffff',
              borderRadius: '10px',
            }}
            type="password"
          />
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: 'center' }}
          >
            <Button
              onClick={() => setIsCheckingModalOpen(false)}
              variant="contained"
            >
              확인
            </Button>
            <Button
              onClick={() => setIsCheckingModalOpen(false)}
              sx={{ backgroundColor: '#F85926', marginLeft: '5vw' }}
              variant="contained"
            >
              취소
            </Button>
          </Typography>
        </Box>
      </Modal>
    </ModalContainer>
  );
}

export default CheckingModal;
