import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { reduxState } from 'App';
import { dbService } from 'fbase';
import {
  doc,
  addDoc,
  setDoc,
  getDoc,
  collection,
  deleteDoc,
  onSnapshot,
  query,
  where,
  getDocs,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import { today } from './Timer';

const ToDoListContainer = styled.div`
  background-color: tomato;
  color: #ffffff;
  padding-top: 3vh;
  padding-bottom: 3vh;
  h1 {
    /* padding-top: 1vh; */
  }
`;

const ToDoLists = styled.ul`
  text-align: left;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: 6vw;
`;
const ToDoList = styled.li`
  width: 68vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ffffff;
  margin-top: 1vh;
  cursor: pointer;
  &:hover {
    background-color: #2ba45c;
  }
`;

function ToDotList() {
  interface postsType {
    writer: string;
    toDo: string;
    isFinished: boolean;
    today: string;
    createdAt: number;
    creatorId: string; // 로그인할 때  유저정보를 받아온다.
  }
  const user = useSelector((state: reduxState) => state.user.value);
  const [toDo, setToDo] = useState({ isFinished: false, toDo: '' });
  const [lists, setLists] = useState<Array<postsType>>([]);
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const now = today + ` ${hours}시 ${minutes}분`;

  const inputToDo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setToDo({ isFinished: false, toDo: value });
  };
  const addList = async () => {
    // toDoList 추가
    if (toDo.toDo) {
      const writing = {
        writer: user.displayName,
        toDo: toDo.toDo,
        isFinished: toDo.isFinished,
        today: now,
        createdAt: Date.now(),
        creatorId: user.uid, // 로그인할 때  유저정보를 받아온다.
      };
      await addDoc(collection(dbService, 'memo'), writing);
    }
  };

  const checkList = async (id: string) => {
    // toDoList 체크
    const memoDoc = doc(dbService, 'memo', id);
    const memoRef = collection(dbService, 'memo');
    const selected = await getDoc(doc(memoRef, id));

    await updateDoc(memoDoc, {
      isFinished: !selected?.data()?.isFinished,
    });
  };
  const deleteList = async (id: string) => {
    // toDoList 제거
    const memoRef = collection(dbService, 'memo');
    const q = await query(
      memoRef,
      where('creatorId', '==', user.uid),
      orderBy('createdAt', 'desc'),
    );
    await deleteDoc(doc(dbService, 'memo', id));
  };

  const refreshData = async () => {
    // 실시간 데이터 처리
    const memoRef = collection(dbService, 'memo');
    const q = await query(
      memoRef,
      where('creatorId', '==', user.uid),
      orderBy('createdAt', 'desc'),
    );

    onSnapshot(q, (querySnapshot) => {
      const memoArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //  querySnapshot.forEach((doc) => doc.data());
      if (memoArray) {
        setLists(memoArray as any);
      }
    });
  };

  useEffect(() => {
    if (user.uid) {
      refreshData();
    }
  }, [user.uid]);

  return (
    <ToDoListContainer>
      <TextField
        id="custom-css-outlined-input"
        label="오늘 할 일"
        onChange={inputToDo}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            // isComposing으로 한글을 입력했을 때 onKeyDown 버그 수정
            addList();
          }
        }}
        sx={{
          input: { color: 'white' },
          width: '70vw',
          margin: '0 atuo',
          color: 'white',
        }}
        value={toDo.toDo}
        variant="outlined"
      />

      <div>
        <IconButton onClick={addList}>
          <AddIcon sx={{ color: 'white', height: '1em' }} />
        </IconButton>
      </div>
      <div>
        {lists.filter((obj) => obj.isFinished)?.length} / {lists?.length}
      </div>
      <ToDoLists>
        {lists.map((obj: any, idx: number) => (
          <ToDoList key={idx}>
            <Checkbox
              onClick={() => checkList(obj.id)}
              sx={{
                color: 'white',
                '&.Mui-checked': {
                  color: 'white',
                },
              }}
            />
            <span>{obj.toDo}</span>
            <IconButton
              aria-label="delete"
              onClick={() => deleteList(obj.id)}
              size="small"
              sx={{ color: '#757372' }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </ToDoList>
        ))}
      </ToDoLists>
    </ToDoListContainer>
  );
}

export default ToDotList;
