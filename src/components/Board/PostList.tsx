import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';

interface postProps {
  id: string;
  writer: string;
  title: string;
  content: string;
  createdAt: number;
  creatorId: string;
}
function PostList({ post }: { post: postProps }) {
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <AccordionSummary aria-controls="panel2bh-content" id="panel2bh-header">
          <Typography
            sx={{ width: '33%', flexShrink: 0, color: 'text.secondary' }}
          >
            {post.writer}
          </Typography>
          <Typography sx={{ color: 'black' }}>{post.title}</Typography>
        </AccordionSummary>
      </Box>
    </>
  );
}

export default PostList;
