import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dbService } from 'fbase';
import { doc, setDoc, getDoc, collection, deleteDoc } from 'firebase/firestore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { reduxState } from 'App';
import Comment from 'components/Board/Comment';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate } from 'react-router-dom';
export interface commentType {
  writer: string;
  comment: string;
}
export interface postInfoType {
  comment: Array<commentType>;
  content: string;
  createdAt: number;
  creatorId: string;
  title: string;
  writer: string;
}
function Posted() {
  const id = useParams().id;
  const navigate = useNavigate();
  const userProfile = useSelector((state: reduxState) => state.user.value);
  const [postInfo, setPostInfo] = useState<postInfoType>({
    comment: [],
    content: '',
    createdAt: 0,
    creatorId: '',
    title: '',
    writer: '',
  });
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState(postInfo.content);
  const [comment, setComment] = useState({
    writer: '',
    comment: '',
  });

  const boardRef = collection(dbService, 'board');
  const getPostData = async () => {
    const postData = await getDoc(doc(boardRef, id));
    setPostInfo(postData.data() as postInfoType);
  };

  const inputComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setComment({ writer: userProfile.displayName, comment: value });
  };
  const editContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNewContent(value);
  };

  const clickCommentButton = async () => {
    if (userProfile.uid) {
      setComment({ writer: userProfile.displayName, comment: '' });
      await setDoc(doc(boardRef, id), {
        ...postInfo,
        comment: [...postInfo.comment, comment],
      });
      setPostInfo({ ...postInfo, comment: [...postInfo.comment, comment] });
    } else {
      navigate(`/login`);
    }
  };
  const clickDelete = async () => {
    await deleteDoc(doc(boardRef, id));
    navigate('/board');
  };
  const clickEdit = async () => {
    setEditing(!editing);
    if (editing) {
      // editing === true
      await setDoc(doc(boardRef, id), {
        ...postInfo,
        content: newContent,
      });
      location.reload();
    }
  };
  const cancelEdit = () => {
    setEditing(false);
  };
  useEffect(() => {
    getPostData();
  }, []);

  return (
    <>
      <Card
        sx={{
          margin: '5vw auto',
          width: '80vw',
          height: '50vh',
          border: '1px solid tomato',
        }}
      >
        <CardContent>
          <Typography
            color="text.secondary"
            sx={{ borderBottom: '1px solid black', padding: '1vw' }}
            variant="body2"
          >
            작성자 : {postInfo.writer}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ borderBottom: '1px solid black', padding: '1vw' }}
            variant="body1"
          >
            제목 : {postInfo.title}
          </Typography>
          {editing ? (
            <TextField
              defaultValue={postInfo.content}
              id="filled-multiline-static"
              multiline
              name="newContent"
              onChange={editContent}
              rows={10}
              sx={{ width: '100%' }}
              variant="filled"
            />
          ) : (
            <Typography
              component="div"
              gutterBottom
              sx={{ padding: '1vw' }}
              variant="body1"
            >
              {postInfo.content}
            </Typography>
          )}
        </CardContent>
      </Card>
      <Typography sx={{ textAlign: 'center' }}>
        {postInfo.creatorId === userProfile.uid ? (
          <Button
            onClick={clickEdit}
            sx={{ backgroundColor: '#0A6D2B', marginRight: '1vw' }}
            variant="contained"
          >
            {editing ? '수정 완료' : '수정'}
          </Button>
        ) : null}
        {postInfo.creatorId === userProfile.uid ? (
          <Button
            onClick={editing ? cancelEdit : clickDelete}
            sx={{ backgroundColor: '#F22D03' }}
            variant="contained"
          >
            {editing ? '수정 취소' : '삭제'}
          </Button>
        ) : null}
      </Typography>

      <CommentIcon sx={{ marginLeft: '10vw', fontSize: '40px' }} />

      {postInfo.comment?.map(
        (obj: { writer: string; comment: string }, idx: number) => (
          <Comment key={idx} obj={obj} />
        ),
      )}
      <TextField
        id="filled-multiline-static"
        label="댓글"
        multiline
        onChange={inputComment}
        rows={4}
        sx={{ marginLeft: '10vw', textAlign: 'center', width: '80vw' }}
        value={comment.comment}
        variant="filled"
      />
      <br />
      <br />
      <Button
        onClick={clickCommentButton}
        sx={{ marginLeft: '10vw', marginBottom: '5vh', width: '80vw' }}
        variant="contained"
      >
        댓글 등록
      </Button>
    </>
  );
}

export default Posted;
