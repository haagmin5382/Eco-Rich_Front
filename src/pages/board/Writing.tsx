import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { reduxState } from 'App';
import { addDoc, collection } from 'firebase/firestore';
import { dbService } from 'fbase';
import PageError from 'pages/pageForError/PageForNotLogin';

const WritingContainer = styled.div`
  margin: 5vw auto;
  text-align: center;
`;

function Writing() {
  const navigate = useNavigate();
  const userProfile = useSelector((state: reduxState) => state.user.value);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // if (!userProfile.uid) {
  //   window.location.href = '/login';
  // }
  const inputWriting = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'title') {
      setTitle(value);
    } else {
      setContent(value);
    }
  };

  const clickPost = async () => {
    // const randomStr = Math.random().toString(36).substring(2, 12);
    const writing = {
      writer: userProfile.displayName,
      title: title,
      content: content,
      createdAt: Date.now(),
      creatorId: userProfile.uid, // 로그인할 때  유저정보를 받아온다.
      comment: [],
    };

    await addDoc(collection(dbService, 'board'), writing);
    navigate('/board');
  };
  const clickCancel = () => {
    navigate('/board');
  };
  return (
    <>
      {userProfile.uid ? (
        <WritingContainer>
          <TextField
            id="filled-textarea"
            label="제목"
            multiline
            name="title"
            onChange={inputWriting}
            placeholder="제목을 입력해주세요"
            sx={{ width: '80vw' }}
            variant="filled"
          />
          <br />
          <br />
          <TextField
            // defaultValue="Default Value"
            id="filled-multiline-static"
            label="내용"
            multiline
            name="content"
            onChange={inputWriting}
            placeholder="비방글이나 타인에게 상처주는 글들은 삭제의 대상이 될 수 있습니다."
            rows={15}
            sx={{ width: '80vw' }}
            variant="filled"
          />
          <br />
          <br />

          <Button
            onClick={clickPost}
            sx={{
              color: '#ffffff',
              margin: '1vw',
            }}
            variant="contained"
          >
            게시
          </Button>

          <Button
            onClick={clickCancel}
            sx={{
              backgroundColor: '#FF5530',
              color: '#ffffff',
              margin: '1vw',
            }}
            variant="contained"
          >
            취소
          </Button>
        </WritingContainer>
      ) : (
        <>
          <PageError />
        </>
      )}
    </>
  );
}

export default Writing;
