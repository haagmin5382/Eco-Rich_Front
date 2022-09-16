import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
        background-color: #ffffff;
        border-bottom: 5px solid gray;
      }
    }
  }
`;

function Nav() {
  const navigate = useNavigate();
  return (
    <NavContainer>
      <ul>
        <li
          onClick={() => navigate('/mypage')}
          onKeyDown={() => navigate('/mypage')}
          role="tab"
        >
          Home
        </li>
        <li
          onClick={() => navigate('/login')}
          onKeyDown={() => navigate('/login')}
          role="tab"
        >
          게시판
        </li>
        <li
          onClick={() => navigate('/mypage')}
          onKeyDown={() => navigate('/mypage')}
          role="tab"
        >
          MyPage
        </li>
      </ul>
    </NavContainer>
  );
}

export default Nav;
