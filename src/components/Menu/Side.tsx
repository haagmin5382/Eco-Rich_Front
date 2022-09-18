import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
    if (page === '로그인') {
      navigate('/login');
    }
    if (page === '회원가입') {
      navigate('/signup');
    }
  };

  const list = (anchor: any) => (
    <Box
      role="presentation"
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    >
      <List>
        <CloseIcon
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
          sx={{ position: 'relative', left: 210, cursor: 'pointer' }}
        />
        {['로그인', '회원가입'].map((text) => (
          <ListItem
            disablePadding
            key={text}
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            <ListItemButton onClick={() => goToPage(text)}>
              <ListItemIcon>
                {text === '로그인' && <LoginIcon />}
                {text === '회원가입' && <PersonAddAltIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['게시판', 'Trash', 'Spam'].map((text) => (
          <ListItem disablePadding key={text}>
            <ListItemButton>
              <ListItemIcon>{text === '게시판' && <ForumIcon />}</ListItemIcon>
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
