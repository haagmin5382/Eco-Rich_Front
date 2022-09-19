import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { reduxState } from 'App';
import { addDoc, collection } from 'firebase/firestore';
import { dbService, storageService } from 'fbase';

const WritingContainer = styled.div`
  margin: 5vw auto;
  text-align: center;
`;

function Writing() {
  const navigate = useNavigate();
  const userProfile = useSelector((state: reduxState) => state.user.value);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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
    const nweetContent = {
      writer: userProfile.displayName,
      title: title,
      content: content,
      createdAt: Date.now(),
      creatorId: userProfile.uid, // 로그인할 때  유저정보를 받아온다.
      // nweet 정보에 attachmentURL을 추가한다. attachmentURL가 없다면 null값을 넣어준다.
    };

    await addDoc(collection(dbService, 'board'), nweetContent);
    navigate('/board');
  };
  const clickCancel = () => {
    navigate('/board');
  };
  return (
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
  );
}

export default Writing;
