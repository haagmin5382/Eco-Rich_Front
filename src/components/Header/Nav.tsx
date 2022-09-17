import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { GrLogin } from 'react-icons/gr';

const NavContainer = styled.nav`
  display: flex;
  width: 100vw;
  height: 8vh;
  line-height: 8vh;
  box-shadow: 1px 1px 5px gray;
  a {
    text-decoration: none;
    color: 'green';
    font-size: 3vw;
    font-weight: bold;
    width: 20%;
  }
  a:visited {
    color: 'green';
  }
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
        color: #ffffff;
        background-color: gray;
      }
    }
  }
`;

function Nav() {
  const navigate = useNavigate();

  return (
    <NavContainer>
      <a href="/">TITLE</a>
      <ul>
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
        <a href="/login">
          <AiOutlineUser color="black" size="50%" />
        </a>
      </ul>
    </NavContainer>
  );
}

export default Nav;
