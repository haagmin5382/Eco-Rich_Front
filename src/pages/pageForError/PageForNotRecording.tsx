import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BorderColorIcon from '@mui/icons-material/BorderColor';
export default function PageForNotRecording() {
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
          <BorderColorIcon color="error" fontSize="large" />
          <br />
          Not Recorded
        </Typography>
        <Typography component="div" variant="h5">
          아직 공부기록을 기록하지 않았어요.
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 1.5 }}></Typography>
        <Typography sx={{ fontWeight: 'bold' }} variant="body2">
          타이머를 끝내고 공부 마치기를 누르면 오늘 공부한 기록이 저장됩니다.
        </Typography>
      </CardContent>
      <Button onClick={() => navigate('/')} size="small" variant="outlined">
        홈으로 돌아가기
      </Button>
    </Box>
  );
}
