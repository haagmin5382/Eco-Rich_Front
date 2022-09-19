import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
function PostList() {
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <AccordionSummary aria-controls="panel2bh-content" id="panel2bh-header">
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
      </Box>
    </>
  );
}

export default PostList;
