import React from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

interface postProps {
  id: string;
  writer: string;
  title: string;
  content: string;
  createdAt: number;
  creatorId: string;
}
function PostList({ post }: { post: postProps }) {
  const navigate = useNavigate();
  const clickPost = () => {
    navigate(`/board/${post.id}`);
  };

  return (
    <>
      <Box onClick={clickPost} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <AccordionSummary aria-controls="panel2bh-content" id="panel2bh-header">
          <Typography
            sx={{
              width: '33%',
              flexShrink: 0,
              color: 'text.secondary',
              lineHeight: '200%',
            }}
          >
            {post.writer}
          </Typography>
          <Typography sx={{ width: '60%', color: 'black', lineHeight: '200%' }}>
            {post.title}
          </Typography>
        </AccordionSummary>
      </Box>
    </>
  );
}

export default PostList;
