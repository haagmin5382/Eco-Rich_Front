import React, { useState } from 'react';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useSelector, useDispatch } from 'react-redux';

const ToDoListContainer = styled.div`
  background-color: #2ba45c;
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
    background-color: tomato;
  }
`;

function ToDotList() {
  interface toDoType {
    isFinished: boolean;
    toDo: string;
  }
  const dispatch = useDispatch();
  const [toDo, setToDo] = useState({ isFinished: false, toDo: '' });
  const [lists, setLists] = useState<Array<toDoType>>([]);

  const inputToDo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setToDo({ isFinished: false, toDo: value });
  };
  const addList = () => {
    if (toDo.toDo) {
      setLists([...lists, toDo]);
    }
  };
  const checkList = (idx: number) => {
    const changedList = lists.map((obj, index) => {
      if (idx === index) {
        return { isFinished: !obj.isFinished, toDo: obj.toDo };
      } else {
        return obj;
      }
    });
    setLists(changedList);
  };

  const deleteList = (idx: number) => {
    const filteredList = lists.filter((str, index) => index !== idx);
    setLists(filteredList);
  };

  return (
    <ToDoListContainer>
      <TextField
        id="custom-css-outlined-input"
        label="오늘 할 일"
        onChange={inputToDo}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
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
        {lists.filter((obj) => obj.isFinished).length} / {lists.length}
      </div>
      <ToDoLists>
        {lists.map((obj: any, idx: number) => (
          <ToDoList key={idx}>
            <Checkbox
              onClick={() => checkList(idx)}
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
              onClick={() => deleteList(idx)}
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
