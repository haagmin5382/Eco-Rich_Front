import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ForumIcon from '@mui/icons-material/Forum';
import { useSelector, useDispatch } from 'react-redux';
import { openAndClose } from 'redux/menu';
import { useNavigate } from 'react-router-dom';

export default function TemporaryDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sideMenu = useSelector((state: any) => state.menu.value.sideMenu);

  const toggleDrawer = (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    dispatch(openAndClose({ sideMenu: false }));
  };
  const goToPage = (page: string) => {
    console.log('이동');

    if (page === '로그인') {
      navigate('/login');
    }
    if (page === '회원가입') {
      navigate('/signup');
    }
    if (page === '게시판') {
      navigate('/login');
    }
  };

  const list = (anchor: any) => (
    <Box
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
      role="presentation"
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    >
      <List>
        <CloseIcon sx={{ position: 'relative', left: 210 }} />
        {['로그인', '회원가입', '게시판', 'Drafts'].map((text, index) => (
          <ListItem disablePadding key={text}>
            <ListItemButton onClick={() => goToPage(text)}>
              <ListItemIcon>
                {text === '로그인' && <LoginIcon />}
                {text === '회원가입' && <PersonAddAltIcon />}
                {text === '게시판' && <ForumIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem disablePadding key={text}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <>
        <Drawer anchor="right" onClose={toggleDrawer} open={sideMenu}>
          {list('right')}
        </Drawer>
      </>
    </div>
  );
}
