import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function PageForNotLogin() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        marginTop: '10vw',
        Width: '50vw',
        height: '30vh',
        textAlign: 'center',
      }}
    >
      <CardContent>
        <Typography color="text.secondary" gutterBottom sx={{ fontSize: 14 }}>
          <NoAccountsIcon color="error" fontSize="large" />
          <br />
          Not Logged in
        </Typography>
        <Typography component="div" variant="h5">
          로그인이 필요한 서비스입니다.
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 1.5 }}></Typography>
        <Typography sx={{ fontWeight: 'bold' }} variant="body2">
          로그인 하시고 다시 시도해주세요
        </Typography>
      </CardContent>
      <Button
        onClick={() => navigate('/login')}
        size="small"
        variant="outlined"
      >
        로그인하기
      </Button>
    </Box>
  );
}
