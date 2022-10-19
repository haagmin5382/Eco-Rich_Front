import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

function ChatForm({
  setIsChatting,
}: {
  setIsChatting: (state: boolean) => void;
}) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            width: '30vw',
            height: '50vh',
          },
        }}
      >
        <Paper elevation={3} sx={{ textAlign: 'center' }}>
          {' '}
          <AppBar position="static">
            <Toolbar>
              <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
                문의하기
              </Typography>
              <Button color="inherit" onClick={() => setIsChatting(false)}>
                <CloseIcon />
              </Button>
            </Toolbar>
          </AppBar>
          <TextField
            id="standard-basic"
            label="문의내용"
            sx={{ width: '20vw' }}
            variant="standard"
          />
        </Paper>
      </Box>
    </>
  );
}

export default ChatForm;
