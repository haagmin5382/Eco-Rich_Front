import React from 'react';
import styled from 'styled-components';
import { FcMenu } from 'react-icons/fc';
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
    color: 'green';
    font-size: 4vh;
    font-weight: bold;
    width: 30%;
  }
  a:visited {
    color: 'green';
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
      <a href="/">TITLE</a>
      <ul>
        <li onClick={openAndCloseMenu} onKeyDown={openAndCloseMenu} role="tab">
          <FcMenu size="80%" />
        </li>
      </ul>
    </NavContainer>
  );
}

export default Nav;
