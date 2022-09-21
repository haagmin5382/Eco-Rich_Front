import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { authService } from 'fbase';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    if (e.target.name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      console.log('이메일을 입력하세요');
    } else if (!password) {
      console.log('비밀번호를 입력하세요');
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => navigate('/'))
        .catch((error) => {
          if (error.message === 'Firebase: Error (auth/user-not-found).') {
            console.log('아이디가 없습니다.');
          } else {
            console.log('비밀번호가 다릅니다.');
          }
        });
    }
  };
  const socialLogin = async (e: React.MouseEvent<HTMLElement>) => {
    let provider;
    const evnetTarget = e.target as HTMLButtonElement;
    console.log(evnetTarget.name);
    if (evnetTarget.name === 'google') {
      provider = new GoogleAuthProvider();
      await signInWithPopup(authService, provider);
      navigate('/');
    }
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              autoComplete="email"
              fullWidth
              id="email"
              label="이메일"
              margin="normal"
              name="email"
              onChange={changeInput}
              required
            />
            <TextField
              autoComplete="current-password"
              fullWidth
              id="password"
              label="비밀번호"
              margin="normal"
              name="password"
              onChange={changeInput}
              required
              type="password"
            />

            <Button
              fullWidth
              sx={{ mt: 3, mb: 1 }}
              type="submit"
              variant="contained"
            >
              로그인
            </Button>
            <Button
              fullWidth
              name="google"
              onClick={socialLogin}
              sx={{ mt: 1, mb: 2, background: 'gray' }}
              type="button"
              variant="contained"
            >
              <GoogleIcon sx={{ marginRight: '1vw' }} />
              Google 로그인
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  회원 가입
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
