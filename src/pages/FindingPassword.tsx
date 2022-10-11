import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

function FindingPassword() {
  const [email, setEmail] = useState('');
  const auth = getAuth();
  const inputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setEmail(value);
  };

  const sendPasswordReset = async () => {
    await sendPasswordResetEmail(auth, email).then(() =>
      alert('비밀번호 재설정 메일을 보냈습니다.'),
    );
  };
  return (
    <main>
      {' '}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component="h1" variant="h5">
            비밀번호 찾기
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              autoComplete="email"
              fullWidth
              id="email"
              label="이메일"
              margin="normal"
              name="email"
              onChange={inputEmail}
              required
            />
          </Box>
          <Button onClick={sendPasswordReset} variant="contained">
            입력된 주소로 메일 받기
          </Button>
        </Box>
      </Container>
    </main>
  );
}

export default FindingPassword;
