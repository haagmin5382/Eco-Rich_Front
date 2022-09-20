import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Comment({ obj }: { obj: { writer: string; comment: string } }) {
  return (
    <Card sx={{ margin: '1vw auto', width: '80vw' }}>
      <CardContent>
        <Typography color="text.secondary" variant="body2">
          {obj.writer} : {obj.comment}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Comment;
