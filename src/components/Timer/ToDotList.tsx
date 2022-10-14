import React, { useState } from 'react';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

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
  const [toDo, setToDo] = useState('');
  const [lists, setLists] = useState<Array<string>>([]);
  const [ischecked, setIsChecked] = useState(false);
  const inputToDo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setToDo(value);
  };
  const addList = () => {
    if (toDo) {
      setLists([...lists, toDo]);
    }
  };
  const checkList = (e: any) => {
    console.log(e.target.checked);
    setIsChecked(e.target.checked);
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
        value={toDo}
        variant="outlined"
      />
      <div>
        <IconButton onClick={addList}>
          <AddIcon sx={{ color: 'white', height: '1em' }} />
        </IconButton>
      </div>
      <ToDoLists>
        {lists.map((str: string, idx: number) => (
          <li key={idx}>
            <FormControlLabel
              color="success"
              control={
                <Checkbox
                  onClick={checkList}
                  sx={{
                    color: 'white',
                    '&.Mui-checked': {
                      color: 'white',
                    },
                  }}
                />
              }
              label={str}
              sx={{
                fontWeight: 'bold',
                textDecoration: ischecked ? 'line-through' : null,
              }}
            />
          </li>
        ))}
      </ToDoLists>
    </ToDoListContainer>
  );
}

export default ToDotList;
