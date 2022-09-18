import React from 'react';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { openAndClose } from 'redux/menu';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 8vh;
  line-height: 8vh;
  box-shadow: 1px 1px 5px gray;
  a {
    text-decoration: none;
    color: #ffffff;
    font-size: 4vh;
    font-weight: bold;
    width: 100%;
    margin-left: 5%;
  }
  a:visited {
    text-decoration: none;
    color: #ffffff;
  }
  ul {
    display: flex;
    margin: 0;
    padding: 0;

    li {
      list-style: none;
      font-weight: bold;
      cursor: pointer;
      text-align: center;
      font-size: 1vw 1vh;
      padding-top: 1.5vh;
      margin-right: 2vw;
    }
  }
`;

function Nav() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const openAndCloseMenu = () => {
    dispatch(openAndClose({ sideMenu: true }));
  };

  return (
    <NavContainer>
      <a href="/">Pomodoro Study</a>
      <ul>
        <li onClick={openAndCloseMenu} onKeyDown={openAndCloseMenu} role="tab">
          <MenuIcon sx={{ color: 'white', fontSize: 30 }} />
        </li>
      </ul>
    </NavContainer>
  );
}

export default Nav;
