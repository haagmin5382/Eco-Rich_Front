import React, { useEffect, useState } from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PostList from 'components/Board/PostList';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { dbService } from 'fbase';
import { collection, onSnapshot } from 'firebase/firestore';
import { commentType } from './Posted';

const BoardContainer = styled.div`
  width: 80vw;
  /* margin-top: 20vw; */
  margin: 5vw auto;
  border: 1px solid black;
`;

export default function Board() {
  interface postsType {
    id: string;
    comment: Array<commentType>;
    content: string;
    createdAt: number;
    creatorId: string;
    title: string;
    writer: string;
  }
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Array<postsType>>([
    {
      id: '',
      comment: [{ writer: '', comment: '' }],
      content: '',
      createdAt: 0,
      creatorId: '',
      title: '',
      writer: '',
    },
  ]);
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(posts);
  useEffect(() => {
    onSnapshot(collection(dbService, 'board'), (snapShot) => {
      const postArray = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postArray as Array<postsType>); // 더 적은 렌더링으로 데이터가 실시간으로 변한다.
    });
  }, []);

  const writePosting = () => {
    if (user) {
      navigate('/board/writing');
    } else {
      navigate('/login');
    }
  };
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
              sx={{
                width: '33%',
                flexShrink: 0,
                fontWeight: 'bold',
                textAlign: 'center',
                borderRight: '1px solid #ffffff',
              }}
            >
              작성자
            </Typography>
            <Typography
              sx={{
                width: '60%',
                color: '#ffffff',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              제목
            </Typography>
          </AccordionSummary>
        </Box>
        {posts.map((post) => (
          <PostList key={post.id} post={post} />
        ))}
      </BoardContainer>
      <Button
        onClick={writePosting}
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
