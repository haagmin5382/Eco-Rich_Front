import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState('');

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    if (e.target.name === 'email') {
      setEmail(value);
    } else if (e.target.name === 'name') {
      setName(value);
    } else if (e.target.name === 'password') {
      setPassword(value);
    } else {
      setPasswordConfirmed(value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      email: email,
      name: name,
      password: password,
      passwordConfirmed: passwordConfirmed,
    });
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={changeInput}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  onChange={changeInput}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="new-password"
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  onChange={changeInput}
                  required
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="confirm-password"
                  fullWidth
                  id="ConfirmPassword"
                  label="Confirm Password"
                  name="ConfirmPassword"
                  onChange={changeInput}
                  required
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox color="primary" value="allowExtraEmails" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              type="submit"
              variant="contained"
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
