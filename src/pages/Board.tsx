import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PostList from 'components/Board/PostList';
import styled from 'styled-components';
import Button from '@mui/material/Button';

const BoardContainer = styled.div`
  width: 80vw;
  /* margin-top: 20vw; */
  margin: 5vw auto;
  border: 1px solid black;
`;

export default function Board() {
  return (
    <main>
      <BoardContainer>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: 'tomato',
            color: '#ffffff',
            fontWeight: 'bold',
          }}
        >
          <AccordionSummary sx={{ cursor: 'arrow' }}>
            <Typography
              sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold' }}
            >
              작성자
            </Typography>
            <Typography sx={{ color: '#ffffff', fontWeight: 'bold' }}>
              제목
            </Typography>
          </AccordionSummary>
        </Box>
        <PostList />
      </BoardContainer>
      <Button
        sx={{
          marginLeft: '10vw',
          color: '#ffffff',
          backgroundColor: 'green',
        }}
        variant="contained"
      >
        글쓰기
      </Button>
    </main>
  );
}
