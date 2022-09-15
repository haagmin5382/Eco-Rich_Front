import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  width: 100vw;
  height: 10vh;
  line-height: 10vh;
  background-color: #74c8fd;

  color: #ffffff;

  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    li {
      list-style: none;
      font-weight: bold;
      cursor: pointer;
      text-align: center;
      width: 100%;
      transition: 0.4s;
      :hover {
        color: gray;
        border-bottom: 5px solid gray;
      }
    }
  }
`;

function Nav() {
  return (
    <NavContainer>
      <ul>
        <li>Home</li>
        <li>게시판</li>
        <li>로그인</li>
      </ul>
    </NavContainer>
  );
}

export default Nav;
