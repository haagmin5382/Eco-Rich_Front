import React, { useState } from 'react';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
const ToDoListContainer = styled.div`
  background-color: #2ba45c;
  color: #ffffff;
  padding-top: 3vh;
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

function ToDotList() {
  interface toDoType {
    isFinished: boolean;
    toDo: string;
  }
  const [toDo, setToDo] = useState({ isFinished: false, toDo: '' });
  const [lists, setLists] = useState<Array<toDoType>>([]);

  const inputToDo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setToDo({ isFinished: false, toDo: value });
  };
  const addList = () => {
    if (toDo) {
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
  console.log(lists);
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
        sx={{
          input: { color: 'white' },
          width: '70vw',
          margin: '0 atuo',
          border: '1px solid #ffffff',
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
          <li key={idx}>
            <FormControlLabel
              color="success"
              control={
                <Checkbox
                  onClick={() => checkList(idx)}
                  sx={{
                    color: 'white',
                    '&.Mui-checked': {
                      color: 'white',
                    },
                  }}
                />
              }
              label={obj.toDo}
              sx={{
                fontWeight: 'bold',
                // textDecoration: ischecked.
              }}
            />
            <IconButton
              aria-label="delete"
              onClick={() => deleteList(idx)}
              size="small"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </li>
        ))}
      </ToDoLists>
    </ToDoListContainer>
  );
}

export default ToDotList;
