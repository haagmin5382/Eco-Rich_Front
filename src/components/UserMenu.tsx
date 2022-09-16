import React from 'react';
import styled from 'styled-components';
import { AiOutlineUser } from 'react-icons/ai';

const UserMenuContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 8vh;
  background-color: #ffffff;
  box-shadow: 0px 0px 1px 1px;

  ul {
    display: flex;
    justify-content: space-around;
    list-style: none;
  }
`;
function UserMenu() {
  return (
    <UserMenuContainer>
      <ul>
        <li>
          <AiOutlineUser size="30%" />
        </li>
        <li>버튼</li>
        <li>버튼</li>
      </ul>
    </UserMenuContainer>
  );
}

export default UserMenu;
