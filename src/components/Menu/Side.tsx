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
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ForumIcon from '@mui/icons-material/Forum';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useSelector, useDispatch } from 'react-redux';
import { openAndClose } from 'redux/menu';
import { useNavigate } from 'react-router-dom';
import { authService } from 'fbase';
import { reduxState } from 'App';

export default function TemporaryDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sideMenu = useSelector(
    (state: reduxState) => state.menu.value.sideMenu,
  );
  const userInfo = useSelector((state: reduxState) => state.user.value);

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
    if (page === '로그아웃') {
      authService.signOut();
      navigate('/');
    }
    if (page === '마이페이지') {
      navigate('/mypage');
    }
    if (page === '게시판') {
      navigate('/board');
    }
    if (page === '기록') {
      navigate(`/record`);
    }
  };
  const itemList = userInfo.email
    ? ['로그아웃', '마이페이지']
    : ['로그인', '회원가입'];
  const list = (anchor: string) => (
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
        {itemList.map((text: string) => (
          <ListItem
            disablePadding
            key={text}
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
          >
            <ListItemButton onClick={() => goToPage(text)}>
              <ListItemIcon>
                {text === '로그인' && <LoginIcon />}
                {text === '로그아웃' && <LogoutIcon />}
                {text === '회원가입' && <PersonAddAltIcon />}
                {text === '마이페이지' && <PersonOutlineIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['게시판', '기록', 'Spam'].map((text) => (
          <ListItem disablePadding key={text}>
            <ListItemButton onClick={() => goToPage(text)}>
              <ListItemIcon>
                {text === '게시판' && <ForumIcon />}
                {text === '기록' && <ShowChartIcon />}
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
