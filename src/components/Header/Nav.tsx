import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { FcMenu } from 'react-icons/fc';
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
      transition: 0.4s;
      padding-top: 1.5vh;
      margin-right: 2vw;
    }
  }
`;

function Nav() {
  const navigate = useNavigate();

  return (
    <NavContainer>
      <a href="/">TITLE</a>
      <ul>
        <li>
          <FcMenu size="70%" />
        </li>
      </ul>
    </NavContainer>
  );
}

export default Nav;
